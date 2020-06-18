<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-list-item><v-lits-item-title>Volunteers</v-lits-item-title></v-list-item>
    <v-list-item><v-lits-item-title>Pick Ups</v-lits-item-title></v-list-item>
    <v-list-item><v-lits-item-title>Drop Offs</v-lits-item-title></v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EditCard from "@/components/EditCard.vue";

@Component({ components: { EditCard } })
export default class RunCard extends Vue {
  @Prop({})
  readonly title!: string;

  @Prop({})
  readonly volunteers!: any;

  @Prop({})
  readonly pickUps!: any;

  @Prop({})
  readonly dropOffs!: any;
}
</script>
