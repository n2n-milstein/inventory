<template>
  <v-layout>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Add to Firestore - furniture</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline" primary-title>
          Add Confirmation - furniture
        </v-card-title>

        <v-card-text>
          Please confirm that this is something you would like to do. If you
          don't know what this is, please exit.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="addTo('furniture')"
            >CONFIRM AND ADD</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Add to Firestore - rejected</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline" primary-title>
          Add Confirmation - rejection
        </v-card-title>

        <v-card-text>
          Please confirm that this is something you would like to do. If you
          don't know what this is, please exit.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="addTo('rejected')"
            >CONFIRM AND ADD</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Status, FClass, Material, Furniture } from "@/data/Furniture";
import { Approvals } from "@/data/Sample";

@Component({})
export default class Admin extends Vue {
  dialog = false;
  sampleData: Furniture[] = Approvals;

  addTo(col: string) {
    this.dialog = false;
    console.log("writing to " + col);
    const collection = firebase.firestore().collection(col);
    for (let data of this.sampleData) {
      let dataRef = collection.doc();
      data.id = dataRef.id;
      data.timing.dateAdded = new Date();
      dataRef.set(data);
    }
  }
}
</script>
