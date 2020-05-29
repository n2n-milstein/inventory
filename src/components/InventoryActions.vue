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

    <v-tooltip bottom v-for="action in actions" :key="action.emit">
      <template v-slot:activator="{ on }">
        <span v-on="on">
          <v-btn
            class="ml-3"
            :disabled="!selected"
            icon
            @click="$emit(action.emit)"
            :loading="action.emit === 'download' && downloading"
          >
            <v-icon>{{ action.icon }}</v-icon>
          </v-btn>
        </span>
      </template>
      <span>{{ action.desc }}</span>
    </v-tooltip>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class InventoryActions extends Vue {
  @Prop({ default: false })
  readonly selected!: boolean;

  @Prop({ default: false })
  readonly downloading!: boolean;

  // TODO: abstract this
  readonly actions = [
    { icon: "archive", desc: "Archive selected items", emit: "archive" },
    {
      icon: "cloud_download",
      desc: "Export selected items to spreadsheet",
      emit: "download",
    },
    {
      icon: "playlist_add",
      desc: "Add selected items to run",
      emit: "list-add",
    },
  ];
}
</script>

<style lang="scss" scoped></style>
