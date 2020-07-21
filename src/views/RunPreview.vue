<template>
  <v-col cols="12">
    <furniture-table-header
      v-model="search"
      title="Runs"
      subtitle="Click on “View Details” to make edits to a run"
      class="px-4 mb-3"
    />
    <div class="mb-4 d-inline-flex" align="center">
      <v-btn color="primary" rounded>
        <v-icon left>add</v-icon>
        Add
        <!-- {{ selected.length > 0 ? "" : "Add" }} -->
      </v-btn>
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="runActions"
      />
    </div>
    <run-preview-card v-for="run in runs" :key="run.id" :run="run" />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// data
import Run, { RunStatus } from "@/data/Run";
import { generateClient } from "@/data/Client";
import { Furniture } from "@/data/Furniture";
import { VolunteerRole } from "@/data/Volunteer";
import Donor from "@/data/furniture/Donor";
import Physical, { FClass } from "@/data/furniture/Physical";
// components
import FurnitureTableHeader from "@/components/FurnitureTableHeader.vue";
import RunPreviewCard from "@/components/RunPreviewCard.vue";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import ViewAction from "../data/ViewAction";

@Component({
  components: {
    FurnitureTableHeader,
    RunPreviewCard,
    ViewActionGroup,
  },
})
export default class RunPreview extends Vue {
  search = "";

  readonly runActions: ViewAction[] = [
    { icon: "archive", desc: "Archive selected items", emit: "archive" },
    {
      icon: "cloud_download",
      desc: "Export selected items to spreadsheet",
      emit: "download",
    },
    {
      icon: "playlist_add",
      desc: "Add selected items to run",
      emit: "list-add",
    },
  ];

  readonly runs: Run[] = [
    {
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
    },
  ];
}
</script>
