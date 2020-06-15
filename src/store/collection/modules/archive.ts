import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { Furniture } from "@/data/Furniture";
import { unarchiveItem } from "@/network/archive-service";
import { CollectionState, mutation } from "../types";

export const actions: ActionTree<CollectionState, RootState> = {
  unarchiveItems({ commit, state }): void {
    try {
      state.selected.forEach(async (item: Furniture) => {
        await unarchiveItem(item.id);
      });
      commit(mutation.CLEAR_SELECTED);
    } catch (e) {
      console.log("archiveItems error: ", e);
    }
  },
};

export default actions;
