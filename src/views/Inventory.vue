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

    <!-- Filter Bar -->
    <v-layout row mb-3>
      <FilterBar v-on:filter="customFilter($event)" v-on:clear="clearFilter($event)" />
    </v-layout>

    <!-- TODO: Should appear and disappear (or become disabled) when items are selected or unselected  -->
    <!-- TODO: Archive, delete, eventually separate and add to list for runs -->
    <!-- Toolbar for selected items -->
    <v-layout row mb-3>
      <v-card v-if="selected != []"></v-card>
    </v-layout>

    <v-data-table
      v-model="selected"
      select-all
      :search="search"
      :headers="headers"
      :items="inventoryFiltered"
      :pagination.sync="pagination"
      item-key="id"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td>
          {{ props.item.physical.class
          }}{{ props.item.physical.set ? ", Set" : "" }}
        </td>
        <td>{{ props.item.timing.dateAdded.toDate().toLocaleDateString() }}</td>
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
import FilterBar from "@/components/FilterBar.vue";
// import MultiFilters from "@/plugins/MultiFilter";
// import MultiFiltersPlugin from "../plugins/MultiFilter";

@Component({
  components: {
    ViewTitle,
    FilterBar
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
  invLength = 13;
  inventoryFiltered = this.inventory;
  inventoryTemp = [];

  // Gets the furniture collection from firebase and pushes each item to inventory
  // TODO: Duplicate handling?
  getInventory() {
    const furniture = this.db.collection("furniture");
    furniture.onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        this.inventory.push(doc.data() as Furniture);
      });
    });
  }

  // Converts the string [status] from FilterBar dictionary to numerical value (matches Furniture.ts)
  convertStatus(status: string) {
    if (status === "donor") return 0;
    else if (status === "on truck") return 1;
    else if (status === "shed") return 2;
    else if (status === "delivered") return 3;
    else if (status === "unknown") return 4;
    else return -1;
  }

  typeList = [];
  typeFilterList(type: string, index: number) {
    if (this.inventory[index].physical.class.toLowerCase().trim() == type) {
      this.typeList.push(this.inventory[index]);
    }
  }

  statusList = [];
  statusFilterList(status: string, index: number) {
    if (this.inventory[index].status == this.convertStatus(status)) {
      this.statusList.push(this.inventory[index]);
    }
  }

  filterIntersection(f1: Furniture[], f2: Furniture[]) {
    alert("reach");
    if (f1.length == 0) {
      alert("f1 empty");
      return f2;
    } else if (f2.length == 0) {
      return f1;
    } else {
      var setA = new Set(f1);
      var setB = new Set(f2);
      var intersection = new Set([...setA].filter(x => setB.has(x)));
      return Array.from(intersection);
    }
  }

  // Filter function that allows for multiple filters to be applied to the data table
  // This function is HARD CODED to process the filters returned by the FilterBar
  customFilter(filters: { [key: string]: string }) {
    this.inventoryFiltered = [];
    this.typeList = [];
    this.statusList = [];
    for (let i = 0; i < this.invLength; i++) {
      if (filters["type"] != "") {
        this.typeFilterList(filters["type"], i);
      }
      // if (
      //   filters["material"] != "" &&
      //   this.inventory[i].physical.material.toLowerCase().trim() !=
      //     filters["material"]
      // ) {
      //   {
      //     this.inventoryFiltered = this.inventoryFiltered.splice(
      //       this.inventoryFiltered.indexOf(this.inventory[i]),
      //       1
      //     );
      //   }
      // }
      if (filters["status"] != "") {
        this.statusFilterList(filters["status"], i);
      }
      // if (this.typeList.includes(this.inventory[i]) || this.typeList === []) {
      //   if (
      //     this.statusList.includes(this.inventory[i] || this.statusList === [])
      //   ) {
      //     this.inventoryFiltered.push(this.inventory[i]);
      //   }
      // }
    }
    this.inventoryFiltered = this.filterIntersection(
      this.typeList,
      this.statusList
    );
  }

  // TODO: This currently clears all the filters, should really only clear one at a time
  // TODO: Rework params to include which filter has been cleared so can remove one at a time
  clearFilter(filters: { [key: string]: string }) {
    this.inventory = [];
    this.getInventory();
    this.inventoryFiltered = this.inventory;
  }

  mounted() {
    this.getInventory();
  }

  // beforeUpdate() {
  //   this.inventoryFiltered = this.inventory;
  // }
}
</script>
