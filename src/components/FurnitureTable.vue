<template>
  <div>
    <v-dialog
      v-model="editCard"
      width="750"
      persistent
      @click:outside="closeDialog()"
      @keydown.escape="closeDialog()"
      scrollable
    >
      <edit-card
        :is-edit="isEdit"
        @edit="toggleEdit()"
        @close="closeDialog()"
        @save="saveUpdates()"
      />
    </v-dialog>

    <v-dialog v-model="unsavedDialog" width="450">
      <v-card>
        <v-card-title>You have unsaved changes</v-card-title>
        <v-card-text>
          Are you sure you want to discard your unsaved changes?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="unsavedDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="closeDialog(true)">Discard</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :value="selected"
      @input="setSelected({ list: $event })"
      :search="search"
      :headers="HEADERS"
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
import { mapActions, mapGetters } from "vuex";
import { Component, Prop } from "vue-property-decorator";
import { Status, Furniture } from "@/data/Furniture";
import collections from "@/network/collections";
import EditCard from "@/components/EditCard.vue";

const namespace = "inventory";

@Component({
  components: { EditCard },
  computed: mapGetters(namespace, {
    current: "getCurrent",
    updatesLength: "getUpdatesLength",
    selected: "getSelected",
  }),
  methods: mapActions(namespace, [
    "setCurrent",
    "clearCurrent",
    "clearUpdates",
    "commitUpdates",
    "setSelected",
  ]),
})
export default class Inventory extends Vue {
  @Prop({ default: null })
  collection!: collections;

  @Prop({ default: [] as Furniture[] })
  items!: Furniture[];

  @Prop({ default: false })
  downloading!: boolean;

  @Prop({ default: "" })
  search!: string;

  current!: Furniture;

  updatesLength!: number;

  setCurrent!: ({ item }: { item: Furniture }) => void;

  clearCurrent!: () => void;

  clearUpdates!: () => void;

  commitUpdates!: ({ collection }: { collection: collections }) => void;

  selected!: Furniture[];

  isEdit = false;

  editCard = false;

  unsavedDialog = false;

  readonly STATUS = Status;

  readonly PAGINATION = { itemsPerPage: -1 };

  readonly HEADERS = [
    { text: "Class", value: "physical.class" },
    { text: "Date Added", value: "timing.dateAdded" },
    { text: "Address", value: "donor.address" },
    { text: "Status", value: "status" },
  ];

  getSpreadsheet(): void {
    this.$emit("download");
  }

  /**
   * Toggles edit state `isEdit` and clears update if setting `isEdit`
   * to false
   */
  toggleEdit(): void {
    if (this.isEdit) {
      this.clearUpdates();
    }
    this.isEdit = !this.isEdit;
  }

  /**
   * Exits dialog and clears the current item
   */
  closeDialog(forceClose = false): void {
    if (this.updatesLength === 0 || forceClose) {
      this.unsavedDialog = false;
      this.editCard = false;
      this.isEdit = false;
    } else {
      this.unsavedDialog = true;
    }
  }

  /**
   * Commits updates to Firestore
   */
  saveUpdates(): void {
    this.commitUpdates({ collection: this.collection });
    this.isEdit = false;
  }

  /**
   * Activates dialog that displays the item information
   */
  onItemClick(item: Furniture): void {
    // TODO: is this clearCurrent necessary?
    this.clearCurrent();
    this.setCurrent({ item });
    this.editCard = true;
  }
}
</script>