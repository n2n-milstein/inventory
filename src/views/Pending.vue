<template>
  <v-container fluid>
    <v-row justify="start" align="start">
      <v-col class="pb-3" cols="12">
        <h2>Pending Approvals</h2>
      </v-col>
      <v-col cols="12" v-if="pending.length === 0">
        <p>No pending approvals.</p>
      </v-col>
      <v-col lg="8" md="9" cols="12">
        <approval-card
          v-for="request in pending"
          :key="request.id"
          :request="request"
          @approve="pushPending($event, true)"
          @deny="pushPending($event, false)"
          @notes="updateNotes"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Furniture } from "@/data/Furniture";
import ApprovalCard from "@/components/ApprovalCard.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({ components: { ApprovalCard } })
export default class Approval extends Vue {
  show = false;

  pending: Furniture[] = [];

  db = firebase.firestore();

  /**
   * Gets a snapshot of the `pending` collection and sets it to the local
   * variable.
   */
  getPending(): void {
    const pending = this.db.collection("pending");
    pending.onSnapshot((snapshot) => {
      this.pending = [];
      snapshot.forEach((doc) => {
        this.pending.push(doc.data() as Furniture);
      });
    });
  }

  /**
   * Writes changes in the `Staff Notes` section to the document of a specified
   * furniture `furn`.
   * @param furn - a given Furniture object
   */
  updateNotes(furn: Furniture): void {
    const furnRef = this.db.collection("pending").doc(furn.id);
    furnRef.update({ staffNotes: furn.staffNotes });
  }

  /**
   * Moves furniture furn to the `furniture` collection if approved and to
   * the `rejected` collection otherwise.
   * @param furn - a given Furniture object
   * @param approve - true if the given Furniture object is approved, false
   * otherwise
   */
  pushPending(furn: Furniture, approve: boolean): void {
    const col = approve ? "furniture" : "rejected";
    const collection = this.db.collection(col);
    const push = furn;

    if (approve) push.timing.dateAdded = new Date();

    collection.doc(push.id).set(push);

    this.db.collection("pending").doc(furn.id).delete();
  }

  /**
   * Calls functions when the page is loaded.
   */
  mounted(): void {
    this.getPending();
  }
}
</script>
