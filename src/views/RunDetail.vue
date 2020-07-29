<template>
  <v-col cols="12">
    <h2>Testing</h2>
    <v-btn @click="pushSample()">Push sample data</v-btn>
    <h2>Run ID: {{ id }}</h2>
    <pre>{{ run }}</pre>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import Run from "../data/Run";
import { getItem, addItem } from "../network/run-service";
import { SampleRun } from "../data/Sample";

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

  pushSample(): void {
    console.log(this.id);
    addItem(SampleRun);
  }
}
</script>
