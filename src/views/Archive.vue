<template>
  <v-col cols="12">
    <furniture-table-header v-model="search" title="Archive" />

    <furniture-table
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
import { Furniture } from "@/data/Furniture";
import collections from "@/network/collections";
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";

const namespace = "inventory";

@Component({
  components: { FurnitureTable, FurnitureTableHeader },
  computed: mapGetters(namespace, {
    archive: "getArchive",
    current: "getCurrent",
    selected: "getSelected",
  }),
  methods: mapActions(namespace, ["bindArchive"]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.ARCHIVE;

  bindArchive!: () => Promise<void>;

  selected!: Furniture[];

  downloading = false;

  search = "";

  /**
   * Called when component is mounted (lifecycle hook); binds inventory in
   * store to Firebase.
   */
  mounted(): void {
    this.bindArchive();
  }

  // getSpreadsheet(): void {
  //   this.downloading = true;
  //   const getInventoryXLSX = firebase
  //     .functions()
  //     .httpsCallable("getInventoryXLSX");
  //   const parsedobj = JSON.parse(JSON.stringify(this.selected));
  //   const idArray = [];
  //   for (let i = 0; i < this.selected.length; i += 1) {
  //     idArray.push(parsedobj[i].id);
  //   }
  //   // Uncomment if running `npm run shell` for backend functions:
  //   // firebase.functions().useFunctionsEmulator("http://localhost:5000");
  //   getInventoryXLSX({ id: idArray, category: "archive" })
  //     .then((res) => {
  //       const storage = firebase.storage();
  //       const gsref = storage.refFromURL(`gs:/${res.data}`);
  //       gsref.getDownloadURL().then((url) => {
  //         window.open(url);
  //       });
  //       this.downloading = false;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log(this.selected.length); // workaround not using this
  //       this.downloading = false;
  //     });
  // }
}
</script>
