<template>
  <div>
    {{ fclass }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { FClass } from "@/data/Furniture";

@Component
export default class PhysicalAttr extends Vue {
  @Prop()
  fclass!: FClass;
}
</script>
