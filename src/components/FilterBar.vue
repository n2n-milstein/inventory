<template>
  <v-toolbar flat dense class="transparent toolbar">
    <v-toolbar-items>
      <v-layout row wrap>
        <!-- FURNITURE TYPE FILTER  -->
        <v-flex pr-3>
          <v-menu
            v-model="showTypes"
            :close-on-content-click="false"
            :nudge-width="20"
            :nudge-bottom="10"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn color="primary" round v-on="on" :flat="!typeSubmit" :outline="!typeSubmit">Type</v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-radio-group v-model="typeSelect" :mandatory="false">
                  <v-radio v-for="t in furnType" :key="t" :label="`${t}`" :value="t"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  :value="submit"
                  flat
                  small
                  @click="applyFilter('type')"
                >Apply Type</v-btn>
                <v-btn color="error" :value="submit" flat small @click="clearFilter('type')">Clear</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-flex>

        <!-- FURNITURE STATUS FILTER -->
        <v-flex pr-3>
          <v-menu
            v-model="showStatus"
            :close-on-content-click="false"
            :nudge-width="20"
            :nudge-bottom="10"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                round
                :flat="!statusSubmit"
                :outline="!statusSubmit"
              >Status</v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-radio-group v-model="statusSelect" :mandatory="false">
                  <v-radio v-for="s in furnStatus" :key="s" :label="`${s}`" :value="s"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  :value="submit"
                  flat
                  small
                  @click="applyFilter('status')"
                >Apply Status</v-btn>
                <v-btn color="error" :value="submit" flat small @click="clearFilter('status')">Clear</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-flex>

        <!-- FURNITURE MATERIAL FILTER -->
        <v-flex pr-3>
          <v-menu
            v-model="showMaterial"
            :close-on-content-click="false"
            :nudge-width="70"
            :nudge-bottom="10"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                round
                v-on="on"
                :flat="!matSubmit"
                :outline="!matSubmit"
              >Material</v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-radio-group v-model="matSelect" :mandatory="false">
                  <v-radio v-for="t in furnMaterial" :key="t" :label="`${t}`" :value="t"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  :value="submit"
                  flat
                  small
                  @click="applyFilter('material')"
                >Apply Material</v-btn>
                <v-btn
                  color="error"
                  :value="submit"
                  flat
                  small
                  @click="clearFilter('material')"
                >Clear</v-btn>
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
export default class FilterBar extends Vue {
  @Prop()
  search!: string;

  furnType = ["Bed", "Chair", "Couch", "Table", "Dresser"];
  furnStatus = ["Donor", "On Truck", "Shed", "Delivered", "Unknown"];
  furnMaterial = ["Wood", "Glass", "Metal", "Plastic"];

  showTypes = false;
  showStatus = false;
  showMaterial = false;

  typeSelect = "";
  statusSelect = "";
  matSelect = "";

  typeSubmit = false;
  statusSubmit = false;
  matSubmit = false;

  // TODO: Should only apply if a value is selected
  applyFilter(btn: string) {
    if (btn == "type") {
      this.typeSubmit = true;
    } else if (btn == "status") {
      this.statusSubmit = true;
    } else if (btn == "material") {
      this.matSubmit = true;
    }
    let filters: { [key: string]: string } = {};
    filters["type"] = this.typeSelect.toLowerCase().trim();
    filters["status"] = this.statusSelect.toLowerCase().trim();
    filters["material"] = this.matSelect.toLowerCase().trim();
    this.$emit("filter", filters);
    // TODO: Modify search function so works with stacked filters and ignores whitespace
  }

  // TODO: Add clear all filters button
  clearFilter(btn: string) {
    if (btn == "type") {
      this.typeSubmit = false;
      this.typeSelect = "";
    } else if (btn == "status") {
      this.statusSubmit = false;
      this.statusSelect = "";
    } else if (btn == "material") {
      this.matSubmit = false;
      this.matSelect = "";
    }
    let filters: { [key: string]: string } = {};
    filters["type"] = this.typeSelect.toLowerCase().trim();
    filters["status"] = this.statusSelect.toLowerCase().trim();
    filters["material"] = this.matSelect.toLowerCase().trim();
    this.$emit("clear", filters);
  }
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
