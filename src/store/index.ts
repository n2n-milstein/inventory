import Vue from "vue";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import Vuex from "vuex";
import { Furniture } from "@/data/Furniture";
import db from "@/network/db";
import collections from "@/network/collections";
import types from "./mutation-types";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: { inventory: [] as Furniture[] },
  getters: {
    getInventory: (state): Furniture[] => state.inventory,
    getItem: (state) => (id: string): Furniture | undefined =>
      state.inventory.find((item) => item.id === id),
    getItemIndex: (state, getters) => (id: string): number => {
      const item: Furniture = getters.getItem(state, id);
      return state.inventory.indexOf(item);
    },
  },
  mutations: {
    [types.CLEAR_INVENTORY](state): void {
      state.inventory = [];
    },
    ...vuexfireMutations,
  },
  actions: {
    bindInventory: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        "inventory",
        db.collection(collections.INVENTORY),
      );
    }),
    unbindInventory: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("inventory");
    }),
  },
});

export default store;
