import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { archiveItem, addItem } from "@/network/inventory-service";
import { Furniture } from "@/data/Furniture";
import { CollectionState, mutation } from "./collection/types";

export const actions: ActionTree<CollectionState, RootState> = {
  async archiveCurrent({ commit, state }): Promise<void> {
    try {
      await archiveItem(state.current!.id);
      commit(mutation.CLEAR_CURRENT);
    } catch (e) {
      console.error("archiveCurrent error:", e);
    }
  },
  archiveSelected({ commit, state }): void {
    try {
      state.selected.forEach(async (item: Furniture) => {
        await archiveItem(item.id);
      });
      commit(mutation.CLEAR_SELECTED);
    } catch (e) {
      console.error("archiveSelected error:", e);
    }
  },
  async commitAddItem({ commit, state }): Promise<void> {
    try {
      commit(mutation.UPDATE_CURRENT, { updates: state.currentUpdates });
      commit(mutation.CLEAN_CURRENT);
      await addItem(state.current!);
      commit(mutation.CLEAR_UPDATES);
    } catch (e) {
      console.error("addItem error:", e);
    }
  },
};

export default actions;
