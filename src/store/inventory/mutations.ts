import { MutationTree } from "vuex";
import { InventoryState, types } from "./types";

const mutations: MutationTree<InventoryState> = {
  [types.CLEAR_INVENTORY](state: InventoryState): void {
    state.inventory = [];
  },
};

export default mutations;
