<template>
  <v-toolbar flat dense class="transparent toolbar">
    <v-toolbar-items>
      <v-layout row wrap>
        <v-flex pr-3>
          <v-menu
            v-model="showTypes"
            :close-on-content-click="false"
            :nudge-width="20"
            :nudge-bottom="10"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn color="primary" flat outline round v-on="on">
                Type
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-radio-group v-model="radios" :mandatory="false">
                  <v-radio
                    v-for="t in furnTypes"
                    :key="t"
                    :label="`${t}`"
                    :value="t"
                  ></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <!-- TODO: THE APPLY BUTTON CURRENTLY DOES NOTHING -->
                <v-btn
                  color="primary"
                  :value="submit"
                  flat
                  small
                  @click="$emit(filter, t)"
                  >Apply Type</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-flex>
        <v-flex pr-3>
          <v-menu
            v-model="showStatus"
            :close-on-content-click="false"
            :nudge-width="20"
            :nudge-bottom="10"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn color="primary" flat outline round v-on="on">
                Status
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-radio-group v-model="radios" :mandatory="false">
                  <v-radio
                    v-for="s in statuses"
                    :key="s"
                    :label="`${s}`"
                    :value="s"
                  ></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  :value="submit"
                  flat
                  small
                  @click="$emit(filter, t)"
                  >Apply Status</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-flex>
        <v-flex pr-3>
          <v-menu
            v-model="showMaterial"
            :close-on-content-click="false"
            :nudge-width="70"
            :nudge-bottom="10"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn color="primary" flat outline round v-on="on">
                Material
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-radio-group v-model="radios" :mandatory="false">
                  <v-radio
                    v-for="m in materials"
                    :key="m"
                    :label="`${m}`"
                    :value="m"
                  ></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  :value="submit"
                  flat
                  small
                  @click="$emit(filter, t)"
                  >Apply Material</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { FClass, Material, Status, Furniture } from "@/data/Furniture";

@Component
export default class FiltersBar extends Vue {
  furnTypes = ["Bed", "Chair", "Couch", "Table", "Dresser"];
  statuses = ["Donor", "On Truck", "Shed", "Delivered", "Unknown"];
  materials = ["Wood", "Glass", "Metal", "Plastic"];

  showTypes = false;
  showStatus = false;
  showMaterial = false;
}
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 100;
  opacity: 100%;
}

// .toolbar >>> .v-toolbar__content {
//   padding: 10%;
//   margin: 10%;
// }
</style>
