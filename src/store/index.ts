import Vue from "vue";
import Vuex from "vuex";
import { Furniture } from "@/data/Furniture";

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
    setInventory(state, { list }): void {
      state.inventory = list as Furniture[];
    },
    pushInventory(state, { item }): void {
      state.inventory.push(item as Furniture);
    },
    updateItem(state, { index, newItem }): void {
      state.inventory[index] = newItem;
    },
  },
  actions: {
    setInventory({ commit }, { list }): void {
      commit("setInventory", { list });
    },
    pushInventory({ commit }, { item }): void {
      commit("pushInventory", { item });
    },
    updateItem({ commit, getters }, { newItem }): void {
      const index = getters.getItemIndex(newItem.id);
      commit("updateItem", { index, newItem });
    },
  },
});

export default store;
