<template>
  <v-row class="px-3 mb-3">
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
    <v-btn
      v-for="action in actions"
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

  actions = [
    { icon: "archive", emit: "archive" },
    { icon: "cloud_download", emit: "download" },
    { icon: "playlist_add", emit: "list-add" },
  ];
}
</script>

<style lang="scss" scoped></style>
