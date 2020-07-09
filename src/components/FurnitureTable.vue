<template>
  <div>
    <v-data-table
      :value="selected"
      @input="setSelected({ list: $event })"
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
        {{ item.timing.dateAdded.toDate().toLocaleDateString() }}
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
import { mapActions, mapState } from "vuex";
import { Component, Prop } from "vue-property-decorator";
import { Status, Furniture } from "@/data/Furniture";
import collections from "@/network/collections";
import Timing from "@/data/furniture/Timing";

@Component({
  components: {},
  computed: mapState({
    current(state, getters) {
      return getters[`${this.namespace}/getCurrent`];
    },
    selected(state, getters) {
      return getters[`${this.namespace}/getSelected`];
    },
  }),
  methods: mapActions({
    setCurrent(dispatch, payload) {
      return dispatch(`${this.namespace}/setCurrent`, payload);
    },
    clearUpdates(dispatch) {
      return dispatch(`${this.namespace}/clearUpdates`);
    },
    commitUpdates(dispatch, payload) {
      return dispatch(`${this.namespace}/commitUpdates`, payload);
    },
    setSelected(dispatch, payload) {
      return dispatch(`${this.namespace}/setSelected`, payload);
    },
  }),
})
export default class Inventory extends Vue {
  @Prop({ default: "inventory" })
  readonly namespace!: string;

  @Prop({ default: null })
  readonly collection!: collections;

  @Prop({ default: [] as Furniture[] })
  readonly items!: Furniture[];

  @Prop({ default: "" })
  readonly search!: string;

  @Prop({})
  readonly headers!: any[];

  setCurrent!: ({ item }: { item: Furniture }) => void;

  clearUpdates!: () => void;

  selected!: Furniture[];

  readonly STATUS = Status;

  readonly PAGINATION = { itemsPerPage: -1 };

  /**
   * Activates dialog that displays the item information
   */
  onItemClick(item: Furniture): void {
    this.setCurrent({ item });
    this.$emit("item-click");
  }

  /**
   * Simple search filter that only works on columns without custom filter
   * functions defined in headers.
   * TODO: make a better search method
   */
  /* eslint-disable */
  searchFilter(value: any, search: string, item: any): boolean {
    const arr = search.split(" ");
    const valString = item.donor.address + item.donor.name + item.physical.class + Timing.formatDate(item.timing.dateAdded) + Status[item.status];
    let i;
    for (i = 0; i < arr.length; i++) {
      console.log(arr[i].toLowerCase());
      console.log(valString.toString().toLowerCase());
      if (valString.toString().toLowerCase().indexOf(arr[i].toLowerCase()) === -1) {
        return false;
      }
    }
    return true;
  }
  /* eslint-enable */
}
</script>
