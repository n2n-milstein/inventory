<template>
  <div>
    <v-checkbox
      v-model="selected"
      :label="question"
      hide-details
      :readonly="readonly"
    />
    <div v-if="selected" class="pt-1">
      <date-picker-menu
        :value="value"
        :label="label"
        :readonly="readonly"
        @input="updateDate($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import DatePickerMenu from "./DatePickerMenu.vue";

@Component({ components: { DatePickerMenu } })
export default class ConditionalDate extends Vue {
  @Prop()
  readonly value!: string;

  updateDate(date: string): void {
    this.$emit("input", date);
  }

  get selected(): boolean {
    return !!this.value;
  }

  set selected(select: boolean) {
    if (!select) this.updateDate("");
    else this.updateDate(new Date().toLocaleDateString());
  }

  @Prop({ default: "Default?" })
  readonly question!: string;

  @Prop({ default: "Default label" })
  readonly label!: string;

  @Prop({ default: false })
  readonly readonly!: boolean;
}
</script>
