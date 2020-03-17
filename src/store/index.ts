import Vue from "vue";
import Vuex from "vuex";
import { Furniture } from "@/data/Furniture";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: { inventory: [] as Furniture[] },
  getters: { getInventory: (state): Furniture[] => state.inventory },
  mutations: {
    clearInventory(state): void {
      state.inventory = [];
    },
    setInventory(state, payload): void {
      state.inventory = payload.list as Furniture[];
    },
    pushInventory(state, payload): void {
      state.inventory.push(payload.item as Furniture);
    },
  },
  actions: {
    setInventory({ commit }, payload): void {
      commit("setInventory", payload);
    },
    pushInventory({ commit }, payload): void {
      commit("pushInventory", payload);
    },
  },
});

export default store;
