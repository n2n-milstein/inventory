import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { archiveItem } from "@/network/inventory-service";
import { Furniture } from "@/data/Furniture";
import { CollectionState, mutation } from "../types";

export const actions: ActionTree<CollectionState, RootState> = {
  archiveItems({ commit, state }): void {
    try {
      state.selected.forEach(async (item: Furniture) => {
        await archiveItem(item.id);
      });
      commit(mutation.CLEAR_SELECTED);
    } catch (e) {
      console.log("archiveItems error: ", e);
    }
  },
};

export default actions;
