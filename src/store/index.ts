import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { vuexfireMutations } from "vuexfire";
import collections from "@/network/collections";
import { RootState } from "./types";
import createCollectionModule from "./collection";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: () => ({ version: "0.3" }),
  mutations: { ...vuexfireMutations },
  modules: {
    inventory: createCollectionModule(collections.INVENTORY),
    archive: createCollectionModule(collections.ARCHIVE),
  },
  strict: process.env.NODE_ENV !== "production",
};

export default new Vuex.Store<RootState>(store);
