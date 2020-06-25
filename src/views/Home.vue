<template>
  <div class="home">
    <navigation />

    <v-main>
      <v-container class="pa-0 fill-height" fluid>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({ components: { Navigation } })
export default class Home extends Vue {}
</script>
