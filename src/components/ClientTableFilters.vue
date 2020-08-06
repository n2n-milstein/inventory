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
        <v-row class="pa-7 pb-0">
          <v-col>
            <h4>Furniture Requested</h4>
            <v-row>
              <v-checkbox
                class="mr-10"
                @change="update('Furniture', $event)"
                :input-value="requestFilter"
                v-for="box in requestCheckboxes"
                :key="box"
                :label="box"
                :value="box"
                hide-details
              >
              </v-checkbox>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="pa-7 pb-0">
          <v-col>
            <h4>Reason for Need</h4>
            <v-row>
              <v-checkbox
                class="mr-10"
                @change="update('Need', $event)"
                :input-value="needFilter"
                v-for="box in needCheckboxes"
                :key="box.value"
                :label="box"
                :value="box"
                hide-details
              >
              </v-checkbox>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="pa-7">
          <v-col>
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
            <h4>Donor Name</h4>
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
          <v-col>
            <h4>Date Added Range</h4>
            <date-picker-menu
              :value="startDateFilter"
              @input="update('StartDate', $event)"
              label="Start Date"
              icon="today"
            />
            <date-picker-menu
              :value="endDateFilter"
              @input="update('EndDate', $event)"
              label="End Date"
              icon="event"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Client, { needOptions, requestOptions } from "@/data/Client";
import DatePickerMenu from "@/components/DatePickerMenu.vue";

@Component({ components: { DatePickerMenu } })
export default class ClientTableFilters extends Vue {
  @Prop({})
  readonly startDateFilter!: string;

  @Prop({})
  readonly endDateFilter!: string;

  @Prop({})
  readonly needFilter!: string[];

  @Prop({})
  readonly requestFilter!: string[];

  @Prop({})
  readonly donorFilter!: string[];

  @Prop({})
  readonly zoneFilter!: string[];

  @Prop({})
  readonly inventory!: Client[];

  readonly needCheckboxes = needOptions;

  readonly requestCheckboxes = requestOptions;

  get donorOptions(): any {
    return this.inventory.map((x) => x.clientName);
  }

  get zoneOptions(): any {
    return this.inventory.map((x) => x.clientArea);
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
      case "Furniture":
        this.$emit("request", value);
        break;
      case "Need":
        this.$emit("need", value);
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
    const adjustedFilter = ClientTableFilters.filterType(filter);
    if (!this.filterChips.includes(adjustedFilter)) {
      if (
        (filter === "Furniture" &&
          value.length !== this.requestCheckboxes.length) ||
        (filter === "Need" && value.length !== this.needCheckboxes.length) ||
        (filter === "Donor" && value.length !== 0) ||
        (filter === "Zone" && value.length !== 0) ||
        (filter === "StartDate" && value !== this.today) ||
        (filter === "EndDate" && value !== "")
      ) {
        this.filterChips.push(adjustedFilter);
      }
    } else if (
      (filter === "Furniture" &&
        value.length === this.requestCheckboxes.length) ||
      (filter === "Need" && value.length === this.needCheckboxes.length) ||
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
    if (filter === "Furniture") {
      this.$emit("request", this.requestCheckboxes);
    } else if (filter === "Need") {
      this.$emit("status", this.needCheckboxes);
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
