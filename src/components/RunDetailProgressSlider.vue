<template>
  <v-slider
    class="px-5 pt-10"
    readonly
    :value="(value * 100) / 3"
    :step="steps"
    :tick-labels="labels"
    ticks="always"
    thumb-label="always"
    tick-size="5"
  >
    <template v-slot:thumb-label="{ value }">
      <run-status-v-icon class="white--text" :status="(value * 3) / 100" />
    </template>
  </v-slider>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { RunStatus } from "@/data/Run";
import RunStatusVIcon from "@/components/RunStatusVIcon.vue";

@Component({ components: { RunStatusVIcon } })
export default class RunDetailProgressSlider extends Vue {
  @Prop({ default: RunStatus.Complete })
  readonly value!: RunStatus;

  readonly labels = Object.values(RunStatus).filter(
    (val) => typeof val !== "number",
  );

  readonly steps = 100 / (this.labels.length - 1);
}
</script>
