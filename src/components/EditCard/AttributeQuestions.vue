<template>
  <div>
    <div v-for="attr in attributesKeys" :key="attr">
      <p>{{ attributesDict[attr].question }}</p>
      <v-radio-group
        :value="value[attr].toString()"
        mandatory
        row
        :readonly="readonly"
        @change="updateAttributes(attr, $event)"
      >
        <v-radio label="Yes" value="true" />
        <v-radio label="No" value="false" />
      </v-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { AttributesDict } from "@/data/Furniture";
import Attributes from "@/data/furniture/Attributes";

@Component
export default class AttributeQuestions extends Vue {
  @Prop()
  readonly value!: Attributes;

  @Prop({ default: false })
  readonly readonly!: boolean;

  readonly attributesDict = AttributesDict;

  readonly attributesKeys = Object.keys(AttributesDict);

  updateAttributes(attr: string, value: string): void {
    const newAttr: Attributes = { ...this.value, [attr]: value === "true" };
    this.$emit("input", newAttr);
  }
}
</script>
