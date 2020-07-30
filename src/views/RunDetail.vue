<template>
  <v-col cols="12">
    <h2>Testing</h2>
    <div class="mb-4 d-flex" align="center">
      <h2>Run ID: {{ id }}</h2>
      <v-spacer />
      <view-action-group
        class="ml-3"
        disabled-message="Select items to use actions"
        :actions="runActions"
      />
    </div>

    <v-card class="mb-4">
      <v-card-title>General Notes</v-card-title>
      <v-card-text>
        {{ run.notes }}
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>Volunteers</v-card-title>
      <v-card-text>
        <v-list three-line>
          <div v-if="run.volunteers.length === 0">
            No volunteers available.
          </div>
          <v-list-item v-for="vol in run.volunteers" :key="vol.id">
            <v-list-item-icon>
              <v-icon>{{
                vol.role === "Driver" ? "drive_eta" : "person"
              }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ vol.role }} - {{ vol.name }}
              </v-list-item-title>
              {{ vol.address }}<br />{{ vol.phone }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>
        {{ `${Object.keys(run.pickups).length} ` }}
        {{ Object.keys(run.pickups).length === 1 ? "Pickup" : "Pickups" }}
      </v-card-title>
      <v-card-text>
        <div v-if="Object.keys(run.pickups).length === 0">
          No pickups available.
        </div>
        <v-list>
          <v-list-item
            v-for="pic in run.pickups"
            :key="pic.id"
            @click="showFurniture(pic)"
          >
            <v-list-item-icon>
              <v-icon v-if="pic.physical.class === 'Chair'">event_seat</v-icon>
              <v-icon v-if="pic.physical.class === 'Bed'">mdi-bed</v-icon>
              <v-icon v-if="pic.physical.class === 'Couch'">weekend</v-icon>
              <v-icon v-if="pic.physical.class === 'Table'">
                mdi-table-furniture
              </v-icon>
              <v-icon v-if="pic.physical.class === 'Dresser'">
                mdi-dresser
              </v-icon>
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
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>
        {{ `${Object.keys(run.dropoffs).length} ` }}
        {{ Object.keys(run.dropoffs).length === 1 ? "Dropoff" : "Dropoffs" }}
      </v-card-title>
      <v-card-text>
        <div v-if="Object.keys(run.dropoffs).length === 0">
          No dropoffs available.
        </div>
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
    </v-card>

    <v-btn :block="$vuetify.breakpoint.xsOnly" color="success">
      Mark as complete
    </v-btn>

    <furniture-card-dialog :dialog="furnitureDialog" namespace="run-detail" />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import Run from "@/data/Run";
import { getItem, addItem } from "@/network/run-service";
import { SampleRun } from "@/data/Sample";
import ViewAction from "@/data/ViewAction";
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";
import { mapActions, mapGetters } from "vuex";
import { Furniture } from "../data/Furniture";

@Component({
  components: { ViewActionGroup, FurnitureCardDialog },
  computed: mapGetters("run-detail", { furniture: "getCurrent" }),
  methods: mapActions("run-detail", ["setFurniture"]),
})
export default class RunDetail extends Vue {
  @Prop({ default: "default" })
  readonly id!: string;

  readonly setFurniture!: ({ item }: { item: Furniture }) => void;

  readonly furniture!: Furniture;

  run: Run = {} as Run;

  get furnitureDialog(): boolean {
    return !!this.furniture;
  }

  readonly runMenuActions: ViewAction[] = [
    { icon: "archive", desc: "Archive run", emit: "archive" },
    {
      icon: "cloud_download",
      desc: "Export run",
      emit: "download",
    },
  ];

  readonly runActions: ViewAction[] = [
    {
      icon: "more_vert",
      desc: "More Actions",
      emit: "menu",
      menu: this.runMenuActions,
    },
  ];

  mounted(): void {
    console.log(this.id);
    getItem(this.id).then((it) => {
      console.log("item", it);
      this.run = it;
    });
  }

  pushSample(): void {
    console.log(this.id);
    addItem(SampleRun);
  }

  showFurniture(item: Furniture): void {
    this.setFurniture({ item });
  }
}
</script>