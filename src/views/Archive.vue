<template>
  <v-col class="mt-4" cols="12">
    <furniture-table-header v-model="search" title="Archive" />
    <div class="mb-4 d-inline-flex" align="center">
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="actions"
        :disabled="selected.length < 1"
        @download="getSpreadsheet"
        @unarchive="unarchiveItems()"
        @delete="deleteItems()"
      />
    </div>

    <table-filters
      :start-date-filter="startDateFilter"
      :end-date-filter="endDateFilter"
      :status-filter="statusFilter"
      :class-filter="classFilter"
      :donor-filter="donorFilter"
      :inventory="archive"
      @startdate="startDateFilter = $event"
      @enddate="endDateFilter = $event"
      @status="statusFilter = $event"
      @class="classFilter = $event"
      @donor="donorFilter = $event"
    />

    <furniture-table
      namespace="archive"
      :headers="headers"
      :search="search"
      :items="archive"
      :downloading="downloading"
      :collection="COLLECTION"
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
// data
import { Furniture, Status } from "@/data/Furniture";
import Timing from "@/data/furniture/Timing";
import ViewAction from "@/data/ViewAction";
import { FClass } from "@/data/furniture/Physical";
import collections from "@/network/collections";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/InventoryArchive/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import TableFilters from "@/components/InventoryArchive/FurnitureTableFilters.vue";

const NAMESPACE = "archive";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
    TableFilters,
  },
  computed: mapGetters(NAMESPACE, {
    archive: "getItems",
    current: "getCurrent",
    selected: "getSelected",
  }),
  methods: mapActions(NAMESPACE, [
    "bindItems",
    "unarchiveItems",
    "deleteItems",
  ]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.ARCHIVE;

  get actions(): ViewAction[] {
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

  /** Filters */
  startDateFilter = "";

  endDateFilter = new Date().toISOString().substr(0, 10);

  donorFilter = [] as string[];

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

  bindItems!: () => Promise<void>;

  selected!: Furniture[];

  downloading = false;

  search = "";

  /**
   * Called when component is mounted (lifecycle hook); binds inventory in
   * store to Firebase.
   */
  mounted(): void {
    this.bindItems();
  }

  getSpreadsheet(): void {
    this.downloading = true;
    const getInventoryXLSX = firebase
      .functions()
      .httpsCallable("getInventoryXLSX");
    const idArray = this.selected.map((value) => value.id);
    // Uncomment if running `npm run shell` for backend functions:
    // firebase.functions().useFunctionsEmulator("http://localhost:5001");
    getInventoryXLSX({ id: idArray, category: "archive" })
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
}
</script>
