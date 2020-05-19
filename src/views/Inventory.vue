<template>
  <v-col cols="12" class="inventory">
    <v-dialog
      v-model="dialog"
      width="750"
      @click:outside="closeDialog()"
      scrollable
    >
      <edit-card @close="closeDialog()" @save="saveUpdates()" />
    </v-dialog>
    <v-row class="mb-3 px-4" align="baseline">
      <view-title title="Inventory" />
      <v-spacer />
      <v-col cols="6">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search inventory"
          single-line
          hide-details
        />
      </v-col>
    </v-row>
    <inventory-actions class="px-4 mb-4" :selected="selected.length > 0" />
    <v-data-table
      v-model="selected"
      :search="search"
      :headers="headers"
      :items="inventory"
      :options.sync="pagination"
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
        {{ status[item.status] }}
      </template>
    </v-data-table>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Component from "vue-class-component";
import ViewTitle from "@/components/ViewTitle.vue";
import InventoryActions from "@/components/InventoryActions.vue";
import EditCard from "@/components/EditCard.vue";
import { Status, Furniture } from "@/data/Furniture";

const namespace = "inventory";

@Component({
  components: {
    ViewTitle,
    InventoryActions,
    EditCard,
  },
  computed: mapGetters(namespace, {
    inventory: "getInventory",
    current: "getCurrent",
  }),
  methods: mapActions(namespace, [
    "bindInventory",
    "setCurrent",
    "clearCurrent",
    "commitUpdates",
  ]),
})
export default class Inventory extends Vue {
  current!: Furniture;

  bindInventory!: () => Promise<void>;

  setCurrent!: ({ item }: { item: Furniture }) => void;

  clearCurrent!: () => void;

  commitUpdates!: () => void;

  // TODO: replace with store
  selected = [];

  dialog = false;

  search = "";

  readonly status = Status;

  readonly pagination = { itemsPerPage: -1 };

  readonly headers = [
    { text: "Class", value: "physical.class" },
    { text: "Date Added", value: "timing.dateAdded" },
    { text: "Address", value: "donor.address" },
    { text: "Status", value: "status" },
  ];

  /**
   * Called when component is mounted (lifecycle hook); binds inventory in
   * store to Firebase.
   */
  mounted(): void {
    this.bindInventory();
  }

  /**
   * Exits dialog and clears the current item
   */
  closeDialog(): void {
    this.dialog = false;
    // this.clearCurrent();
  }

  saveUpdates(): void {
    this.commitUpdates();
    this.closeDialog();
  }

  /**
   * Activates dialog that displays the item information
   */
  onItemClick(item: Furniture): void {
    this.setCurrent({ item });
    console.log("current: ", this.current);
    this.dialog = true;
  }
}
</script>
