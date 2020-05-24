<template>
  <v-row>
    <v-btn
      :disabled="selected"
      :icon="selected"
      :outlined="selected"
      color="primary"
      rounded
      @click="$emit('add')"
    >
      <v-icon>add</v-icon>
      {{ selected ? "" : "Add" }}
    </v-btn>
    <!-- TODO: add tooltips -->
    <v-btn
      v-for="action in actions"
      class="ml-3"
      :key="action.icon"
      :disabled="!selected"
      icon
      @click="$emit(action.emit)"
    >
      <v-icon>{{ action.icon }}</v-icon>
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class InventoryActions extends Vue {
  @Prop({ default: false })
  selected!: boolean;

  readonly actions = [
    { icon: "archive", desc: "Archive", emit: "archive" },
    { icon: "cloud_download", desc: "Export to spreadsheet", emit: "download" },
    { icon: "playlist_add", desc: "Add to run", emit: "list-add" },
  ];
}
</script>

<style lang="scss" scoped></style>
