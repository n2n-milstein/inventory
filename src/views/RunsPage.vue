<template>
  <v-col cols="12">
    <furniture-table-header v-model="search" title="Runs" />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
// components
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";

@Component({ components: { FurnitureTableHeader } })
export default class Inventory extends Vue {}
</script>
