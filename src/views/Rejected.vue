<template>
  <v-container fluid>
    <v-layout row wrap justify-start align-start>
      <v-flex pb-3 xs12><view-title title="Rejections"/></v-flex>
      <p v-if="rejected.length === 0">No rejections.</p>
      <v-flex lg8 md9 xs12>
        <approval-card
          v-for="request in rejected"
          :key="request.id"
          :request="request"
          :is-pending="false"
          @approve="pushPending"
        ></approval-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Furniture } from "@/data/Furniture";
import ApprovalCard from "@/components/ApprovalCard.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({
  components: {
    ApprovalCard,
    ViewTitle,
  },
})
export default class Approval extends Vue {
  show: boolean = false;

  rejected: Furniture[] = [];

  db = firebase.firestore();

  /**
   * Gets a snapshot of the "rejected" collection and sets it to the local
   * variable.
   */
  getRejected() {
    const rejected = this.db.collection("rejected");
    rejected.onSnapshot((snapshot) => {
      this.rejected = [];
      snapshot.forEach((doc) => {
        this.rejected.push(doc.data() as Furniture);
      });
    });
  }

  /**
   * Moves the furniture "furn" to the "pending" collection.
   */
  pushPending(furn: Furniture) {
    const collection = this.db.collection("pending");
    collection.doc(furn.id).set(furn);

    this.db
      .collection("rejected")
      .doc(furn.id)
      .delete();
  }

  /**
   * Calls functions when the page is loaded.
   */
  mounted() {
    this.getRejected();
  }
}
</script>
