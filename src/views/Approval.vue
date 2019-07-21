<template>
  <v-container fluid>
    <v-layout row wrap justify-start align-start>
      <v-flex pb-3 xs12><view-title title="Pending Approvals"/></v-flex>
      <p v-if="pending.length === 0">No pending approvals.</p>
      <v-flex lg8 md9 xs12>
        <approval-card
          v-for="request in pending"
          :request="request"
          :key="request.id"
          @approve="pushPending($event, true)"
          @deny="pushPending($event, false)"
          @notes="updateNotes"
        ></approval-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { FClass, Material, Status, Furniture } from "@/data/Furniture";
import ApprovalCard from "@/components/ApprovalCard.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({
  components: {
    ApprovalCard,
    ViewTitle
  }
})
export default class Approval extends Vue {
  show: boolean = false;
  pending: Furniture[] = [];
  db = firebase.firestore();

  getPending() {
    const pending = this.db.collection("pending");
    pending.onSnapshot(snapshot => {
      this.pending = [];
      snapshot.forEach(doc => {
        this.pending.push(doc.data() as Furniture);
      });
    });
  }

  updateNotes(furn: Furniture) {
    const furnRef = this.db.collection("pending").doc(furn.id);
    furnRef.update({ staffNotes: furn.staffNotes });
  }

  pushPending(furn: Furniture, approve: boolean) {
    const col = approve ? "furniture" : "rejected";
    const collection = this.db.collection(col);

    if (approve) furn.timing.dateAdded = new Date();

    collection.doc(furn.id).set(furn);

    this.db
      .collection("pending")
      .doc(furn.id)
      .delete();
  }

  mounted() {
    this.getPending();
  }
}
</script>
