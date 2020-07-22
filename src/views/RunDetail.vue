<template>
  <v-col cols="12">
    <h2>Run ID: {{ id }}</h2>
    <pre>{{ run }}</pre>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import Run from "../data/Run";
import { getItem } from "../network/run-service";

@Component({ components: {} })
export default class RunDetail extends Vue {
  @Prop({ default: "default" })
  readonly id!: string;

  run: Run = {} as Run;

  mounted(): void {
    console.log(this.id);
    getItem(this.id).then((it) => {
      console.log("item", it);
      this.run = it;
    });
  }
}
</script>
