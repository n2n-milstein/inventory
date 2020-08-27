<template>
  <v-col cols="12">
    <furniture-table-header
      v-model="search"
      title="Clients"
      class="px-4 mb-3"
    />

    <div class="mb-4 d-inline-flex" align="center">
      <v-btn
        :disabled="false"
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
      />
    </div>

    <client-filters
      :start-date-filter="startDateFilter"
      :end-date-filter="endDateFilter"
      :need-filter="needFilter"
      :request-filter="requestFilter"
      :donor-filter="donorFilter"
      :zone-filter="zoneFilter"
      :inventory="inventory"
      @startdate="startDateFilter = $event"
      @enddate="endDateFilter = $event"
      @need="needFilter = $event"
      @request="requestFilter = $event"
      @donor="donorFilter = $event"
      @zone="zoneFilter = $event"
    />

    <client-table
      namespace="clients"
      :headers="headers"
      :search="search"
      :items="inventory"
      :collection="COLLECTION"
    />

    <client-card-dialog
      namespace="clients"
      :dialog="editCard"
      :is-add="isAdd"
      :menu-actions="menuActions"
      :menu-loading="menuLoading"
      @add="commitAddItem()"
      @archive="commitArchive()"
      @export="commitExport()"
      @close="isAdd = false"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Component from "vue-class-component";
// network, data
import collections from "@/network/collections";
// components
import ClientTable from "@/components/ClientTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import ClientCardDialog from "@/components/ClientCardDialog.vue";
import ClientFilters from "@/components/ClientTableFilters.vue";
// store
import { action } from "@/store/modules/collection/types";
import Timing from "@/data/furniture/Timing";
// eslint-disable-next-line prettier/prettier
import Client, {generateClient, needOptions, requestOptions} from "../data/Client";

const NAMESPACE = "clients";

@Component({
  components: {
    ClientTable,
    FurnitureTableHeader,
    ViewActionGroup,
    ClientCardDialog,
    ClientFilters,
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
    "archiveSelected",
    "archiveCurrent",
    "commitItem",
  ]),
})
export default class Clients extends Vue {
  readonly COLLECTION = collections.CLIENTS;

  /** Vuex map helper properties */
  readonly current!: Client;

  readonly [action.BIND_ITEMS]!: () => Promise<void>;

  readonly [action.SET_CURRENT]!: ({ item }: { item: Client }) => void;

  readonly [action.EXPORT_SELECTED]!: () => Promise<void>;

  readonly [action.CLEAR_CURRENT]!: () => void;

  readonly [action.EXPORT_CURRENT]!: () => Promise<void>;

  readonly commitItem!: () => Promise<void>;

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

  requestFilter = requestOptions.map((x) => x.value);

  needFilter = needOptions.map((x) => x.value);

  donorFilter = [] as string[];

  zoneFilter = [] as string[];

  get headers(): any {
    return [
      {
        text: "Client",
        value: "clientName",
        filter: (value: any): boolean => {
          if (this.donorFilter.length === 0) return true;
          return this.donorFilter.includes(value);
        },
      },
      {
        text: "Address",
        value: "clientAddress",
        // filter: (value: any): boolean => {
        //   if (this.addressFilter.length === 0) return true;
        //   return this.addressFilter.includes(value);
        // },
      },
      {
        text: "Zone",
        value: "clientArea",
        filter: (value: any): boolean => {
          if (this.zoneFilter.length === 0) return true;
          return this.zoneFilter.includes(value);
        },
      },
      {
        text: "Furniture",
        value: "requestedFurniture",
        filter: (value: any): boolean => {
          return this.requestFilter.reduce((acc, x) => acc || value[x], false);
        },
      },
      {
        text: "Need",
        value: "reasonForNeed",
        filter: (value: any): boolean => {
          return this.needFilter.reduce((acc, x) => acc || value[x], false);
        },
      },
      {
        text: "Date Requested",
        value: "dateOfReferral",
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

  inventoryActions = [
    {
      icon: "playlist_add",
      desc: "Add selected items to run",
      emit: "list-add",
    },
  ];

  /**
   * Called when component is mounted (lifecycle hook); binds inventory in
   * store to Firebase.
   */
  mounted(): void {
    this.bindItems();
  }

  /**
   * Shows dialog to add item
   */
  addItem(): void {
    this.setCurrent({ item: generateClient() });
    // this.isAdd = true;
    this.commitAddItem();
  }

  /**
   * Commits new item to Firestore
   */
  async commitAddItem(): Promise<void> {
    await this.commitItem();
    // this.isAdd = false;
    this.clearCurrent();
  }
}
</script>
