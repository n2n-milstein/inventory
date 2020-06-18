import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { Furniture } from "@/data/Furniture";
import { unarchiveItem, deleteItem } from "@/network/archive-service";
import { CollectionState, mutation } from "../types";

export const actions: ActionTree<CollectionState, RootState> = {
  async unarchiveCurrent({ commit, state }): Promise<void> {
    try {
      await unarchiveItem(state.current!.id);
      commit(mutation.CLEAR_CURRENT);
    } catch (e) {
      console.error("unarchiveCurrent error:", e);
    }
  },
  unarchiveSelected({ commit, state }): void {
    try {
      state.selected.forEach(async (item: Furniture) => {
        await unarchiveItem(item.id);
      });
      commit(mutation.CLEAR_SELECTED);
    } catch (e) {
      console.error("unarchiveSelected error:", e);
    }
  },
  async deleteCurrent({ commit, state }): Promise<void> {
    try {
      await deleteItem(state.current!.id);
      commit(mutation.CLEAR_CURRENT);
    } catch (e) {
      console.error("deleteCurrent error:", e);
    }
  },
  deleteSelected({ commit, state }): void {
    try {
      state.selected.forEach(async (item: Furniture) => {
        await deleteItem(item.id);
      });
      commit(mutation.CLEAR_SELECTED);
    } catch (e) {
      console.error("deleteSelected error:", e);
    }
  },
};

export default actions;
