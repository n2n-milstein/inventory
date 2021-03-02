<template>
  <v-col cols="12">
    <furniture-table-header
      v-model="search"
      title="Inventory"
      class="px-4 mb-3"
    />

    <div class="mb-4 d-inline-flex" align="center">
      <v-btn
        :disabled="selected.length > 0"
        :icon="selected.length > 0"
        :outlined="selected.length > 0"
        color="primary"
        rounded
        @click="addItem()"
      >
        <v-icon left>add</v-icon>
        {{ selected.length > 0 ? "" : "Add" }}
      </v-btn>
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="inventoryActions"
        :disabled="selected.length < 1"
        @download="getSpreadsheet"
        @archive="archiveSelected()"
      />
    </div>

    <table-filters
      :start-date-filter="startDateFilter"
      :end-date-filter="endDateFilter"
      :status-filter="statusFilter"
      :class-filter="classFilter"
      :donor-filter="donorFilter"
      :zone-filter="zoneFilter"
      :inventory="inventory"
      @startdate="startDateFilter = $event"
      @enddate="endDateFilter = $event"
      @status="statusFilter = $event"
      @class="classFilter = $event"
      @donor="donorFilter = $event"
      @zone="zoneFilter = $event"
    />

    <furniture-table
      :current="current"
      :headers="headers"
      :search="search"
      :items="inventory"
      :collection="COLLECTION"
      @download="getSpreadsheet()"
      @on-item-click="setCurrent({ item: $event })"
    />

    <furniture-card-dialog
      :current="current"
      :dialog="editCard"
      :is-add="isAdd"
      :menu-actions="menuActions"
      :menu-loading="menuLoading"
      @save-changes="commitItem($event)"
      @archive="commitArchive()"
      @export="commitExport()"
      @close="closeDialog()"
    />
    <!-- TODO: edit @close function -->
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Component from "vue-class-component";
// network, data
import collections from "@/network/collections";
import { Furniture, Status } from "@/data/Furniture";
import { FClass } from "@/data/furniture/Physical";
import Timing from "@/data/furniture/Timing";
import ViewAction from "@/data/ViewAction";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";
import TableFilters from "@/components/FurnitureTableFilters.vue";
// store
import { action } from "@/store/modules/collection/types";

const NAMESPACE = "inventory";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
    FurnitureCardDialog,
    TableFilters,
  },
  computed: mapGetters(NAMESPACE, {
    inventory: "getItems",
    current: "getCurrent",
    selected: "getSelected",
  }),
  methods: mapActions(NAMESPACE, [
    action.BIND_ITEMS,
    action.SET_CURRENT,
    action.CLEAR_CURRENT,
    action.EXPORT_SELECTED,
    action.EXPORT_CURRENT,
    action.COMMIT_UPDATES,
    action.UPDATE_CURRENT,
    "archiveSelected",
    "archiveCurrent",
    "commitAddItem",
  ]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.INVENTORY;

  /** Vuex map helper properties */
  readonly current!: Furniture;

  readonly [action.BIND_ITEMS]!: () => Promise<void>;

  readonly [action.SET_CURRENT]!: ({ item }: { item: Furniture }) => void;

  readonly [action.EXPORT_SELECTED]!: () => Promise<void>;

  readonly [action.CLEAR_CURRENT]!: () => void;

  readonly [action.EXPORT_CURRENT]!: () => Promise<void>;

  readonly [action.COMMIT_UPDATES]!: () => Promise<void>;

  /* eslint-disable object-curly-newline */
  readonly [action.UPDATE_CURRENT]!: ({
    updates,
  }: {
    updates: Partial<Furniture>;
  }) => Promise<void>;
  /* eslint-enable object-curly-newline */

  readonly commitAddItem!: () => Promise<void>;

  readonly archiveCurrent!: () => Promise<void>;

  /** Furniture card dialog */
  isAdd = false;

  get editCard(): boolean {
    return !!this.current;
  }

  /** Actions and search */
  search = "";

  /** start filters */
  startDateFilter = "";

  endDateFilter = new Date().toISOString().substr(0, 10);

  classFilter = Object.keys(FClass);

  statusFilter = Object.values(Status)
    .filter((v) => typeof (v as any) !== "number")
    .map((text, index) => {
      return index;
    });

  donorFilter = [] as string[];

  zoneFilter = [] as string[];

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
        text: "Status",
        value: "status",
        filter: (value: number): boolean => {
          return this.statusFilter.includes(value);
        },
      },
      {
        text: "Zone",
        value: "donor.zone",
        filter: (value: any): boolean => {
          if (this.zoneFilter.length === 0) return true;
          return this.zoneFilter.includes(value);
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
        text: "Date Added",
        value: "timing.dateAdded",
        filter: (value: any): boolean => {
          const valDate = new Date(Timing.formatDate(value));
          const endDate = new Date(this.endDateFilter);
          if (this.startDateFilter === "") {
            return valDate <= endDate;
          }
          const startDate = new Date(this.startDateFilter);
          return Timing.inRange(valDate, startDate, endDate);
        },
      },
    ];
  }

  /** end filters */

  downloading = false;

  get inventoryActions(): ViewAction[] {
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

  menuLoading = false;

  readonly menuActions: ViewAction[] = [
    { icon: "archive", desc: "Archive", emit: "archive" },
    {
      icon: "cloud_download",
      desc: "Export",
      emit: "export",
    },
  ];

  /**
   * Called when component is mounted (lifecycle hook); binds inventory in
   * store to Firebase.
   */
  mounted(): void {
    this.bindItems();
  }

  async getSpreadsheet(): Promise<void> {
    this.downloading = true;
    await this.exportSelected();
    this.downloading = false;
  }

  /**
   * Shows dialog to add item
   */
  addItem(): void {
    this.setCurrent({ item: new Furniture() });
    this.isAdd = true;
  }

  /**
   * Closes dialog by clearing current
   */
  closeDialog(): void {
    this.clearCurrent();
    this.isAdd = false;
  }

  /**
   * Commits new item to Firestore
   */
  async commitItem(updates: Partial<Furniture>): Promise<void> {
    this.updateCurrent({ updates });
    if (this.isAdd) {
      await this.commitAddItem();
      this.isAdd = false;
      this.clearCurrent();
    } else {
      await this.commitUpdates();
    }
  }

  async commitArchive(): Promise<void> {
    this.menuLoading = true;
    await this.archiveCurrent();
    this.menuLoading = false;
    this.clearCurrent();
  }

  async commitExport(): Promise<void> {
    this.menuLoading = true;
    await this.exportCurrent();
    this.menuLoading = false;
  }
}
</script>
