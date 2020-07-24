<template>
  <v-col cols="12">
    <h2>Testing</h2>
    <v-btn @click="testUpdate()">Attempt update</v-btn>
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
import { updateItem } from "../network/inventory-service";
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

  testUpdate(): void {
    updateItem(this.run.pickups["3QzT3qNRNN6u0tMuIcEu"].id, {
      donor: {
        name: "Transaction Jones",
        phone: "123-123-1231",
        email: "jones@test.com",
        address: "123 Transaction St",
        zone: "Cornell",
      },
      comments: "this is a transaction updated comment",
      staffNotes: "this is a transaction updated staff note",
    });
  }

  pushSample(): void {
    console.log(this.id);
    addItem(SampleRun);
  }
}
</script>
