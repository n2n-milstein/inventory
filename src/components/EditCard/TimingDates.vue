<template>
  <div>
    <date-picker-menu
      v-model="dateOffered"
      label="Date Offered"
      spacing="pb-3"
      :readonly="readonly"
    />

    <date-picker-menu
      v-model="pickupBy"
      label="Pickup By Date"
      spacing="pb-3"
      :readonly="readonly"
    />

    <v-checkbox
      v-model="urgent"
      label="Urgent?"
      hide-details
      :readonly="readonly"
    />

    <conditional-date
      question="Has the pickup date been confirmed?"
      label="Confirmed Pickup Date"
      v-model="confirmedPickupDate"
      :readonly="readonly"
    />

    <conditional-date
      question="Has the furniture been collected?"
      label="Date Collected"
      v-model="dateCollected"
      :readonly="readonly"
    />

    <conditional-date
      question="Has the furniture been delivered?"
      label="Date Delivered"
      v-model="dateDelivered"
      class="pb-3"
      :readonly="readonly"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Timing, { Timestamp } from "@/data/furniture/Timing";
import DatePickerMenu from "./DatePickerMenu.vue";
import ConditionalDate from "./ConditionalDate.vue";

@Component({ components: { DatePickerMenu, ConditionalDate } })
export default class TimingDates extends Vue {
  @Prop()
  readonly value!: Timing;

  @Prop({ default: false })
  readonly readonly!: boolean;

  updateTiming(updates: Partial<Timing>): void {
    this.$emit("input", { ...this.value, ...updates });
  }

  /**
   * TODO: move this to external file
   * Formats date to a string
   */
  static formatDate(date?: Date | Timestamp): string {
    if (!date) return "";
    if (date instanceof Date) return date.toISOString().substring(0, 10);
    return date.toDate().toISOString().substring(0, 10);
  }

  get dateOffered(): string {
    return TimingDates.formatDate(this.value.dateOffered);
  }

  set dateOffered(value: string) {
    this.updateTiming({ dateOffered: value ? new Date(value) : undefined });
  }

  get pickupBy(): string {
    return TimingDates.formatDate(this.value.pickupBy);
  }

  set pickupBy(value: string) {
    this.updateTiming({ pickupBy: value ? new Date(value) : undefined });
  }

  get urgent(): boolean {
    return this.value.urgent;
  }

  set urgent(value: boolean) {
    this.updateTiming({ urgent: value });
  }

  get confirmedPickupDate(): string {
    return TimingDates.formatDate(this.value.confirmedPickupDate);
  }

  set confirmedPickupDate(value: string) {
    /* eslint-disable object-curly-newline */
    this.updateTiming({
      confirmedPickupDate: value ? new Date(value) : undefined,
    });
    /* eslint-enable object-curly-newline */
  }

  get dateCollected(): string {
    return TimingDates.formatDate(this.value.dateCollected);
  }

  set dateCollected(value: string) {
    this.updateTiming({ dateCollected: value ? new Date(value) : undefined });
  }

  get dateDelivered(): string {
    return TimingDates.formatDate(this.value.dateDelivered);
  }

  set dateDelivered(value: string) {
    this.updateTiming({ dateDelivered: value ? new Date(value) : undefined });
  }
}
</script>
