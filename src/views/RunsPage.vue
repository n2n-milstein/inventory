<template>
  <v-col cols="12">
    <furniture-table-header v-model="search" title="Runs" />
    <run-card title="Date" volunteers="" pick-ups="" drop-offs="" />
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
import RunCard from "@/components/RunCard.vue";

@Component({ components: { FurnitureTableHeader, RunCard } })
export default class RunsPage extends Vue {}
</script>
