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
import { Size } from "@/data/Furniture";
import Physical, { FClass, Material } from "@/data/furniture/Physical";

@Component
export default class PhysicalAttr extends Vue {
  @Prop()
  readonly value!: Physical;

  @Prop({ default: false })
  readonly readonly!: boolean;

  @Prop()
  readonly fclass!: FClass;

  readonly materials = Object.keys(Material);

  /**
   * Emits changes to the physical attributes.
   * Establishes two-way binding by emitting "input".
   */
  updatePhysical(updates: Partial<Physical>): void {
    console.log("updates: ", updates);
    this.$emit("input", { ...this.value, ...updates });
  }

  get size(): number {
    return this.value.size;
  }

  set size(value: number) {
    this.updatePhysical({ size: value });
  }

  get material(): string {
    return this.value.material;
  }

  set material(value: string) {
    this.updatePhysical({ material: value as Material });
  }

  showAltMaterial = this.readonly;

  get altMaterial(): string {
    return this.value.altMaterial || "";
  }

  set altMaterial(value: string) {
    this.updatePhysical({ altMaterial: value as Material });
  }

  get hasFrame(): boolean {
    return this.value.hasFrame;
  }

  set hasFrame(value: boolean) {
    this.updatePhysical({ hasFrame: value });
  }

  get hasBoxSpring(): boolean {
    return this.value.hasBoxSpring;
  }

  set hasBoxSpring(value: boolean) {
    this.updatePhysical({ hasBoxSpring: value });
  }

  get heavy(): boolean {
    return this.value.heavy;
  }

  set heavy(value: boolean) {
    this.updatePhysical({ heavy: value });
  }

  // These will be set programmatically based on user input
  get set(): boolean {
    return this.value.set;
  }

  set set(value: boolean) {
    this.updatePhysical({ set: value });
  }

  get numChairs(): number {
    return this.value.numChairs;
  }

  set numChairs(value: number) {
    this.updatePhysical({ numChairs: value });
  }

  /**
   * Returns the strings that correspond to the size numbers for a given
   * furniture class.
   */
  getSizes(): string[] {
    return Size[this.fclass];
  }
}
</script>
