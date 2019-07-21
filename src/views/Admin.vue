<template>
  <v-layout>
    <admin-dialog collection="furniture"></admin-dialog>
    <admin-dialog collection="rejected"></admin-dialog>
    <admin-dialog collection="pending"></admin-dialog>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AdminDialog from "@/components/AdminDialog.vue";

@Component({
  components: { AdminDialog }
})
export default class Admin extends Vue {}
</script>
