<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({ components: { HelloWorld } })
export default class Hello extends Vue {}
</script>
