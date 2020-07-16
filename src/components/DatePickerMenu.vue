<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="18rem"
    :disabled="readonly"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="formattedValue"
        :label="label"
        :class="spacing"
        :prepend-icon="icon"
        readonly
        hide-details
        v-on="on"
      />
    </template>
    <v-date-picker
      :value="value"
      :readonly="readonly"
      @input="updateDate($event)"
    />
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class DatePickerMenu extends Vue {
  @Prop()
  readonly value!: string;

  @Prop({ default: "" })
  readonly icon!: string;

  @Prop({ default: "Default label" })
  readonly label!: string;

  @Prop({ default: "" })
  readonly spacing!: string;

  @Prop({ default: false })
  readonly readonly!: boolean;

  dateMenu = false;

  get formattedValue(): string {
    return DatePickerMenu.formatDate(this.value);
  }

  updateDate(value: string): void {
    this.dateMenu = false;
    this.$emit("input", value);
  }

  static formatDate(date: string): string {
    if (!date) return "";

    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }
}
</script>
