<template>
  <v-card>
    <v-card-title class="headline" primary-title>
      {{ isEdit ? "Edit" : "Add" }} Furniture
    </v-card-title>

    <v-card-text>
      Please confirm that this is something you would like to do. If you don't
      know what this is, please exit.
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary">CANCEL</v-btn>
      <v-btn flat color="primary">SAVE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class EditCard extends Vue {
  @Prop({ default: true })
  isEdit!: boolean;
}
</script>
