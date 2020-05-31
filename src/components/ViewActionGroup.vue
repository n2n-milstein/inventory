<template>
  <v-tooltip bottom :disabled="!disabled">
    <template v-slot:activator="{ on: disable }">
      <div v-on="{ ...disable }">
        <v-menu v-for="action in actions" offset-y :key="action.emit">
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom :disabled="disabled">
              <template v-slot:activator="{ on: tooltip }">
                <v-btn icon v-on="{ ...tooltip, ...menu }" v-if="action.menu">
                  <v-icon>{{ action.icon }}</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  icon
                  v-on="{ ...tooltip }"
                  @click="$emit(action.emit)"
                  :disabled="disabled"
                  :loading="action.emit === 'download' && downloading"
                >
                  <!-- TODO: abstract this loading -->
                  <v-icon>{{ action.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ action.desc }}</span>
            </v-tooltip>
          </template>
          <v-list v-if="action.menu">
            <v-list-item
              v-for="item in action.menu"
              :key="item.emit"
              @click="$emit(item.emit)"
            >
              <v-list-item-icon>
                <v-icon right>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.desc }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
    <span>{{ disabledMessage }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ViewAction from "@/data/ViewAction";
import { Prop } from "vue-property-decorator";

@Component
export default class ViewActionGroup extends Vue {
  @Prop({})
  readonly actions!: ViewAction[];

  @Prop({ default: false })
  readonly disabled!: boolean;

  @Prop({ default: "" })
  readonly disabledMessage!: string;

  @Prop({ default: false })
  readonly downloading!: boolean;
}
</script>
