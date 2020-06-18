<template>
  <v-col cols="12">
    <furniture-table-header v-model="search" title="Inventory" />

    <v-row class="px-4 mb-4">
      <v-btn
        :disabled="selected.length > 0"
        :icon="selected.length > 0"
        :outlined="selected.length > 0"
        color="primary"
        rounded
        @click="addItem()"
      >
        <v-icon>add</v-icon>
        {{ selected.length > 0 ? "" : "Add" }}
      </v-btn>
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="actions"
        :disabled="selected.length < 1"
        @download="getSpreadsheet"
        @archive="archiveSelected()"
      />
    </v-row>

    <furniture-table
      namespace="inventory"
      :search="search"
      :items="inventory"
      :collection="COLLECTION"
      @download="getSpreadsheet()"
    />

    <furniture-card-dialog
      namespace="inventory"
      :dialog="editCard"
      :is-edit="isEdit"
      :is-add="isAdd"
      @edit="toggleEdit()"
      @close="closeDialog()"
      @save="saveUpdates()"
      @add="commitAddItem()"
    />

    <unsaved-dialog
      :dialog="unsavedDialog"
      @cancel="unsavedDialog = false"
      @discard="closeDialog(true)"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Component from "vue-class-component";
// network, data
import collections from "@/network/collections";
import { Furniture } from "@/data/Furniture";
import ViewAction from "@/data/ViewAction";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";
import UnsavedDialog from "@/components/FurnitureCardUnsavedDialog.vue";
// store
import { action } from "@/store/collection/types";

const NAMESPACE = "inventory";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
    FurnitureCardDialog,
    UnsavedDialog,
  },
  computed: mapGetters(NAMESPACE, {
    inventory: "getItems",
    current: "getCurrent",
    selected: "getSelected",
    updatesLength: "getUpdatesLength",
  }),
  methods: mapActions(NAMESPACE, [
    action.BIND_ITEMS,
    action.SET_CURRENT,
    action.CLEAR_UPDATES,
    action.CLEAR_CURRENT,
    action.COMMIT_UPDATES,
    action.EXPORT_SELECTED,
    "archiveSelected",
    "commitItem",
  ]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.INVENTORY;

  /** Vuex map helper properties */
  readonly current!: Furniture;

  readonly selected!: Furniture[];

  readonly [action.BIND_ITEMS]!: () => Promise<void>;

  readonly [action.SET_CURRENT]!: ({ item }: { item: Furniture }) => void;

  readonly [action.EXPORT_SELECTED]!: () => Promise<void>;

  /* eslint-disable object-curly-newline */
  readonly [action.COMMIT_UPDATES]!: ({
    collection,
  }: {
    collection: collections;
  }) => void;
  /* eslint-enable object-curly-newline */

  readonly [action.CLEAR_CURRENT]!: () => void;

  readonly [action.CLEAR_UPDATES]!: () => void;

  readonly updatesLength!: number;

  readonly commitItem!: () => Promise<void>;

  /** Furniture card dialog */
  isEdit = false;

  isAdd = false;

  get editCard(): boolean {
    return !!this.current;
  }

  unsavedDialog = false;

  /** Actions and search */
  search = "";

  downloading = false;

  get actions(): ViewAction[] {
    return [
      { icon: "archive", desc: "Archive selected items", emit: "archive" },
      {
        icon: "cloud_download",
        desc: "Export selected items to spreadsheet",
        emit: "download",
        loading: (): boolean => this.downloading,
      },
      {
        icon: "playlist_add",
        desc: "Add selected items to run",
        emit: "list-add",
      },
    ];
  }

  /**
   * Called when component is mounted (lifecycle hook); binds inventory in
   * store to Firebase.
   */
  mounted(): void {
    this.bindItems();
  }

  async getSpreadsheet(): Promise<void> {
    this.downloading = true;
    await this.exportSelected();
    this.downloading = false;
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
      this.isEdit = false;
      this.isAdd = false;
      this.clearCurrent();
    } else {
      this.unsavedDialog = true;
    }
  }

  /**
   * Commits updates to Firestore
   */
  saveUpdates(): void {
    this.commitUpdates({ collection: collections.INVENTORY });
    this.isEdit = false;
  }

  /**
   * Shows dialog to add item
   */
  addItem(): void {
    this.setCurrent({ item: new Furniture() });
    this.isEdit = true;
    this.isAdd = true;
  }

  /**
   * Commits new item to Firestore
   */
  async commitAddItem(): Promise<void> {
    await this.commitItem();
    this.closeDialog();
  }
}
</script>
