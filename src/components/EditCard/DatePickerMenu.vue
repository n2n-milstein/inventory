<template>
  <v-menu
    ref="dateMenu"
    v-model="dateMenu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    min-width="18rem"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-model="date" :label="label" readonly v-on="on" />
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
    />
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
