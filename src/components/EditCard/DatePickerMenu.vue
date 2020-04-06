<template>
  <v-menu
    ref="dateMenu"
    v-model="dateMenu"
    :close-on-content-click="false"
    :return-value="value"
    transition="scale-transition"
    min-width="18rem"
    :disabled="readonly"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="value"
        :label="label"
        :class="spacing"
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

  @Prop({ default: "Default label" })
  readonly label!: string;

  @Prop({ default: "" })
  readonly spacing!: string;

  @Prop({ default: false })
  readonly readonly!: boolean;

  dateMenu = false;

  updateDate(value: string): void {
    const menu: any = this.$refs.dateMenu;
    menu.save(value);
    this.$emit("input", value);
  }
}
</script>
