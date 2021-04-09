<template>
  <div>
    <v-data-table
      :value="selected"
      @input="onItemSelected($event)"
      :search="search"
      :custom-filter="searchFilter"
      :headers="headers"
      :items="items"
      :options.sync="PAGINATION"
      show-select
      item-key="id"
      @click:row="onItemClick"
    >
      <template v-slot:item.timing.dateAdded="{ item }">
        {{ item.timing.dateAdded.toLocaleDateString() }}
      </template>
      <template v-slot:item.physical.class="{ item }">
        {{ item.physical.class }}{{ item.physical.set ? ", Set" : "" }}
      </template>
      <template v-slot:item.status="{ item }">
        {{ STATUS[item.status] }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Emit, Prop } from "vue-property-decorator";
import { Status, Furniture } from "@/data/Furniture";
import collections from "@/network/collections";
import Timing from "@/data/furniture/Timing";

@Component({})
export default class FurnitureTable extends Vue {
  @Prop({})
  readonly current!: Furniture;

  @Prop({ default: null })
  readonly collection!: collections;

  @Prop({ default: [] as Furniture[] })
  readonly items!: Furniture[];

  @Prop({ default: "" })
  readonly search!: string;

  @Prop({})
  readonly headers!: any[];

  readonly STATUS = Status;

  readonly PAGINATION = { itemsPerPage: -1 };

  selected: Furniture[] = [];

  /**
   * Activates dialog that displays the item information
   */
  @Emit()
  // eslint-disable-next-line class-methods-use-this
  onItemClick(item: Furniture): Furniture {
    return item;
  }

  @Emit()
  onItemSelected(list: Furniture[]): Furniture[] {
    this.selected = list;
    return this.selected;
  }

  /**
   * Simple search filter that only works on columns without custom filter
   * functions defined in headers.
   * TODO: make a better search method
   */
  /* eslint-disable */
  searchFilter(value: any, search: string, item: any): boolean {
    const arr = search.split(" ");
    const valString =
      item.donor.address +
      item.donor.name +
      item.physical.class +
      Timing.formatDate(item.timing.dateAdded) +
      Status[item.status] +
      item.donor.zone;
    let i;
    for (i = 0; i < arr.length; i++) {
      if (
        valString.toString().toLowerCase().indexOf(arr[i].toLowerCase()) === -1
      ) {
        return false;
      }
    }
    return true;
  }
  /* eslint-enable */
}
</script>
