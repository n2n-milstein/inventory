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
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click:close="remove(data.item)"
          >
            {{ data.item }}
          </v-chip>
        </template>
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

  // get searchOptions(): any {
  //   return this.inventory
  //     .map((x) => {
  //       return x.donor.name;
  //     })
  //     .concat(
  //       this.inventory.map((x) => {
  //         return x.donor.address;
  //       }),
  //     );
  // }

  get searchOptions(): any {
    return [
      { header: "Donor" },
      ...this.inventory.map((x) => {
        return x.donor.name;
      }),
      { header: "Address" },
      ...this.inventory.map((x) => {
        return x.donor.address;
      }),
    ];
  }

  update(value: string[]): void {
    this.$emit("search", value);
  }

  remove(value: any): void {
    this.$emit("remove", value);
  }
}
</script>
