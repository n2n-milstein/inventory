<template>
  <v-col cols="12">
    <furniture-table-header v-model="search" title="Archive" />

    <v-row class="px-4 mb-4">
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="actions"
        :disabled="selected.length < 1"
        @download="getSpreadsheet"
        @unarchive="unarchiveItems()"
      />
    </v-row>

    <furniture-table
      namespace="archive"
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
import { Furniture } from "@/data/Furniture";
import ViewAction from "@/data/ViewAction";
import collections from "@/network/collections";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";

const NAMESPACE = "archive";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
  },
  computed: mapGetters(NAMESPACE, {
    archive: "getItems",
    current: "getCurrent",
    selected: "getSelected",
  }),
  methods: mapActions(NAMESPACE, ["bindItems", "unarchiveItems"]),
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
    const parsedobj = JSON.parse(JSON.stringify(this.selected));
    const idArray = [];
    for (let i = 0; i < this.selected.length; i += 1) {
      idArray.push(parsedobj[i].id);
    }
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
