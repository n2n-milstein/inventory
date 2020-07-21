<template>
  <v-col cols="12">
    <h2>Run ID: {{ id }}</h2>
    <pre>{{ JSON.stringify(run, null, 2) }}</pre>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import Run, { RunStatus } from "../data/Run";
import { generateClient } from "../data/Client";
import { Furniture } from "../data/Furniture";
import { VolunteerRole } from "../data/Volunteer";
import Donor from "../data/furniture/Donor";
import Physical, { FClass } from "../data/furniture/Physical";

@Component({ components: {} })
export default class RunDetail extends Vue {
  @Prop({ default: "default" })
  readonly id!: string;

  readonly run: Run = {
    id: "testRun",
    dateCreated: new Date(),
    lastUpdated: new Date(),
    date: new Date(),
    volunteers: [
      {
        id: "vol1",
        name: "John Johnson",
        phone: "123-555-5555",
        role: VolunteerRole.Driver,
        email: "john@jj.com",
        address: "1 Test Rd Ithaca, NY 14850",
        runs: [] as string[],
      },
    ],
    pickups: [
      {
        ...new Furniture("pic1"),
        donor: new Donor(
          "Bill Smith",
          "111-222-3333",
          "bill@gmail.com",
          "123 Test St Ithaca, NY",
        ),
      },
      {
        ...new Furniture("pic2"),
        donor: new Donor(
          "Bill Smith",
          "111-222-3333",
          "bill@gmail.com",
          "123 Test St Ithaca, NY",
        ),
        physical: new Physical(0, FClass.Bed),
      },
    ],
    dropoffs: [
      {
        ...new Furniture("pic1"),
        donor: new Donor(
          "Bill Smith",
          "111-222-3333",
          "bill@gmail.com",
          "123 Test St Ithaca, NY",
        ),
      },
      {
        ...new Furniture("pic2"),
        donor: new Donor(
          "Bill Smith",
          "111-222-3333",
          "bill@gmail.com",
          "123 Test St Ithaca, NY",
        ),
        physical: new Physical(0, FClass.Bed),
      },
    ],
    clients: [generateClient(), generateClient()],
    status: RunStatus.Planning,
  };
}
</script>
