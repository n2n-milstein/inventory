<template>
  <v-container>
    <v-row>
      <v-col>
        <admin-dialog collection="furniture" />
        <admin-dialog collection="rejected" />
        <admin-dialog collection="pending" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-dialog v-model="dialog" width="750" scrollable>
          <template v-slot:activator="{ on: edit }">
            <v-btn v-on="{ ...edit }">
              Show Edit Dialog
            </v-btn>
          </template>
          <edit-card />
        </v-dialog>
        <v-switch v-model="showEditCard" label="Show Edit Card" />
        <edit-card v-if="showEditCard" />
      </v-col>
    </v-row>

    <v-switch v-model="showStoreCmp" label="Show Store Comparison" />

    <v-row v-if="showStoreCmp">
      <v-col>
        <v-btn @click="updateSample()">
          Update sample
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="showStoreCmp">
      <v-col cols="6">
        <pre>{{ sample }}</pre>
      </v-col>
      <v-col cols="6">
        <pre>{{ compare }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as firebase from "firebase/app";
import "firebase/firestore";
import AdminDialog from "@/components/AdminDialog.vue";
import EditCard from "@/components/EditCard.vue";
import { Furniture } from "@/data/Furniture";

@Component({ components: { AdminDialog, EditCard } })
export default class Admin extends Vue {
  dialog = false;

  showEditCard = false;

  showStoreCmp = true;

  get inventory(): Furniture[] {
    return this.$store.getters.getInventory;
  }

  get sample(): Furniture {
    return this.inventory[2];
  }

  get compare(): Furniture {
    return this.$store.getters.getItem(this.sample.id);
  }

  mounted(): void {
    this.fetchInventory();
  }

  updateSample(): void {
    const modify: Furniture = { ...this.sample };
    modify.attributes.bedbugFree = !modify.attributes.bedbugFree;
    console.log("dispatching");
    this.$store.dispatch({ type: "updateItem", newItem: modify });
  }

  fetchInventory(): void {
    const furniture = firebase.firestore().collection("furniture");
    furniture.onSnapshot((snapshot) => {
      this.$store.commit("clearInventory");
      snapshot.forEach((doc) => {
        this.$store.dispatch({
          type: "pushInventory",
          item: doc.data() as Furniture,
        });
      });
    });
  }
}
</script>

<style lang="scss">
pre {
  white-space: pre-wrap;
  word-break: keep-all;
}
</style>
