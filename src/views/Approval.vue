<template>
  <v-flex xs6>
    <v-card
      light
      color="white"
      class="mb-4"
      v-for="(request, i) in pending"
      :key="i"
    >
      <v-card-title secondary-title>
        <h4 class="mb-0">{{ request.datetime }}</h4>
      </v-card-title>

      <v-card-title class="pt-0 pb-0">
        <h3 class="mb-0">Name: {{ request.name }}</h3>
      </v-card-title>

      <v-card-title class="mt-0">
        <h3 class="mb-0">Address: {{ request.address }}</h3>
      </v-card-title>

      <v-card-text>Notes:</v-card-text>
      <v-card-text>{{ request.notes }}</v-card-text>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Approval extends Vue {
  pending = [
    {
      datetime: "2019-06-22 18:50",
      name: "Alice",
      address: "17 E Green St Ithaca, NY",
      notes: "need to pick up soon"
    },
    {
      datetime: "2019-06-22 18:50",
      name: "Bob",
      address: "179 E Green St Ithaca, NY",
      notes: "need to pick up soon"
    }
  ];
}
</script>
