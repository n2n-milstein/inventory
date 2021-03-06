import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { vuexfireMutations } from "vuexfire";
import collections from "@/network/collections";
import { RootState } from "./types";
import createCollectionModule from "./modules/collection";
import { actions as inventoryActions } from "./modules/inventory";
import { actions as archiveActions } from "./modules/archive";
import { runDetailModule } from "./modules/run-detail";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: () => ({ version: "0.5" }),
  mutations: { ...vuexfireMutations },
  modules: {
    inventory: createCollectionModule(collections.INVENTORY, inventoryActions),
    archive: createCollectionModule(collections.ARCHIVE, archiveActions),
    "run-preview": createCollectionModule(collections.RUNS),
    "run-detail": runDetailModule,
  },
  strict: process.env.NODE_ENV !== "production",
};

export default new Vuex.Store<RootState>(store);
