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
        :actions="inventoryActions"
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
      :is-add="isAdd"
      :menu-actions="menuActions"
      :menu-loading="menuLoading"
      @add="commitAddItem()"
      @archive="commitArchive()"
      @export="commitExport()"
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
// store
import { action } from "@/store/collection/types";

const NAMESPACE = "inventory";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
    FurnitureCardDialog,
  },
  computed: mapGetters(NAMESPACE, {
    inventory: "getItems",
    current: "getCurrent",
    selected: "getSelected",
  }),
  methods: mapActions(NAMESPACE, [
    action.BIND_ITEMS,
    action.SET_CURRENT,
    action.CLEAR_CURRENT,
    action.EXPORT_SELECTED,
    action.EXPORT_CURRENT,
    "archiveSelected",
    "archiveCurrent",
    "commitItem",
  ]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.INVENTORY;

  /** Vuex map helper properties */
  readonly current!: Furniture;

  readonly [action.BIND_ITEMS]!: () => Promise<void>;

  readonly [action.SET_CURRENT]!: ({ item }: { item: Furniture }) => void;

  readonly [action.EXPORT_SELECTED]!: () => Promise<void>;

  readonly [action.CLEAR_CURRENT]!: () => void;

  readonly [action.EXPORT_CURRENT]!: () => Promise<void>;

  readonly commitItem!: () => Promise<void>;

  readonly archiveCurrent!: () => Promise<void>;

  /** Furniture card dialog */
  isAdd = false;

  get editCard(): boolean {
    return !!this.current;
  }

  /** Actions and search */
  search = "";

  downloading = false;

  get inventoryActions(): ViewAction[] {
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

  menuLoading = false;

  readonly menuActions: ViewAction[] = [
    { icon: "archive", desc: "Archive", emit: "archive" },
    {
      icon: "cloud_download",
      desc: "Export",
      emit: "export",
    },
  ];

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
   * Shows dialog to add item
   */
  addItem(): void {
    this.setCurrent({ item: new Furniture() });
    this.isAdd = true;
  }

  /**
   * Commits new item to Firestore
   */
  async commitAddItem(): Promise<void> {
    await this.commitItem();
    this.isAdd = false;
    this.clearCurrent();
  }

  async commitArchive(): Promise<void> {
    this.menuLoading = true;
    await this.archiveCurrent();
    this.menuLoading = false;
    this.clearCurrent();
  }

  async commitExport(): Promise<void> {
    this.menuLoading = true;
    await this.exportCurrent();
    this.menuLoading = false;
  }
}
</script>
