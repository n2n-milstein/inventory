<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn class="my-1 mr-3" v-on="on">
        Add to Firestore - {{ collection }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline" primary-title>
        Add Confirmation - {{ collection }}
      </v-card-title>

      <v-card-text>
        Please confirm that this is something you would like to do. If you don't
        know what this is, please exit.
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="addTo(collection)">
          CONFIRM AND ADD
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { Furniture } from "@/data/Furniture";
import { Approvals } from "@/data/Sample";

@Component
export default class AdminDialog extends Vue {
  dialog = false;

  sampleData: Furniture[] = Approvals;

  @Prop()
  collection!: string;

  addTo(col: string): void {
    this.dialog = false;
    const collection = firebase.firestore().collection(col);
    this.sampleData.forEach((data) => {
      const update = data;
      const dataRef = collection.doc();
      update.id = dataRef.id;
      update.timing.dateAdded = new Date();
      dataRef.set(data);
    });
  }
}
</script>
