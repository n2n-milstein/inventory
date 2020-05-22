import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { vuexfireMutations } from "vuexfire";
import inventory from "./inventory";
import { RootState } from "./types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: { version: "0.2" },
  mutations: { ...vuexfireMutations },
  modules: { inventory },
  strict: process.env.NODE_ENV !== "production",
};

export default new Vuex.Store<RootState>(store);
