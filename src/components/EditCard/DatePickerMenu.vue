<template>
  <v-menu
    ref="dateMenu"
    v-model="dateMenu"
    :close-on-content-click="false"
    :return-value.sync="date"
    lazy
    transition="scale-transition"
    full-width
    min-width="18rem"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        v-on="on"
        readonly
      ></v-text-field>
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
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class DatePickerMenu extends Vue {
  @Prop({ default: "Default label" })
  label!: string;

  dateMenu = false;

  date = "";
}
</script>
