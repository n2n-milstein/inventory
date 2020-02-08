<template>
  <div>
    <p>{{ attrQuestion(attribute) }}</p>
    <v-radio-group v-model="answer" @change="$emit('answer', answer)" row>
      <v-radio label="Yes" value="true"></v-radio>
      <v-radio label="No" value="false"></v-radio>
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { AttributesDict } from "../../data/Furniture";

@Component
export default class AttributeQuestion extends Vue {
  @Prop()
  attribute!: string;

  answer = false;

  /**
   * Returns the question associated with the given attribute `attr`
   * @param attr - a Furniture Attribute name
   * @returns the question associated with the attribute or
   * "Invalid attribute" if the attribute cannot be found in the dictionary
   */
  static attrQuestion(attr: string) {
    Object.keys(AttributesDict).map((key) => {
      if (key === attr) return AttributesDict[key].question;
      return "Invalid attribute";
    });

    return "Invalid attribute";
  }
}
</script>
