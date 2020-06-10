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

  closeDialog(): void {
    this.$emit("close");
  }

  saveChanges(): void {
    if (this.isAdd) {
      this.$emit("add");
      console.log("saveChanges", "add");
    } else {
      this.$emit("save");
    }
  }
}
</script>
