<template>
  <v-container fluid>
    <v-layout justify-start align-start>
      <v-flex lg8 md9 xs12>
        <approval-card
          v-for="(request, i) in pending"
          :request="request"
          :key="i"
        ></approval-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { FClass, Material, Status, Furniture } from "@/data/Furniture";
import ApprovalCard from "@/components/ApprovalCard.vue";

@Component({
  components: {
    ApprovalCard
  }
})
export default class Approval extends Vue {
  show: boolean = false;
  pending: Furniture[] = [];
}
</script>
