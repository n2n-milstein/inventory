import Vue from "vue";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import Vuex from "vuex";
import { Furniture } from "@/data/Furniture";
import db from "@/network/db";
import Collections from "@/network/collections";

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
    clearInventory(state): void {
      state.inventory = [];
    },
    // TODO: remove mutations and actions that change the local store (for unidirectional flow)
    setInventory(state, { list }): void {
      state.inventory = list as Furniture[];
    },
    updateItem(state, { newItem }): void {
      state.inventory.map((item) => (item.id === newItem.id ? newItem : item));
    },
    ...vuexfireMutations,
  },
  actions: {
    setInventory({ commit }, { list }): void {
      commit("setInventory", { list });
    },
    bindInventory: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        "inventory",
        db.collection(Collections.INVENTORY),
      );
    }),
    unbindInventory: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("inventory");
    }),
  },
});

export default store;
