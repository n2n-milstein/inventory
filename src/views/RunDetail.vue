<template>
  <v-col cols="12">
    <h2>Run ID: {{ id }}</h2>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({ components: {} })
export default class RunDetail extends Vue {
  @Prop({ default: "default" })
  readonly id!: string;
}
</script>
