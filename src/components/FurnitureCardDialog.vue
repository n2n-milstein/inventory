<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="750"
      persistent
      scrollable
      @click:outside="closeDialog()"
      @keydown.escape="closeDialog()"
    >
      <furniture-edit-card
        :current="current"
        :readonly="readonly"
        :is-edit="isEdit"
        :is-add="isAdd"
        :menu-actions="menuActions"
        :menu-loading="menuLoading"
        :loading="updatesLoading"
        @edit="toggleEdit()"
        @close="closeDialog()"
        @save="saveChanges()"
        @export="$emit('export')"
        @archive="$emit('archive')"
        @unarchive="$emit('unarchive')"
      />
    </v-dialog>

    <unsaved-dialog
      :dialog="unsavedDialog"
      @cancel="unsavedDialog = false"
      @discard="closeDialog(true)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ViewAction from "@/data/ViewAction";
import collections from "@/network/collections";
import FurnitureEditCard from "@/components/FurnitureEditCard.vue";
import UnsavedDialog from "@/components/FurnitureCardUnsavedDialog.vue";
import { Furniture } from "@/data/Furniture";

@Component({ components: { FurnitureEditCard, UnsavedDialog } })
export default class FurnitureCardDialog extends Vue {
  @Prop({})
  readonly current!: Furniture;

  @Prop({ default: false })
  readonly dialog!: boolean;

  @Prop({})
  readonly collection!: collections;

  @Prop({ default: false })
  readonly readonly!: boolean;

  @Prop({ default: false })
  readonly isAdd!: boolean;

  @Prop({})
  readonly menuActions!: ViewAction[];

  @Prop({ default: false })
  readonly menuLoading!: boolean;

  updates: Partial<Furniture> = {};

  updatesLoading = false;

  unsavedDialog = false;

  isEdit = false;

  get updatesLength(): number {
    return Object.keys(this.updates).length;
  }

  /**
   * Watch for change in dialog; if it opens, set isEdit to isAdd
   */
  @Watch("dialog")
  onDialogChanged(val: boolean): void {
    if (val) this.isEdit = this.isAdd;
  }

  clearUpdates(): void {
    this.updates = {};
  }

  /**
   * Exits dialog and clears the current item
   */
  closeDialog(forceClose = false): void {
    if (this.updatesLoading) {
      return;
    }
    if (this.updatesLength === 0 || forceClose) {
      this.unsavedDialog = false;
      this.isEdit = false;
      this.$emit("close"); // used to set isAdd to false
    } else {
      this.unsavedDialog = true;
    }
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
   * Commits updates to Firestore
   */
  async saveChanges(): Promise<void> {
    if (this.isAdd) {
      this.$emit("add");
    } else {
      this.updatesLoading = true;
      this.$emit("commit");
      this.isEdit = false;
      this.updatesLoading = false;
    }
  }
}
</script>
