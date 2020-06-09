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
      @edit="$emit('edit')"
      @close="closeDialog()"
      @save="$emit('save')"
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

  @Prop({})
  readonly namespace!: string;

  closeDialog(): void {
    this.$emit("close");
  }
}
</script>
