<template>
  <div>
    <h2 class="title">
      {{ title }}
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class ViewTitle extends Vue {
  @Prop({ default: "ViewTitle" })
  title!: string;
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 500;
}
</style>
