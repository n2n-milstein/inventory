<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ run.date.toDateString() }}
      <v-spacer />
      <view-action-group :actions="ACTIONS" />
    </v-card-title>
    <v-card-text>
      <!-- Volunteers -->
      <h2 class="text-subtitle-1">
        {{ `${run.volunteers.length} ` }}
        {{ run.volunteers.length === 1 ? "Volunteer" : "Volunteers" }}
      </h2>
      <!-- TODO: probably make this into a component -->
      <v-list>
        <v-list-item
          v-for="vol in run.volunteers"
          :key="vol.id"
          @click="() => {}"
        >
          <v-list-item-icon>
            <v-icon>person</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ vol.role }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ vol.name }} ({{ vol.phone }})
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Pickups -->
      <h2 class="subtitle-1">
        {{ `${run.pickups.length} ` }}
        {{ run.pickups.length === 1 ? "Pickup" : "Pickups" }}
      </h2>
      <!-- TODO: probably make this into a component -->
      <v-list>
        <v-list-item v-for="pic in run.pickups" :key="pic.id" @click="() => {}">
          <v-list-item-icon>
            <v-icon v-if="pic.physical.class === 'Chair'">event_seat</v-icon>
            <v-icon v-if="pic.physical.class === 'Bed'">mdi-bed</v-icon>
            <v-icon v-if="pic.physical.class === 'Couch'">weekend</v-icon>
            <v-icon v-if="pic.physical.class === 'Table'">
              mdi-table-furniture
            </v-icon>
            <v-icon v-if="pic.physical.class === 'Dresser'">mdi-dresser</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ pic.donor.address }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ pic.donor.name }} ({{ pic.donor.phone }})<br />
              {{ pic.physical.class }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- dropoffs -->
      <h2 class="subtitle-1">
        {{ `${run.dropoffs.length} ` }}
        {{ run.dropoffs.length === 1 ? "Dropoff" : "Dropoffs" }}
      </h2>
      <v-list>
        <v-list-item
          v-for="(drop, index) in run.dropoffs"
          :key="drop.id"
          @click="() => {}"
        >
          <v-list-item-icon>
            <v-icon v-if="drop.physical.class === 'Chair'">event_seat</v-icon>
            <v-icon v-if="drop.physical.class === 'Bed'">mdi-bed</v-icon>
            <v-icon v-if="drop.physical.class === 'Couch'">weekend</v-icon>
            <v-icon v-if="drop.physical.class === 'Table'">
              mdi-table-furniture
            </v-icon>
            <v-icon v-if="drop.physical.class === 'Dresser'"
              >mdi-dresser</v-icon
            >
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ run.clients[index].clientAddress }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ run.clients[index].clientName }} ({{
                run.clients[index].clientPhone
              }})<br />
              {{ drop.physical.class }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions class="pr-5 pb-5">
      <v-spacer />
      <router-link :to="`/runs/${run.id}`">
        <v-btn depressed color="primary" class="px-4">
          View Details
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EditCard from "@/components/EditCard.vue";
import Run from "@/data/Run";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import ViewAction from "../data/ViewAction";

@Component({ components: { EditCard, ViewActionGroup } })
export default class RunPreviewCard extends Vue {
  @Prop({})
  readonly run!: Run;

  readonly ACTIONS: ViewAction[] = [
    {
      icon: "more_vert",
      desc: "Run Actions",
      emit: "menu",
      menu: [],
    },
  ];
}
</script>
