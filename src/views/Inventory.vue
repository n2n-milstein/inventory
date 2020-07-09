<template>
  <v-col class="mt-4" cols="12">
    <furniture-table-header v-model="search" title="Inventory" />
    <div class="mb-4 d-inline-flex" align="center">
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
    </div>

    <table-filters
      :start-date-filter="datesFilter[0]"
      :end-date-filter="datesFilter[1]"
      :status-filter="statusFilter"
      :class-filter="classFilter"
      :donor-filter="donorFilter"
      :address-filter="addressFilter"
      :inventory="inventory"
      @startdate="datesFilter[0] = $event"
      @enddate="datesFilter[1] = $event"
      @status="statusFilter = $event"
      @class="classFilter = $event"
      @donor="donorFilter = $event"
    />

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
import Timing from "@/data/furniture/Timing";
import ViewAction from "@/data/ViewAction";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/InventoryArchive/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";
import UnsavedDialog from "@/components/FurnitureCardUnsavedDialog.vue";
import TableFilters from "@/components/InventoryArchive/FurnitureTableFilters.vue";
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
    TableFilters,
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

  /** start filters */
  datesFilter = [new Date().toISOString().substr(0, 10), ""];

  classFilter = Object.keys(FClass);

  statusFilter = Object.values(Status)
    .filter((v) => typeof (v as any) !== "number")
    .map((text, index) => {
      return index;
    });

  donorFilter = [] as string[];

  get headers(): any {
    return [
      {
        text: "Class",
        value: "physical.class",
        filter: (value: string): boolean => {
          return this.classFilter.includes(value);
        },
      },
      {
        text: "Date Added",
        value: "timing.dateAdded",
        filter: (value: any): boolean => {
          const formatted = Timing.formatDate(value);
          if (this.datesFilter.length === 0) return true;
          return this.datesFilter.includes(formatted);
        },
      },
      {
        text: "Address",
        value: "donor.address",
        // filter: (value: any): boolean => {
        //   if (this.addressFilter.length === 0) return true;
        //   return this.addressFilter.includes(value);
        // },
      },
      {
        text: "Donor",
        value: "donor.name",
        filter: (value: any): boolean => {
          if (this.donorFilter.length === 0) return true;
          return this.donorFilter.includes(value);
        },
      },
      {
        text: "Status",
        value: "status",
        filter: (value: number): boolean => {
          return this.statusFilter.includes(value);
        },
      },
    ];
  }
  /** end filters */

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
