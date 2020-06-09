<template>
  <v-dialog persistent v-model="dialog" width="450">
    <v-card>
      <v-card-title>You have unsaved changes</v-card-title>
      <v-card-text>
        Are you sure you want to discard your unsaved changes?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="$emit('cancel')">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="$emit('discard')">Discard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class UnsavedDialog extends Vue {
  @Prop({ default: false })
  dialog!: boolean;
}
</script>
