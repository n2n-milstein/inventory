<template>
  <v-col cols="12">
    <furniture-table-header v-model="search" title="Inventory" />

    <v-row class="px-4 mb-4">
      <v-btn
        :disabled="selected.length > 0"
        :icon="selected.length > 0"
        :outlined="selected.length > 0"
        color="primary"
        rounded
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
    </v-row>

    <furniture-table
      namespace="inventory"
      :search="search"
      :items="inventory"
      :collection="COLLECTION"
      @download="getSpreadsheet()"
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
import { Furniture } from "@/data/Furniture";
import ViewAction from "@/data/ViewAction";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";

const NAMESPACE = "inventory";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
  },
  computed: mapGetters(NAMESPACE, {
    inventory: "getItems",
    current: "getCurrent",
    selected: "getSelected",
  }),
  methods: mapActions(NAMESPACE, ["bindItems", "archiveItems"]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.INVENTORY;

  bindItems!: () => Promise<void>;

  selected!: Furniture[];

  downloading = false;

  search = "";

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
}
</script>
