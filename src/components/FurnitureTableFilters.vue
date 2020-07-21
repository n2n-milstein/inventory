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
      <v-container v-show="showFilter" class="grey lighten-4 px-6">
        <v-row>
          <v-spacer class="d-none d-lg-flex" />
          <v-col class="pa-9 pr-0">
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
          <v-col class="pa-9 pr-0">
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
          <v-col class="pa-9 pl-0">
            <h4>Address Zone</h4>
            <v-autocomplete
              class="pt-0 mt-0"
              @change="update('Zone', $event)"
              :value="zoneFilter"
              :items="zoneOptions"
              chips
              multiple
              hide-details
            />
            <h4 class="mt-5">Donor Name</h4>
            <v-autocomplete
              class="pt-0 mt-0"
              @change="update('Donor', $event)"
              :value="donorFilter"
              :items="donorOptions"
              chips
              multiple
              hide-details
            />
          </v-col>
          <v-col class="pa-9">
            <h4>Date Added Range</h4>
            <date-picker-menu
              :value="startDateFilter"
              @input="update('StartDate', $event)"
              label="Start Date"
              icon="today"
            />
            <div class="mt-5">
              <date-picker-menu
                :value="endDateFilter"
                @input="update('EndDate', $event)"
                label="End Date"
                icon="event"
              />
            </div>
          </v-col>
          <v-spacer class="d-none d-lg-flex" />
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
import DatePickerMenu from "@/components/DatePickerMenu.vue";

@Component({ components: { DatePickerMenu } })
export default class FurnitureTableFilters extends Vue {
  @Prop({})
  readonly startDateFilter!: string;

  @Prop({})
  readonly endDateFilter!: string;

  @Prop({})
  readonly statusFilter!: string[];

  @Prop({})
  readonly classFilter!: string[];

  @Prop({})
  readonly donorFilter!: string[];

  @Prop({})
  readonly zoneFilter!: string[];

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

  get zoneOptions(): any {
    return this.inventory.map((x) => x.donor.zone);
  }

  filterChips = [] as string[];

  showFilter = false;

  startOpen = false;

  endOpen = false;

  today = new Date().toISOString().substr(0, 10);

  static filterType(f: string): string {
    if (f === "StartDate" || f === "EndDate") {
      return "Date";
    }
    return f;
  }

  update(filter: string, value: string[]): void {
    switch (filter) {
      case "StartDate":
        this.startOpen = false;
        this.$emit("startdate", value);
        break;
      case "EndDate":
        this.endOpen = false;
        this.$emit("enddate", value);
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
      case "Zone":
        this.$emit("zone", value);
        break;
      default:
      // do something
    }
    this.updateChip(filter, value);
  }

  updateChip(filter: string, value: any): void {
    const adjustedFilter = FurnitureTableFilters.filterType(filter);
    if (!this.filterChips.includes(adjustedFilter)) {
      if (
        (filter === "Class" && value.length !== this.classCheckboxes.length) ||
        (filter === "Status" &&
          value.length !== this.statusCheckboxes.length) ||
        (filter === "Donor" && value.length !== 0) ||
        (filter === "Zone" && value.length !== 0) ||
        (filter === "StartDate" && value !== this.today) ||
        (filter === "EndDate" && value !== "")
      ) {
        this.filterChips.push(adjustedFilter);
      }
    } else if (
      (filter === "Class" && value.length === this.classCheckboxes.length) ||
      (filter === "Status" && value.length === this.statusCheckboxes.length) ||
      (filter === "Donor" && value.length === 0) ||
      (filter === "Zone" && value.length === 0) ||
      (filter === "StartDate" &&
        value === this.today &&
        this.endDateFilter === "")
    ) {
      this.filterChips.splice(
        this.filterChips.findIndex((x) => x === adjustedFilter),
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
      this.$emit("startdate", "");
      this.$emit("enddate", this.today);
    } else if (filter === "Donor") {
      this.$emit("donor", []);
    } else if (filter === "Zone") {
      this.$emit("zone", []);
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-weight: normal;
}
</style>
