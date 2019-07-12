<template>
  <v-flex xs12 class="inventory">
    <v-data-table
      v-model="selected"
      select-all
      :headers="headers"
      :items="furniture"
      :pagination.sync="pagination"
      item-key="physical.class"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>{{ props.item.physical.class }}</td>
        <td>
          {{ props.item.timing.dateAdded.toLocaleDateString() }}
        </td>
        <td>{{ props.item.donor.zone }}</td>
        <td>{{ props.item.physical.size }}</td>
        <td>{{ props.item.status }}</td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { FClass, Material, Status, Furniture } from "@/data/Furniture";

@Component
export default class Inventory extends Vue {
  selected = [];
  pagination = {
    rowsPerPage: -1
  };
  headers = [
    { text: "Class", value: "physical.class" },
    { text: "Date Added", value: "timing.dateAdded" },
    { text: "Zone", value: "donor.zone" },
    { text: "Size", value: "physical.size" },
    { text: "Status", value: "status" }
  ];

  furniture: Furniture[] = [];
}
</script>
