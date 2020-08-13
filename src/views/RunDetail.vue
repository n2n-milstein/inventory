<template>
  <v-col cols="12">
    <div v-if="!!run">
      <header class="mb-4">
        <div class="d-flex" align="center">
          <h1 class="text-h5 font-weight-bold text-left">
            Run for {{ run.date.toDateString() }}
          </h1>
          <v-spacer />
          <view-action-group
            class="ml-3"
            disabled-message="Select items to use actions"
            :actions="runActions"
          />
        </div>
        <h2 class="text-subtitle-1">Status: {{ status }}</h2>
        <run-detail-progress-slider :value="run.status" />
      </header>

      <v-card class="mb-4">
        <v-card-title align="center">
          General Notes
          <v-spacer />
          <v-btn
            small
            fab
            depressed
            color="white"
            @click="editNotes = !editNotes"
          >
            <v-icon>{{ editNotes ? "save" : "edit" }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text :class="{ 'readonly-text': !editNotes }">
          <v-textarea
            v-model="notes"
            :readonly="!editNotes"
            filled
            :background-color="editNotes ? 'grey lighten-3' : 'white'"
            auto-grow
            hide-details
            no-resize
          ></v-textarea>
        </v-card-text>
      </v-card>

      <run-detail-section
        class="mb-4"
        title="Volunteers"
        variant="volunteer"
        :items="run.volunteers"
      />

      <run-detail-section
        class="mb-4"
        title="Pickups"
        variant="pickup"
        :items="run.pickups"
        @show="showFurniture($event)"
      />

      <run-detail-section
        class="mb-4"
        title="Dropoffs"
        variant="dropoff"
        :clients="run.clients"
        :items="run.dropoffs"
        @show="showFurniture($event)"
      />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            :block="$vuetify.breakpoint.xsOnly"
            color="success"
          >
            Set run status as...
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="stat in statusValues"
            :key="stat"
            @click="status = stat"
          >
            <v-list-item-title>{{ stat }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <furniture-card-dialog
      :readonly="true"
      :dialog="furnitureDialog"
      namespace="run-detail"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";
import ViewActionGroup from "@/components/ViewActionGroup.vue";
import Run, { RunStatus } from "@/data/Run";
import { addItem } from "@/network/run-service";
import { SampleRun } from "@/data/Sample";
import ViewAction from "@/data/ViewAction";
import FurnitureCardDialog from "@/components/FurnitureCardDialog.vue";
import { mapActions, mapGetters } from "vuex";
import RunDetailSection from "@/components/RunDetailSection.vue";
import { Furniture } from "@/data/Furniture";
import FurnitureClassVIcon from "@/components/FurnitureClassVIcon.vue";
import RunDetailProgressSlider from "@/components/RunDetailProgressSlider.vue";

@Component({
  components: {
    ViewActionGroup,
    FurnitureCardDialog,
    RunDetailSection,
    FurnitureClassVIcon,
    RunDetailProgressSlider,
  },
  computed: mapGetters("run-detail", {
    furniture: "getCurrent",
    run: "getRun",
  }),
  methods: mapActions("run-detail", [
    "setFurniture",
    "updateRun",
    "bindRun",
    "setId",
    "commitRunUpdates",
  ]),
})
export default class RunDetail extends Vue {
  @Prop({ default: "default" })
  readonly id!: string;

  readonly setFurniture!: ({ item }: { item: Furniture }) => void;

  readonly updateRun!: ({ updates }: { updates: Partial<Run> }) => void;

  readonly setId!: ({ id }: { id: string }) => void;

  readonly bindRun!: () => void;

  readonly commitRunUpdates!: () => Promise<void>;

  readonly furniture!: Furniture;

  readonly run!: Run;

  @Watch("editNotes")
  onEditNotesChanged(val: boolean): void {
    if (!val) {
      this.commitRunUpdates();
    }
  }

  readonly statusValues = Object.values(RunStatus).filter(
    (val) => typeof val !== "number",
  );

  editNotes = false;

  get status(): keyof typeof RunStatus {
    return RunStatus[this.run.status] as keyof typeof RunStatus;
  }

  set status(value: keyof typeof RunStatus) {
    this.updateRun({ updates: { status: RunStatus[value] } });
    this.commitRunUpdates();
  }

  get furnitureDialog(): boolean {
    return !!this.furniture;
  }

  get notes(): string {
    return this.run.notes;
  }

  set notes(notes: string) {
    this.updateRun({ updates: { notes } });
  }

  readonly runMenuActions: ViewAction[] = [
    { icon: "archive", desc: "Archive run", emit: "archive", disabled: true },
    {
      icon: "cloud_download",
      desc: "Export run",
      emit: "download",
      disabled: true,
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
    this.setId({ id: this.id });
    this.bindRun();
  }

  pushSample(): void {
    console.log(this.id);
    addItem(SampleRun);
  }

  showFurniture(item: Furniture): void {
    this.setFurniture({ item });
  }

  // markRunComplete(): void {
  //   this.
  // }
}
</script>

<style lang="scss" scoped>
.readonly-text ::v-deep .v-text-field > .v-input__control > .v-input__slot {
  &::before,
  &::after {
    content: none;
    border: none;
  }
}
</style>
