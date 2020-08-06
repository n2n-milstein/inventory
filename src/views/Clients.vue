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
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";
import ClientFilters from "@/components/ClientTableFilters.vue";
// store
import { action } from "@/store/modules/collection/types";
// eslint-disable-next-line prettier/prettier
import Client, { generateClient, needOptions, requestOptions } from "../data/Client";

const NAMESPACE = "clients";

@Component({
  components: {
    ClientTable,
    FurnitureTableHeader,
    ViewActionGroup,
    FurnitureCardDialog,
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

  requestFilter = requestOptions;

  needFilter = needOptions;

  donorFilter = [] as string[];

  zoneFilter = [] as string[];

  headers = [
    {
      text: "Client",
      value: "clientName",
    },
    {
      text: "Address",
      value: "clientAddress",
    },
    {
      text: "Zone",
      value: "clientArea",
    },
    {
      text: "Furniture",
      value: "requestedFurniture",
    },
    {
      text: "Need",
      value: "reasonForNeed",
    },
    {
      text: "Date Requested",
      value: "dateOfReferral",
    },
  ];

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
