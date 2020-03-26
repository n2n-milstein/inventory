<template>
  <v-col cols="12" class="inventory">
    <v-dialog v-model="dialog" width="750" scrollable>
      <edit-card @cancel="dialog = false" />
    </v-dialog>
    <v-row class="mb-3 px-4" align="baseline">
      <view-title title="Inventory" />
      <v-spacer />
      <v-col cols="6">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search inventory"
          single-line
          hide-details
        />
      </v-col>
    </v-row>
    <inventory-actions
      class="px-4 mb-4"
      :selected="selected.length > 0"
      @download="getSpreadsheet"
    />
    <v-data-table
      v-model="selected"
      :search="search"
      :headers="headers"
      :items="inventory"
      :options.sync="pagination"
      show-select
      item-key="id"
      @click:row="onItemClick"
    >
      <template v-slot:item.timing.dateAdded="{ item }">
        {{ item.timing.dateAdded.toDate().toLocaleDateString() }}
      </template>
      <template v-slot:item.physical.class="{ item }">
        {{ item.physical.class }}{{ item.physical.set ? ", Set" : "" }}
      </template>
      <template v-slot:item.status="{ item }">
        {{ status[item.status] }}
      </template>
    </v-data-table>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ViewTitle from "@/components/ViewTitle.vue";
import InventoryActions from "@/components/InventoryActions.vue";
import EditCard from "@/components/EditCard.vue";
import { Status, Furniture } from "@/data/Furniture";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({
  components: {
    ViewTitle,
    InventoryActions,
    EditCard,
  },
})
export default class Inventory extends Vue {
  status = Status;

  db = firebase.firestore();

  selected = [];

  dialog = false;

  pagination = { itemsPerPage: -1 };

  headers = [
    { text: "Class", value: "physical.class" },
    { text: "Date Added", value: "timing.dateAdded" },
    { text: "Address", value: "donor.address" },
    { text: "Status", value: "status" },
  ];

  search = "";

  inventory: Furniture[] = [];

  getInventory(): void {
    const furniture = this.db.collection("furniture");
    furniture.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        this.inventory.push(doc.data() as Furniture);
      });
    });
  }

  getSpreadsheet(): void {
    const getInventoryXLSX = firebase
      .functions()
      .httpsCallable("getInventoryXLSX");
    getInventoryXLSX(this.selected)
      .then((res) => {
        const storage = firebase.storage();
        const gsref = storage.refFromURL(`gs:/${res.data}`);
        gsref.getDownloadURL().then((url) => {
          window.open(url);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  mounted(): void {
    this.getInventory();
  }

  onItemClick(item: Furniture): void {
    console.log(item);
    this.dialog = true;
  }
}
</script>
