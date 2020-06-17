<template>
  <v-dialog
    v-model="dialog"
    width="750"
    persistent
    scrollable
    @click:outside="closeDialog()"
    @keydown.escape="closeDialog()"
  >
    <edit-card
      :namespace="namespace"
      :is-edit="isEdit"
      :is-add="isAdd"
      @edit="$emit('edit')"
      @close="closeDialog()"
      @save="saveChanges()"
      @export="$emit('export')"
      @archive="$emit('archive')"
    />
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EditCard from "@/components/EditCard.vue";

@Component({ components: { EditCard } })
export default class FurnitureCardDialog extends Vue {
  @Prop({ default: false })
  readonly dialog!: boolean;

  @Prop({ default: false })
  readonly isEdit!: boolean;

  @Prop({ default: false })
  readonly isAdd!: boolean;

  @Prop({})
  readonly namespace!: string;

  /**
   * Emits `close` event
   */
  closeDialog(): void {
    this.$emit("close");
  }

  /**
   * Emits `add` when dialog is used to add new items and `save`,
   * otherwise
   */
  saveChanges(): void {
    if (this.isAdd) {
      this.$emit("add");
    } else {
      this.$emit("save");
    }
  }
}
</script>
