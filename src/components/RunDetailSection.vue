<template>
  <v-card class="mb-4">
    <v-card-title>
      {{ itemsLength }}
      {{ itemsLength === 1 ? title.slice(0, title.length - 1) : title }}
    </v-card-title>
    <v-card-text>
      <v-list three-line>
        <div v-if="itemsLength === 0">
          No {{ title.toLowerCase() }} available.
        </div>
        <v-list-item v-else v-for="it in items" :key="it.id" @click="show(it)">
          <v-list-item-icon>
            <v-icon v-if="type === 'volunteer'">
              {{ it.role === "Driver" ? "drive_eta" : "person" }}
            </v-icon>
            <furniture-class-v-icon v-if="type === 'furniture'" :item="it" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span v-if="type === 'volunteer'">
                {{ it.role }} - {{ it.name }}
              </span>
              <span v-if="type === 'furniture'">
                {{ it.donor.address }}
              </span>
            </v-list-item-title>
            <span v-if="type === 'volunteer'">
              {{ it.address }}<br />{{ it.phone }}
            </span>
            <span v-if="type === 'furniture'">
              {{ it.donor.name }} ({{ it.donor.phone }})<br />
              {{ it.physical.class }}
            </span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import FurnitureClassVIcon from "@/components/FurnitureClassVIcon.vue";

@Component({ components: { FurnitureClassVIcon } })
export default class RunDetailSection extends Vue {
  @Prop()
  readonly items!: any;

  @Prop({ default: "Default" })
  readonly title!: string;

  get type(): string {
    if (this.items[0] !== undefined) {
      return "volunteer";
    }
    if (this.items[Object.keys(this.items)[0]].status !== undefined) {
      return "furniture";
    }
    return "unknown";
  }

  get itemsLength(): number {
    if (this.type === "volunteer") return this.items.length;
    if (this.type === "furniture") return Object.keys(this.items).length;
    return 0;
  }

  show(item: any): void {
    if (this.type === "furniture") this.$emit("show", item);
  }
}
</script>
