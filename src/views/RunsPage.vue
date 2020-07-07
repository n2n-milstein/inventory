<template>
  <v-col cols="12">
    <furniture-table-header
      v-model="search"
      title="Runs"
      subtitle="Click on “View Details” to make edits to a run"
      class="px-4 mb-3"
    />
    <run-card
      title="Date"
      :volunteers="testRun.volunteers"
      :pick-ups="testRun.pickUps"
      :drop-offs="testRun.dropOffs"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// components
import FurnitureTableHeader from "@/components/InventoryArchive/FurnitureTableHeader.vue";
import RunCard from "@/components/RunCard.vue";
import { FClass, Material } from "@/data/furniture/Physical";

@Component({ components: { FurnitureTableHeader, RunCard } })
export default class RunsPage extends Vue {
  search = "";

  readonly testRun = {
    volunteers: [
      { type: "Driver", name: "Johann Smith", phone: "(123) 124-2145" },
      { type: "Mover", name: "Johann Smith", phone: "(123) 124-2145" },
    ],
    pickUps: [
      {
        address: "124 Cornell St Ithaca, NY 14853",
        donor: { type: "Donor", name: "Johann Smith", phone: "(123) 124-2145" },
        items: [],
      },
    ],
    dropOffs: [
      {
        address: "124 Cornell St Ithaca, NY 14853",
        donor: {
          type: "Recipient",
          name: "Johann Smith",
          phone: "(123) 124-2145",
        },
        items: [
          {
            class: FClass.Chair,
            size: 5,
            material: Material.Wood,
            set: false,
            hasFrame: false,
            hasBoxSpring: false,
            numChairs: 0,
            heavy: false,
          },
        ],
      },
      {
        address: "124 Cornell St Ithaca, NY 14853",
        donor: {
          type: "Recipient",
          name: "Johann Smith",
          phone: "(123) 124-2145",
        },
        items: [
          {
            class: FClass.Bed,
            size: 5,
            material: Material.Wood,
            set: false,
            hasFrame: false,
            hasBoxSpring: false,
            numChairs: 0,
            heavy: false,
          },
          {
            class: FClass.Chair,
            size: 5,
            material: Material.Wood,
            set: false,
            hasFrame: false,
            hasBoxSpring: false,
            numChairs: 0,
            heavy: false,
          },
        ],
      },
    ],
  };
}
</script>
