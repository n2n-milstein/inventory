<template>
  <v-layout px-3 mb-3>
    <v-btn
      color="primary"
      round
      :disabled="selected"
      :icon="selected"
      :outline="selected"
      @click="$emit('add')"
    >
      <v-icon>add</v-icon>
      {{ selected ? "" : "Add" }}
    </v-btn>
    <v-btn
      v-for="action in actions"
      icon
      :disabled="!selected"
      :key="action.icon"
      @click="$emit(action.emit)"
    >
      <v-icon>{{ action.icon }}</v-icon>
    </v-btn>
  </v-layout>
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
    { icon: "playlist_add", emit: "list-add" }
  ];
}
</script>

<style lang="scss" scoped></style>
