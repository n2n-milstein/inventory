<template>
  <v-container>
    <v-row>
      <v-col>
        <admin-dialog collection="furniture" />
        <admin-dialog collection="rejected" />
        <admin-dialog collection="pending" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-dialog v-model="dialog" width="750" scrollable>
          <template v-slot:activator="{ on: edit }">
            <v-btn v-on="{ ...edit }">
              Show Edit Dialog
            </v-btn>
          </template>
          <edit-card />
        </v-dialog>
        <v-switch v-model="showEditCard" label="Show Edit Card" />
        <edit-card v-if="showEditCard" />
      </v-col>
    </v-row>

    <v-switch v-model="showStoreCmp" label="Show Store Comparison" />

    <v-row v-if="showStoreCmp">
      <v-col>
        <v-btn @click="updateSample()">
          Update sample
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="showStoreCmp">
      <v-col cols="6">
        <pre>{{ sample }}</pre>
      </v-col>
      <v-col cols="6">
        <pre>{{ compare }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AdminDialog from "@/components/AdminDialog.vue";
import EditCard from "@/components/EditCard.vue";
import { Furniture } from "@/data/Furniture";
import { updateItem } from "@/network/inventoryService";

@Component({ components: { AdminDialog, EditCard } })
export default class Admin extends Vue {
  dialog = false;

  showEditCard = false;

  showStoreCmp = true;

  /**
   * Computed property for getting inventory from store.
   */
  get inventory(): Furniture[] {
    return this.$store.getters.getInventory;
  }

  /**
   * Computed property for an item in the inventory.
   */
  get sample(): Furniture {
    return this.inventory[2];
  }

  /**
   * Computed property that gets the same item as `sample` but using a Vuex
   * store getter.
   */
  get compare(): Furniture {
    return this.$store.getters.getItem(this.sample.id);
  }

  /**
   * Called when component is mounted (lifecycle hook); binds inventory to
   * Firestore.
   */
  mounted(): void {
    this.$store.dispatch({ type: "bindInventory" });
  }

  /**
   * Updates sample using the inventory service.
   */
  updateSample(): void {
    updateItem(this.sample.id, {
      attributes: {
        ...this.sample.attributes,
        bedbugFree: !this.sample.attributes.bedbugFree,
      },
    }).then(() => {
      console.log(`Successfully updated ${this.sample.id}`);
    });
  }
}
</script>

<style lang="scss">
pre {
  white-space: pre-wrap;
  word-break: keep-all;
}
</style>
