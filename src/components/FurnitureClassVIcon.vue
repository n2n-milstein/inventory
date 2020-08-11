<template>
  <span>
    <v-icon v-if="item.physical.class === 'Chair'">event_seat</v-icon>
    <v-icon v-else-if="item.physical.class === 'Bed'">mdi-bed</v-icon>
    <v-icon v-else-if="item.physical.class === 'Couch'">weekend</v-icon>
    <v-icon v-else-if="item.physical.class === 'Table'">
      mdi-table-furniture
    </v-icon>
    <v-icon v-else-if="item.physical.class === 'Dresser'">
      mdi-dresser
    </v-icon>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Furniture } from "@/data/Furniture";
import { Prop } from "vue-property-decorator";

@Component
export default class FurnitureClassVIcon extends Vue {
  @Prop({})
  readonly item!: Furniture;
}
</script>
