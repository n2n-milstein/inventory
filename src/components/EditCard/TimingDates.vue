<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Timing from "@/data/furniture/Timing";

@Component
export default class TimingDates extends Vue {
  @Prop()
  readonly value!: Timing;
}
</script>
