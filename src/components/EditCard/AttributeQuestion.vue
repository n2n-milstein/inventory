<template>
  <div>
    <p>{{ question }}</p>
    <v-radio-group v-model="answer" row @change="$emit('answer', answer)">
      <v-radio label="Yes" value="true" />
      <v-radio label="No" value="false" />
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { AttributesDict } from "@/data/Furniture";

@Component
export default class AttributeQuestion extends Vue {
  @Prop()
  attribute!: string;

  question = "";

  answer = false;

  /**
   * Sets the question associated with the given prop `attribute`
   */
  getQuestion() {
    let question = "";
    Object.keys(AttributesDict).forEach((key) => {
      if (key === this.attribute) question = AttributesDict[key].question;
    });

    this.question = question !== "" ? question : "Invalid attribute";
  }

  mounted() {
    this.getQuestion();
  }
}
</script>
