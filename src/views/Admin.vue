<template>
  <v-layout wrap>
    <admin-dialog collection="furniture"></admin-dialog>
    <admin-dialog collection="rejected"></admin-dialog>
    <admin-dialog collection="pending"></admin-dialog>

    <v-dialog v-model="dialog" width="750">
      <template v-slot:activator="{ on: edit }">
        <v-btn v-on="{ ...edit }">Show Edit Dialog</v-btn>
      </template>
      <edit-card></edit-card>
    </v-dialog>

    <v-flex xs12>
      <edit-card></edit-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AdminDialog from "@/components/AdminDialog.vue";
import EditCard from "@/components/EditCard.vue";

@Component({ components: { AdminDialog, EditCard } })
export default class Admin extends Vue {
  dialog = false;
}
</script>
