<template>
  <v-flex xs12 class="inventory">
    <v-layout row mb-3 px-4 align-baseline>
      <view-title title="Inventory" />
      <v-spacer />
      <v-flex xs6>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search inventory"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      v-model="selected"
      select-all
      :search="search"
      :headers="headers"
      :items="inventory"
      :pagination.sync="pagination"
      item-key="id"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>
          {{ props.item.physical.class
          }}{{ props.item.physical.set ? ", Set" : "" }}
        </td>
        <td>
          {{ props.item.timing.dateAdded.toDate().toLocaleDateString() }}
        </td>
        <td>{{ props.item.donor.address }}</td>
        <td>{{ status[props.item.status] }}</td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ViewTitle from "@/components/ViewTitle.vue";
import { FClass, Material, Status, Furniture } from "@/data/Furniture";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({
  components: {
    ViewTitle
  }
})
export default class Inventory extends Vue {
  status = Status;
  db = firebase.firestore();
  selected = [];
  pagination = {
    rowsPerPage: -1
  };
  headers = [
    { text: "Class", value: "physical.class" },
    { text: "Date Added", value: "timing.dateAdded" },
    { text: "Address", value: "donor.address" },
    { text: "Status", value: "status" }
  ];

  search = "";

  inventory: Furniture[] = [];

  getInventory() {
    const furniture = this.db.collection("furniture");
    furniture.onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        this.inventory.push(doc.data() as Furniture);
      });
    });
  }

  mounted() {
    this.getInventory();
  }
}
</script>
