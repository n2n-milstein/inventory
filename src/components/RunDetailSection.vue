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
            <v-icon v-if="variant === 'volunteer'">
              {{ it.role === "Driver" ? "drive_eta" : "person" }}
            </v-icon>
            <furniture-class-v-icon
              v-if="variant === 'pickup' || variant === 'dropoff'"
              :item="it"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span v-if="variant === 'volunteer'">
                {{ it.role }} - {{ it.name }}
              </span>
              <span v-if="variant === 'pickup'">
                {{ it.donor.address }}
              </span>
              <span v-if="variant === 'dropoff'">
                {{ clients[it.clientId].clientAddress }}
              </span>
            </v-list-item-title>
            <span v-if="variant === 'volunteer'">
              {{ it.address }}<br />{{ it.phone }}
            </span>
            <span v-if="variant === 'pickup'">
              <span class="font-weight-medium">Donor</span>:
              {{ it.donor.name }} ({{ it.donor.phone }})
              <br />
              <span class="font-weight-medium">Item</span>:
              {{ it.physical.class }}
            </span>
            <span v-if="variant === 'dropoff'">
              <span class="font-weight-medium">Client</span>:
              {{ clients[it.clientId].clientName }}
              ({{ clients[it.clientId].clientPhone }})
              <br />
              <span class="font-weight-medium">Item</span>:
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
import Client from "@/data/Client";

@Component({ components: { FurnitureClassVIcon } })
export default class RunDetailSection extends Vue {
  @Prop()
  readonly items!: any;

  @Prop()
  readonly clients!: { [clientId: string]: Client };

  @Prop({ default: "Default" })
  readonly title!: string;

  @Prop({ default: "unknown" })
  readonly variant!: "volunteer" | "pickup" | "dropoff" | "unknown";

  get itemsLength(): number {
    if (this.variant === "volunteer") return this.items.length;
    if (this.variant === "pickup") return Object.keys(this.items).length;
    return 0;
  }

  show(item: any): void {
    if (this.variant === "pickup" || this.variant === "dropoff")
      this.$emit("show", item);
  }
}
</script>
