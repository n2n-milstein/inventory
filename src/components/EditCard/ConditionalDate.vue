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
      hide-details
      :readonly="readonly"
    />
    <div v-if="selected" class="pt-1">
      <date-picker-menu
        :label="label"
        @date="$emit('date', $event)"
        :readonly="readonly"
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
  @Prop({ default: "Default?" })
  readonly question!: string;

  @Prop({ default: "Default label" })
  readonly label!: string;

  @Prop({ default: false })
  readonly readonly!: boolean;

  selected = this.readonly;
}
</script>
