<template>
  <v-container>
    <v-row>
      <admin-dialog collection="furniture" />
      <admin-dialog collection="rejected" />
      <admin-dialog collection="pending" />

      <v-dialog v-model="dialog" width="750" scrollable>
        <template v-slot:activator="{ on: edit }">
          <v-btn v-on="{ ...edit }">
            Show Edit Dialog
          </v-btn>
        </template>
        <edit-card />
      </v-dialog>

      <v-col cols="12">
        <edit-card />
      </v-col>
    </v-row>
  </v-container>
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
