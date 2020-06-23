<template>
  <v-row class="mb-3 px-4" align="baseline">
    <h2 class="title">
      {{ title }}
    </h2>
    <v-spacer />
    <v-col cols="6">
      <v-text-field
        :value="value"
        @input="updateSearch($event)"
        append-icon="search"
        label="Search"
        single-line
        clearable
        hide-details
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class FurnitureTableHeader extends Vue {
  @Prop({ default: "Default title" })
  readonly title!: string;

  @Prop({})
  readonly value!: string;

  updateSearch(value: string): void {
    this.$emit("input", value);
  }
}
</script>
