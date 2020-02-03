<template>
  <div>
    <div v-if="!fclass">Select a furniture class</div>
    <div v-else>
      <div>Select a size</div>
      <v-radio-group v-model="size" mandatory>
        <v-radio v-for="(size, i) in getSizes()" :key="size" :label="size" :value="i + 1"></v-radio>
      </v-radio-group>

      <div>Select a material</div>
      <v-radio-group v-model="material" mandatory>
        <v-radio v-for="mat in materials" :key="mat" :label="mat" :value="mat"></v-radio>
      </v-radio-group>

      <v-btn
        flat
        color="primary"
        @click="
          {
            (showAltMaterial = !showAltMaterial), (altMaterial = '');
          }
        "
      >
        {{ showAltMaterial ? "REMOVE" : "ADD" }} SECOND MATERIAL
      </v-btn>

      <div v-if="showAltMaterial">
        <div>Select another material</div>
        <v-radio-group v-model="altMaterial">
          <v-radio v-for="mat in materials" :key="mat" :label="mat" :value="mat"></v-radio>
        </v-radio-group>
      </div>

      <div v-if="fclass === 'Bed'">
        <div>Bed Features</div>
        <v-checkbox v-model="hasFrame" label="Has bed frame?"></v-checkbox>
        <v-checkbox v-model="hasBoxSpring" label="Has box spring?"></v-checkbox>
      </div>

      <div>Other physical attributes</div>
      <v-checkbox v-model="heavy" label="Heavy furniture"></v-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { FClass, Size, Material } from "@/data/Furniture";

@Component
export default class PhysicalAttr extends Vue {
  @Prop()
  fclass!: FClass;

  materials = Object.keys(Material);

  size = -1;

  material = "";

  showAltMaterial = false;

  altMaterial = "";

  hasFrame = false;

  hasBoxSpring = false;

  heavy = false;

  // These will be set programmatically based on user input
  set = false;

  numChairs = 0;

  getSizes() {
    return Size[this.fclass];
  }
}
</script>
