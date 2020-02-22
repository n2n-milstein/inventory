<template>
  <v-container fluid>
    <v-row justify="start" align="start">
      <v-col class="pb-3" cols="12">
        <view-title title="Rejections" />
      </v-col>
      <v-col cols="12" v-if="rejected.length === 0">
        <p>
          No rejections.
        </p>
      </v-col>
      <v-col lg="8" md="9" cols="12">
        <approval-card
          v-for="request in rejected"
          :key="request.id"
          :request="request"
          :is-pending="false"
          @approve="pushPending"
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
  show = false;

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
