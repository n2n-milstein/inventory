<template>
  <v-row :align="subtitle ? 'center' : 'baseline'">
    <header class="title">
      {{ title }}
      <h3 class="subtitle-2 font-weight-regular" v-if="subtitle">
        {{ subtitle }}
      </h3>
    </header>
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

  @Prop({ default: "" })
  readonly subtitle!: string;

  @Prop({})
  readonly value!: string;

  updateSearch(value: string): void {
    this.$emit("input", value);
  }
}
</script>
