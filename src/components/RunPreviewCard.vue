<template>
  <v-card>
    <v-card-title>{{ run.date.toDateString() }}</v-card-title>
    <v-card-text>
      <!-- Volunteers -->
      <h2 class="subtitle-1">
        {{ `${run.volunteers.length} ` }}
        {{ run.volunteers.length === 1 ? "Volunteer" : "Volunteers" }}
      </h2>
      <!-- TODO: probably make this into a component -->
      <v-list>
        <v-list-item v-for="vol in run.volunteers" :key="vol.id">
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
      <v-list three-line>
        <v-list-item v-for="pic in run.pickups" :key="pic.id">
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
              <p>
                {{ pic.donor.name }} ({{ pic.donor.phone }})<br />
                {{ pic.physical.class }}
              </p>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <h2 class="subtitle-1">
        {{ `${run.dropoffs.length} ` }}
        {{ run.dropoffs.length === 1 ? "Dropoff" : "Dropoffs" }}
      </h2>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import EditCard from "@/components/EditCard.vue";
import Run from "@/data/Run";

@Component({ components: { EditCard } })
export default class RunPreviewCard extends Vue {
  @Prop({})
  readonly run!: Run;
}
</script>
