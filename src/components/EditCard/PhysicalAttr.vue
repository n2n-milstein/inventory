<template>
  <div>
    <div v-if="fclass">
      <h3>Select a size</h3>
      <v-radio-group v-model="size" mandatory :readonly="readonly">
        <v-radio
          v-for="(size, i) in getSizes()"
          :key="size"
          :label="size"
          :value="i + 1"
        />
      </v-radio-group>

      <h3>Select a material</h3>
      <v-radio-group v-model="material" mandatory :readonly="readonly">
        <v-radio
          v-for="mat in materials"
          :key="mat"
          :label="mat"
          :value="mat"
        />
      </v-radio-group>

      <v-btn
        outlined
        :color="showAltMaterial ? 'red' : 'primary'"
        @click="
          {
            (showAltMaterial = !showAltMaterial), (altMaterial = '');
          }
        "
        class="mb-3"
        :disabled="readonly"
      >
        {{ showAltMaterial ? "REMOVE" : "ADD" }} SECOND MATERIAL
      </v-btn>

      <div v-if="showAltMaterial">
        <h3>Select another material</h3>
        <v-radio-group v-model="altMaterial" :readonly="readonly">
          <v-radio
            v-for="mat in materials"
            :key="mat"
            :label="mat"
            :value="mat"
          />
        </v-radio-group>
      </div>

      <div v-if="fclass === 'Bed'">
        <h3>Bed Features</h3>
        <v-checkbox
          v-model="hasFrame"
          label="Has bed frame?"
          hide-details
          :readonly="readonly"
        />
        <v-checkbox
          v-model="hasBoxSpring"
          label="Has box spring?"
          hide-details
          :readonly="readonly"
        />
      </div>

      <h3 class="pt-4">Other physical attributes</h3>
      <v-checkbox
        class="pb-3"
        v-model="heavy"
        label="Heavy furniture"
        hide-details
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { Size, Furniture } from "@/data/Furniture";
import { FClass, Material } from "@/data/furniture/Physical";

@Component
export default class PhysicalAttr extends Vue {
  @Prop()
  readonly furniture!: Furniture;

  @Prop({ default: false })
  readonly readonly!: boolean;

  @Prop()
  readonly fclass!: FClass;

  materials = Object.keys(Material);

  size = -1;

  material = "";

  showAltMaterial = !!this.readonly;

  altMaterial = "";

  hasFrame = false;

  hasBoxSpring = false;

  heavy = false;

  // These will be set programmatically based on user input
  set = false;

  numChairs = 0;

  getSizes(): string[] {
    return Size[this.fclass];
  }
}
</script>
