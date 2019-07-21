<template>
  <v-container fluid>
    <v-layout row wrap justify-start align-start>
      <v-flex pb-3 xs12><view-title title="Rejections"/></v-flex>
      <p v-if="rejected.length === 0">No rejections.</p>
      <v-flex lg8 md9 xs12>
        <approval-card
          v-for="request in rejected"
          :request="request"
          :key="request.id"
          :is-pending="false"
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
  rejected: Furniture[] = [];
  db = firebase.firestore();

  getRejected() {
    const rejected = this.db.collection("rejected");
    rejected.onSnapshot(snapshot => {
      this.rejected = [];
      snapshot.forEach(doc => {
        this.rejected.push(doc.data() as Furniture);
      });
    });
  }

  // TODO: make this approval push to furniture collection
  pushPending(furn: Furniture, approve: boolean) {
    const col = approve ? "furniture" : "rejected";
    const collection = this.db.collection(col);
    furn.timing.dateAdded = new Date();
    collection
      .doc(furn.id)
      .set(furn)
      .then(() => {
        console.log("Copied furniture to " + col);
      })
      .catch(error => {
        console.error("Error copying doc: ", error);
      });

    this.db
      .collection("rejected")
      .doc(furn.id)
      .delete()
      .then(() => {
        console.log("Removed from pending");
      })
      .catch(error => {
        console.error("Error removing doc: ", error);
      });
  }

  mounted() {
    this.getRejected();
  }
}
</script>
