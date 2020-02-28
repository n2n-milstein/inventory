<template>
  <v-menu
    ref="dateMenu"
    v-model="dateMenu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    min-width="18rem"
    :disabled="readonly"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        :class="spacing"
        readonly
        hide-details
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      @input="
        {
          $refs.dateMenu.save(date);
          $emit('date', date);
          dateMenu = false;
        }
      "
      :readonly="readonly"
    />
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class DatePickerMenu extends Vue {
  @Prop({ default: "Default label" })
  readonly label!: string;

  @Prop({ default: "" })
  readonly spacing!: string;

  @Prop({ default: false })
  readonly readonly!: boolean;

  dateMenu = false;

  date = "";
}
</script>
