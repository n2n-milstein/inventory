<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <div class="mx-4 my-2">{{ volunteers.length }} Volunteer(s)</div>
    <v-div v-for="vol in volunteers" :key="vol.name"
      ><v-list-item class="ml-4"
        ><v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle
          >{{ vol.type }}: {{ vol.name }} {{ vol.phone }}</v-list-item-subtitle
        >
      </v-list-item>
    </v-div>
    <div class="mx-4 my-2">{{ pickUps.length }} Pick Up(s)</div>
    <div class="mx-4 my-2">{{ dropOffs.length }} Drop Off(s)</div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EditCard from "@/components/EditCard.vue";

@Component({ components: { EditCard } })
export default class RunCard extends Vue {
  @Prop({})
  readonly title!: string;

  @Prop({})
  readonly volunteers!: any;

  @Prop({})
  readonly pickUps!: any;

  @Prop({})
  readonly dropOffs!: any;
}
</script>
