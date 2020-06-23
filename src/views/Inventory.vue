<template>
  <v-col cols="12">
    <furniture-table-header v-model="search" title="Inventory" />

    <v-row class="px-4 mb-4" align="center">
      <v-btn
        :disabled="selected.length > 0"
        :icon="selected.length > 0"
        :outlined="selected.length > 0"
        color="primary"
        rounded
        @click="addItem()"
      >
        <v-icon>add</v-icon>
        {{ selected.length > 0 ? "" : "Add" }}
      </v-btn>
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="actions"
        :disabled="selected.length < 1"
        @download="getSpreadsheet"
        @archive="archiveItems()"
      />

      <v-col>
        <v-row align="center" justify="end">
          <div v-for="(chip, i) in filterChips" :key="chip">
            <v-chip class="mr-3" close @click:close="closeChip(chip, i)">
              {{ chip }}
            </v-chip>
          </div>
          <v-btn rounded text @click="showFilter = !showFilter">
            <v-icon left>filter_list</v-icon> Filters
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-expand-transition>
      <v-container v-show="showFilter" class="grey lighten-4 px-8">
        <v-row>
          <v-col>
            <div>Furniture Class</div>
            <v-checkbox
              @change="updateChip('Class')"
              v-model="classFilter"
              v-for="box in classCheckboxes"
              :key="box"
              :label="box"
              :value="box"
              hide-details
            >
            </v-checkbox>
          </v-col>
          <v-col>
            <div>Status</div>
            <v-checkbox
              @change="updateChip('Status')"
              v-model="statusFilter"
              v-for="box in statusCheckboxes"
              :key="box.value"
              :label="box.text"
              :value="box.value"
              hide-details
            >
            </v-checkbox>
          </v-col>
          <v-col>
            <div>Date Added</div>
            <v-date-picker
              @input="updateChip('Date')"
              v-model="datesFilter"
              multiple
              class="elevation-0 mt-5"
            >
            </v-date-picker>
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>

    <furniture-table
      namespace="inventory"
      :headers="headers"
      :search="search"
      :items="inventory"
      :collection="COLLECTION"
      @download="getSpreadsheet()"
      @item-click="editCard = true"
    />

    <furniture-card-dialog
      namespace="inventory"
      :dialog="editCard"
      :is-edit="isEdit"
      :is-add="isAdd"
      @edit="toggleEdit()"
      @close="closeDialog()"
      @save="saveUpdates()"
      @add="commitAddItem()"
    />

    <unsaved-dialog
      :dialog="unsavedDialog"
      @cancel="unsavedDialog = false"
      @discard="closeDialog(true)"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Component from "vue-class-component";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
// network, data
import collections from "@/network/collections";
import { Furniture, Status } from "@/data/Furniture";
import { FClass } from "@/data/furniture/Physical";
import { Timestamp } from "@/data/furniture/Timing";
import ViewAction from "@/data/ViewAction";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";
import UnsavedDialog from "@/components/FurnitureCardUnsavedDialog.vue";
// store
import { action } from "@/store/collection/types";

const NAMESPACE = "inventory";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
    FurnitureCardDialog,
    UnsavedDialog,
  },
  computed: mapGetters(NAMESPACE, {
    inventory: "getItems",
    current: "getCurrent",
    selected: "getSelected",
    updatesLength: "getUpdatesLength",
  }),
  methods: mapActions(NAMESPACE, [
    action.BIND_ITEMS,
    action.SET_CURRENT,
    action.CLEAR_UPDATES,
    action.CLEAR_CURRENT,
    action.COMMIT_UPDATES,
    "archiveItems",
    "commitItem",
  ]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.INVENTORY;

  /** Vuex map helper properties */
  readonly bindItems!: () => Promise<void>;

  readonly setCurrent!: ({ item }: { item: Furniture }) => void;

  readonly selected!: Furniture[];

  /* eslint-disable object-curly-newline */
  readonly commitUpdates!: ({
    collection,
  }: {
    collection: collections;
  }) => void;
  /* eslint-enable object-curly-newline */

  readonly clearCurrent!: () => void;

  readonly clearUpdates!: () => void;

  readonly updatesLength!: number;

  readonly commitItem!: () => Promise<void>;

  /** Furniture card dialog */
  isEdit = false;

  isAdd = false;

  editCard = false;

  unsavedDialog = false;

  /** Actions and search */
  search = "";

  /** start filter stuff  */
  filterChips = [] as string[];

  showFilter = false;

  dateMenu = false;

  datesFilter = [] as string[];

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

  get headers(): any {
    return [
      {
        text: "Class",
        value: "physical.class",
        filter: (value: any): boolean => {
          return this.classFilter.includes(value);
        },
      },
      {
        text: "Date Added",
        value: "timing.dateAdded",
        filter: (value: any): boolean => {
          if (this.datesFilter.length === 0) return true;
          return this.datesFilter.includes(Inventory.formatDate(value));
        },
      },
      { text: "Address", value: "donor.address" },
      {
        text: "Status",
        value: "status",
        filter: (value: any): boolean => {
          return this.statusFilter.includes(value);
        },
      },
    ];
  }

  static formatDate(date?: Date | Timestamp): string {
    if (!date) return "";
    if (date instanceof Date) return date.toISOString().substring(0, 10);
    return date.toDate().toISOString().substring(0, 10);
  }

  updateChip(filter: any): void {
    if (!this.filterChips.includes(filter)) {
      if (
        (filter === "Class" &&
          this.classFilter.length !== this.classCheckboxes.length) ||
        (filter === "Status" &&
          this.statusFilter.length !== this.statusCheckboxes.length) ||
        (filter === "Date" && this.datesFilter.length !== 0)
      ) {
        this.filterChips.push(filter);
      }
    } else if (
      (filter === "Class" &&
        this.classFilter.length === this.classCheckboxes.length) ||
      (filter === "Status" &&
        this.statusFilter.length === this.statusCheckboxes.length) ||
      (filter === "Date" && this.datesFilter.length === 0)
    ) {
      this.filterChips.splice(
        this.filterChips.findIndex((x) => x === filter),
        1,
      );
    }
  }

  closeChip(filter: any, index: any): void {
    this.filterChips.splice(index, 1);
    if (filter === "Class") {
      this.classFilter = this.classCheckboxes;
    } else if (filter === "Status") {
      this.statusFilter = this.statusCheckboxes.map((x) => x.value);
    } else {
      this.datesFilter = [];
    }
  }

  /** end filter stuff */
  downloading = false;

  get actions(): ViewAction[] {
    return [
      { icon: "archive", desc: "Archive selected items", emit: "archive" },
      {
        icon: "cloud_download",
        desc: "Export selected items to spreadsheet",
        emit: "download",
        loading: (): boolean => this.downloading,
      },
      {
        icon: "playlist_add",
        desc: "Add selected items to run",
        emit: "list-add",
      },
    ];
  }

  /**
   * Called when component is mounted (lifecycle hook); binds inventory in
   * store to Firebase.
   */
  mounted(): void {
    this.bindItems();
  }

  getSpreadsheet(): void {
    // TODO: maybe abstract this to the firestore-service
    this.downloading = true;
    const getInventoryXLSX = firebase
      .functions()
      .httpsCallable("getInventoryXLSX");
    const idArray = this.selected.map((value) => value.id);
    // Uncomment if running `npm run shell` for backend functions:
    // firebase.functions().useFunctionsEmulator("http://localhost:5001");
    getInventoryXLSX({ id: idArray, category: "furniture" })
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
      this.isAdd = false;
      this.clearUpdates();
    } else {
      this.unsavedDialog = true;
    }
  }

  /**
   * Commits updates to Firestore
   */
  saveUpdates(): void {
    this.commitUpdates({ collection: collections.INVENTORY });
    this.isEdit = false;
  }

  /**
   * Shows dialog to add item
   */
  addItem(): void {
    this.setCurrent({ item: new Furniture() });
    this.isEdit = true;
    this.isAdd = true;
    this.editCard = true;
  }

  /**
   * Commits new item to Firestore
   */
  async commitAddItem(): Promise<void> {
    await this.commitItem();
    this.closeDialog();
  }
}
</script>
