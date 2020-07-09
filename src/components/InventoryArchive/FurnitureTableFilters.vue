<template>
  <span>
    <div class="d-inline-flex float-right" align="center">
      <div
        v-for="(chip, i) in filterChips"
        :key="chip"
        class="align-self-center"
      >
        <v-chip class="mr-3" close @click:close="closeChip(chip, i)">
          {{ chip }}
        </v-chip>
      </div>
      <v-btn rounded text @click="showFilter = !showFilter">
        <v-icon left>filter_list</v-icon> Filters
      </v-btn>
    </div>

    <v-expand-transition>
      <v-container v-show="showFilter" class="grey lighten-4 px-10 py-6">
        <v-row>
          <v-col>
            <h4>Furniture Class</h4>
            <v-checkbox
              @change="update('Class', $event)"
              :input-value="classFilter"
              v-for="box in classCheckboxes"
              :key="box"
              :label="box"
              :value="box"
              hide-details
            >
            </v-checkbox>
          </v-col>
          <v-col>
            <h4>Status</h4>
            <v-checkbox
              @change="update('Status', $event)"
              :input-value="statusFilter"
              v-for="box in statusCheckboxes"
              :key="box.value"
              :label="box.text"
              :value="box.value"
              hide-details
            >
            </v-checkbox>
          </v-col>
          <v-col>
            <v-row class="mb-16">
              <h4>Donor Name</h4>
              <v-autocomplete
                @change="update('Donor', $event)"
                :value="donorFilter"
                :items="donorOptions"
                chips
                multiple
              >
              </v-autocomplete>
            </v-row>
          </v-col>
          <v-col>
            <h4>Date Added Range</h4>
            <v-row>
              <v-menu
                v-model="startOpen"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Start Date"
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="startOpen = false"
                ></v-date-picker>
              </v-menu>
            </v-row>
            <v-row>
              <v-menu
                v-model="endOpen"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    label="End Date"
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  @input="endOpen = false"
                ></v-date-picker>
              </v-menu>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { FClass } from "@/data/furniture/Physical";
import { Furniture, Status } from "@/data/Furniture";

@Component({})
export default class FurnitureTableFilters extends Vue {
  @Prop({})
  readonly datesFilter!: string[];

  @Prop({})
  readonly statusFilter!: string[];

  @Prop({})
  readonly classFilter!: string[];

  @Prop({})
  readonly donorFilter!: string[];

  @Prop({})
  readonly inventory!: Furniture[];

  readonly classCheckboxes = Object.keys(FClass);

  readonly statusCheckboxes = Object.values(Status)
    .filter((v) => typeof (v as any) !== "number")
    .map((value, index) => {
      return { text: value, value: index };
    });

  get donorOptions(): any {
    return this.inventory.map((x) => x.donor.name);
  }

  filterChips = [] as string[];

  showFilter = false;

  startDate = "";

  startOpen = false;

  endDate = "";

  endOpen = false;

  update(filter: string, value: string[]): void {
    switch (filter) {
      case "Date":
        this.$emit("date", value);
        break;
      case "Class":
        this.$emit("class", value);
        break;
      case "Status":
        this.$emit("status", value);
        break;
      case "Donor":
        this.$emit("donor", value);
        break;
      default:
      // do something
    }
    this.updateChip(filter, value);
  }

  updateChip(filter: string, value: string[]): void {
    if (!this.filterChips.includes(filter)) {
      if (
        (filter === "Class" && value.length !== this.classCheckboxes.length) ||
        (filter === "Status" &&
          value.length !== this.statusCheckboxes.length) ||
        ((filter === "Date" || filter === "Donor") && value.length !== 0)
      ) {
        this.filterChips.push(filter);
      }
    } else if (
      (filter === "Class" && value.length === this.classCheckboxes.length) ||
      (filter === "Status" && value.length === this.statusCheckboxes.length) ||
      ((filter === "Date" || filter === "Donor") && value.length === 0)
    ) {
      this.filterChips.splice(
        this.filterChips.findIndex((x) => x === filter),
        1,
      );
    }
  }

  closeChip(filter: string, index: number): void {
    this.filterChips.splice(index, 1);
    if (filter === "Class") {
      this.$emit("class", this.classCheckboxes);
    } else if (filter === "Status") {
      this.$emit(
        "status",
        this.statusCheckboxes.map((x) => x.value),
      );
    } else if (filter === "Date") {
      this.$emit("date", []);
    } else if (filter === "Donor") {
      this.$emit("donor", []);
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-weight: normal;
}
</style>
