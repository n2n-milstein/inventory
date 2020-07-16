<template>
  <v-col cols="12">
    <furniture-table-header
      v-model="search"
      title="Archive"
      class="px-4 mb-3"
    />

    <div class="mb-4 d-inline-flex" align="center">
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="archiveActions"
        :disabled="selected.length < 1"
        @download="getSpreadsheet"
        @unarchive="unarchiveSelected()"
        @delete="deleteSelected()"
      />
    </div>

    <table-filters
      :start-date-filter="startDateFilter"
      :end-date-filter="endDateFilter"
      :status-filter="statusFilter"
      :class-filter="classFilter"
      :donor-filter="donorFilter"
      :zone-filter="zoneFilter"
      :inventory="archive"
      @startdate="startDateFilter = $event"
      @enddate="endDateFilter = $event"
      @status="statusFilter = $event"
      @class="classFilter = $event"
      @donor="donorFilter = $event"
      @zone="zoneFilter = $event"
    />

    <furniture-table
      namespace="archive"
      :headers="headers"
      :search="search"
      :items="archive"
      :downloading="downloading"
      :collection="COLLECTION"
    />

    <furniture-card-dialog
      namespace="archive"
      :dialog="editCard"
      :menu-actions="menuActions"
      :menu-loading="menuLoading"
      @add="commitAddItem()"
      @unarchive="commitUnarchive()"
      @export="commitExport()"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Component from "vue-class-component";
// data
import { Furniture, Status } from "@/data/Furniture";
import Timing from "@/data/furniture/Timing";
import ViewAction from "@/data/ViewAction";
import { FClass } from "@/data/furniture/Physical";
import collections from "@/network/collections";
import { action } from "@/store/modules/collection/types";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";
import TableFilters from "@/components/FurnitureTableFilters.vue";

const NAMESPACE = "archive";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
    FurnitureCardDialog,
    TableFilters,
  },
  computed: mapGetters(NAMESPACE, {
    archive: "getItems",
    current: "getCurrent",
    selected: "getSelected",
  }),
  methods: mapActions(NAMESPACE, [
    action.BIND_ITEMS,
    action.CLEAR_CURRENT,
    action.EXPORT_SELECTED,
    action.EXPORT_CURRENT,
    "unarchiveSelected",
    "unarchiveCurrent",
    "deleteSelected",
  ]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.ARCHIVE;

  readonly current!: Furniture;

  readonly [action.BIND_ITEMS]!: () => Promise<void>;

  readonly [action.EXPORT_SELECTED]!: () => Promise<void>;

  readonly [action.EXPORT_CURRENT]!: () => Promise<void>;

  readonly [action.CLEAR_CURRENT]!: () => void;

  readonly unarchiveCurrent!: () => Promise<void>;

  /** Furniture card dialog */
  isEdit = false;

  get editCard(): boolean {
    return !!this.current;
  }

  downloading = false;

  search = "";

  get archiveActions(): ViewAction[] {
    return [
      {
        icon: "unarchive",
        desc: "Unarchive selected items",
        emit: "unarchive",
      },
      {
        icon: "cloud_download",
        desc: "Export selected items to spreadsheet",
        emit: "download",
        loading: (): boolean => this.downloading,
      },
      {
        icon: "delete",
        desc: "Delete selected items",
        emit: "delete",
      },
    ];
  }

  menuLoading = false;

  /** Filters */
  startDateFilter = "";

  endDateFilter = new Date().toISOString().substr(0, 10);

  donorFilter = [] as string[];

  zoneFilter = [] as string[];

  classFilter = Object.keys(FClass);

  statusFilter = Object.values(Status)
    .filter((v) => typeof (v as any) !== "number")
    .map((text, index) => {
      return index;
    });

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

  readonly menuActions: ViewAction[] = [
    { icon: "unarchive", desc: "Unarchive", emit: "unarchive" },
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

  async commitUnarchive(): Promise<void> {
    this.menuLoading = true;
    await this.unarchiveCurrent();
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
