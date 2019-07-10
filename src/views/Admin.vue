<template>
  <v-layout>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Add to Firestore</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline" primary-title>
          Add Confirmation
        </v-card-title>

        <v-card-text>
          Please confirm that this is something you would like to do. If you
          don't know what this is, please exit.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="addFurn()">CONFIRM AND ADD</v-btn>
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
import { Status, FClass, Material, Furniture } from "../data/Furniture";

@Component({})
export default class Admin extends Vue {
  dialog = false;
  sampleData: Furniture[] = [
    {
      donor: {
        name: "John Smith",
        phone: "(123) 124-2145",
        email: "js14@gmail.com",
        address: "124 Cornell St Ithaca, NY 14853",
        zone: "Cornell"
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
        pickupBy: new Date(2019, 6, 21),
        dateOffered: new Date(2019, 6, 1)
      },
      attributes: {
        originalOwner: true,
        smokeFree: true,
        petFree: false,
        donateToFriend: true,
        age: 2
      },
      status: Status.OnTruck,
      images: [{ url: "no" }],
      comments: "hi"
    }
  ];

  addFurn() {
    this.dialog = false;
    var collection = firebase.firestore().collection("Furniture");
    for (let data of this.sampleData) {
      collection.add(data);
      collection.add(data);
      collection.add(data);
    }
  }
}
</script>
