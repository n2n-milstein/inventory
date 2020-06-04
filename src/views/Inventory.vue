<template>
  <v-col cols="12" class="inventory">
    <v-dialog
      v-model="editCard"
      width="750"
      persistent
      @click:outside="closeDialog()"
      @keydown.escape="closeDialog()"
      scrollable
    >
      <edit-card
        :is-edit="isEdit"
        @edit="toggleEdit()"
        @close="closeDialog()"
        @save="saveUpdates()"
      />
    </v-dialog>

    <v-dialog v-model="unsavedDialog" width="450">
      <v-card>
        <v-card-title>You have unsaved changes</v-card-title>
        <v-card-text>
          Are you sure you want to discard your unsaved changes?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="unsavedDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="closeDialog(true)">Discard</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="mb-3 px-4" align="baseline">
      <view-title title="Inventory" />
      <v-spacer />
      <v-col cols="6">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search inventory"
          single-line
          clearable
          hide-details
        />
      </v-col>
    </v-row>

    <v-select
      v-model="classFilter"
      :items="classCheckboxes"
      attach
      chips
      label="Class Filter"
      multiple
    ></v-select>
    <v-select
      v-model="statusFilter"
      :items="statusCheckboxes"
      attach
      chips
      label="Status Filter"
      multiple
    ></v-select>

    <inventory-actions
      class="px-4 mb-4"
      :selected="selected.length > 0"
      @download="getSpreadsheet"
      :downloading="downloading"
    />

    <v-data-table
      v-model="selected"
      :search="search"
      :headers="headers"
      :items="inventory"
      :options.sync="pagination"
      show-select
      item-key="id"
      @click:row="onItemClick"
    >
      <template v-slot:item.timing.dateAdded="{ item }">
        {{ item.timing.dateAdded.toDate().toLocaleDateString() }}
      </template>
      <template v-slot:item.physical.class="{ item }">
        {{ item.physical.class }}{{ item.physical.set ? ", Set" : "" }}
      </template>
      <template v-slot:item.status="{ item }">
        {{ status[item.status] }}
      </template>
    </v-data-table>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Component from "vue-class-component";
import ViewTitle from "@/components/ViewTitle.vue";
import InventoryActions from "@/components/InventoryActions.vue";
import EditCard from "@/components/EditCard.vue";
import { Status, Furniture } from "@/data/Furniture";
import { FClass } from "@/data/furniture/Physical";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const namespace = "inventory";

@Component({
  components: {
    ViewTitle,
    InventoryActions,
    EditCard,
  },
  computed: mapGetters(namespace, {
    inventory: "getInventory",
    current: "getCurrent",
    updatesLength: "getUpdatesLength",
  }),
  methods: mapActions(namespace, [
    "bindInventory",
    "setCurrent",
    "clearCurrent",
    "clearUpdates",
    "commitUpdates",
  ]),
})
export default class Inventory extends Vue {
  current!: Furniture;

  updatesLength!: number;

  bindInventory!: () => Promise<void>;

  setCurrent!: ({ item }: { item: Furniture }) => void;

  clearCurrent!: () => void;

  clearUpdates!: () => void;

  commitUpdates!: () => void;

  downloading = false;

  // TODO: replace with store
  selected = [];

  isEdit = false;

  editCard = false;

  unsavedDialog = false;

  search = "";

  classFilter = Object.keys(FClass);

  statusFilter = Object.values(Status)
    .filter((v) => typeof (v as any) !== "number")
    .map((text, index) => {
      return index;
    });

  readonly classCheckboxes = Object.keys(FClass);

  readonly statusCheckboxes = Object.values(Status)
    .filter((v) => typeof (v as any) !== "number")
    .map((value, index) => {
      return { text: value, value: index };
    });

  readonly status = Status;

  readonly pagination = { itemsPerPage: -1 };

  get headers(): any {
    return [
      {
        text: "Class",
        value: "physical.class",
        filter: (value: any) => {
          return this.classFilter.includes(value);
        },
      },
      { text: "Date Added", value: "timing.dateAdded" },
      { text: "Address", value: "donor.address" },
      {
        text: "Status",
        value: "status",
        filter: (value: any) => {
          return this.statusFilter.includes(value);
        },
      },
    ];
  }

  /**
   * Called when component is mounted (lifecycle hook); binds inventory in
   * store to Firebase.
   */
  mounted(): void {
    this.bindInventory();
  }

  getSpreadsheet(): void {
    this.downloading = true;
    const getInventoryXLSX = firebase
      .functions()
      .httpsCallable("getInventoryXLSX");
    const parsedobj = JSON.parse(JSON.stringify(this.selected));
    const idArray = [];
    for (let i = 0; i < this.selected.length; i += 1) {
      idArray.push(parsedobj[i].id);
    }
    // Uncomment if running `npm run shell` for backend functions:
    // firebase.functions().useFunctionsEmulator("http://localhost:5000");
    getInventoryXLSX({ id: idArray })
      .then((res) => {
        const storage = firebase.storage();
        const gsref = storage.refFromURL(`gs:/${res.data}`);
        gsref.getDownloadURL().then((url) => {
          window.open(url);
        });
        this.downloading = false;
      })
      .catch((err) => {
        console.log(err);
        console.log(this.selected.length); // workaround not using this
        this.downloading = false;
      });
  }

  /**
   * Toggles edit state `isEdit` and clears update if setting `isEdit`
   * to false
   */
  toggleEdit(): void {
    if (this.isEdit) {
      this.clearUpdates();
    }
    this.isEdit = !this.isEdit;
  }

  /**
   * Exits dialog and clears the current item
   */
  closeDialog(forceClose = false): void {
    if (this.updatesLength === 0 || forceClose) {
      this.unsavedDialog = false;
      this.editCard = false;
      this.isEdit = false;
      // TODO: determine why this causes null error on close
      this.clearCurrent();
    } else {
      this.unsavedDialog = true;
    }
  }

  /**
   * Commits updates to Firestore
   */
  saveUpdates(): void {
    this.commitUpdates();
    this.isEdit = false;
  }

  /**
   * Activates dialog that displays the item information
   */
  onItemClick(item: Furniture): void {
    this.setCurrent({ item });
    this.editCard = true;
  }
}
</script>
