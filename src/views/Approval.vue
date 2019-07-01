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
import { FClass, Material, Status, Furniture } from "@/data/Furniture";

@Component
export default class Approval extends Vue {
  pending: Furniture[] = [
    {
      donor: {
        name: "hi",
        phone: "123",
        email: "123",
        address: "124",
        zone: "cornell"
      },
      physical: {
        class: FClass.Chair,
        size: 5,
        material: Material.Wood,
        set: false,
        hasFrame: false,
        hasBoxSpring: false,
        numChairs: 0,
        heavy: false
      },
      timing: {
        urgent: false,
        pickupBy: new Date(2019, 7, 21),
        dateOffered: new Date(2019, 7, 1)
      },
      attributes: {
        originalOwner: true,
        smokeFree: true,
        petFree: true,
        donateToFriend: true,
        age: 2
      },
      status: Status.OnTruck,
      images: [{ url: "no" }],
      comments: "hi"
    }
  ];
}
</script>
