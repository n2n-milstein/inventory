<template>
  <v-col cols="12">
    <furniture-table-header v-model="search" title="Archive" />

    <v-row class="px-4 mb-4">
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="actions"
        :disabled="selected.length < 1"
        @download="getSpreadsheet"
        @unarchive="unarchiveSelected()"
        @delete="deleteSelected()"
      />
    </v-row>

    <furniture-table
      namespace="archive"
      :search="search"
      :items="archive"
      :downloading="downloading"
      :collection="COLLECTION"
    />

    <furniture-card-dialog
      namespace="archive"
      :dialog="editCard"
      @add="commitAddItem()"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Component from "vue-class-component";
// data
import { Furniture } from "@/data/Furniture";
import ViewAction from "@/data/ViewAction";
import collections from "@/network/collections";
import { action } from "@/store/collection/types";
// components
import FurnitureTable from "@/components/FurnitureTable.vue";
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";

const NAMESPACE = "archive";

@Component({
  components: {
    FurnitureTable,
    FurnitureTableHeader,
    ViewActionGroup,
    FurnitureCardDialog,
  },
  computed: mapGetters(NAMESPACE, {
    archive: "getItems",
    current: "getCurrent",
    selected: "getSelected",
  }),
  methods: mapActions(NAMESPACE, [
    action.BIND_ITEMS,
    action.EXPORT_SELECTED,
    action.COMMIT_UPDATES,
    "unarchiveSelected",
    "deleteSelected",
  ]),
})
export default class Inventory extends Vue {
  readonly COLLECTION = collections.ARCHIVE;

  readonly current!: Furniture;

  readonly [action.BIND_ITEMS]!: () => Promise<void>;

  readonly [action.EXPORT_SELECTED]!: () => Promise<void>;

  get actions(): ViewAction[] {
    return [
      {
        icon: "unarchive",
        desc: "Unarchive selected items",
        emit: "unarchive",
      },
      {
        icon: "cloud_download",
        desc: "Export selected items to spreadsheet",
        emit: "download",
        loading: (): boolean => this.downloading,
      },
      {
        icon: "delete",
        desc: "Delete selected items",
        emit: "delete",
      },
    ];
  }

  /** Furniture card dialog */
  isEdit = false;

  get editCard(): boolean {
    return !!this.current;
  }

  downloading = false;

  search = "";

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
}
</script>
