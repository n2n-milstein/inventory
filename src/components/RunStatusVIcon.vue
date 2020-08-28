<template>
  <v-icon :size="size">{{ icons[status] }}</v-icon>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { RunStatus } from "@/data/Run";

@Component
export default class RunStatusVIcon extends Vue {
  @Prop({ default: RunStatus.Planning })
  readonly status!: RunStatus;

  @Prop({ default: 20 })
  readonly size!: number;

  readonly icons = [
    "note_add",
    "alarm_on",
    "local_shipping",
    "assignment_turned_in",
  ];
}
</script>
