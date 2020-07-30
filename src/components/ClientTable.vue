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
      <template v-slot:item.dateAdded="{ item }">
        {{ item.dateAdded.toDate().toLocaleDateString() }}
      </template>
      <template v-slot:item.clientArea="{ item }">
        {{ AREA[item.clientArea] }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { Component, Prop } from "vue-property-decorator";
import Client from "@/data/Client";
import collections from "@/network/collections";
import { Area } from "@/data/Area";

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
export default class TableItems extends Vue {
  @Prop({ default: "clients" })
  readonly namespace!: string;

  @Prop({ default: null })
  readonly collection!: collections;

  @Prop({ default: [] as Client[] })
  readonly items!: Client[];

  @Prop({ default: "" })
  readonly search!: string;

  @Prop({})
  readonly headers!: any[];

  setCurrent!: ({ item }: { item: Client }) => void;

  clearUpdates!: () => void;

  selected!: Client[];

  readonly AREA = Area;

  readonly PAGINATION = { itemsPerPage: -1 };

  /**
   * Activates dialog that displays the item information
   */
  onItemClick(item: Client): void {
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
    const valString = "";
    let i;
    for (i = 0; i < arr.length; i++) {
      if (valString.toString().toLowerCase().indexOf(arr[i].toLowerCase()) === -1) {
        return false;
      }
    }
    return true;
  }
  /* eslint-enable */
}
</script>
