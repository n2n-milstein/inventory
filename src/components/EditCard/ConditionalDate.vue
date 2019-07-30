<template>
  <div>
    <v-checkbox
      v-model="selected"
      :label="question"
      @change="
        {
          if (!selected) $emit('date', '');
        }
      "
    ></v-checkbox>
    <div v-if="selected">
      <date-picker-menu :label="label" @date="$emit('date', $event)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import DatePickerMenu from "./DatePickerMenu.vue";

@Component({
  components: { DatePickerMenu }
})
export default class ConditionalDate extends Vue {
  @Prop({ default: "Default?" })
  question!: string;

  @Prop({ default: "Default label" })
  label!: string;

  selected = false;
}
</script>
