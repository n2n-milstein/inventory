<template>
  <v-row class="mb-3 px-4" align="baseline">
    <h2 class="title">
      {{ title }}
    </h2>
    <v-spacer />
    <v-col cols="6">
      <v-autocomplete
        @change="update($event)"
        :value="searchFilter"
        :items="searchOptions"
        chips
        multiple
        prepend-icon="mdi-magnify"
        label="Search"
      >
      </v-autocomplete>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Furniture } from "@/data/Furniture";

@Component
export default class FurnitureTableHeader extends Vue {
  @Prop({ default: "Default title" })
  readonly title!: string;

  @Prop({})
  readonly searchFilter!: string[];

  @Prop({})
  readonly inventory!: Furniture[];

  get searchOptions(): any {
    return this.inventory.map((x) => x.donor.name);
  }

  update(value: string[]): void {
    this.$emit("search", value);
  }
}
</script>
