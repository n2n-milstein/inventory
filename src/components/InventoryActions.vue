<template>
  <v-layout px-3 mb-3>
    <v-btn color="primary">
      <v-icon>add</v-icon>
      Add
    </v-btn>
    <v-btn icon>
      <v-icon>archive</v-icon>
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class InventoryActions extends Vue {}
</script>

<style lang="scss" scoped></style>
