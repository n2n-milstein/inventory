import { ActionTree } from "vuex";
import { firestoreAction } from "vuexfire";
import db from "@/network/db";
import FirestoreService from "@/network/firestore-service";
import { archiveItem } from "@/network/inventory-service";
import collections from "@/network/collections";
import { Furniture } from "@/data/Furniture";
import { InventoryState, mutation } from "./types";
import { RootState } from "../types";

const actions: ActionTree<InventoryState, RootState> = {
  setCurrent({ commit }, { item }: { item: Furniture }) {
    commit(mutation.SET_CURRENT, { item });
  },
  clearCurrent({ commit }) {
    commit(mutation.CLEAR_UPDATES);
    commit(mutation.CLEAR_CURRENT);
  },
  updateCurrent({ commit }, { updates }: { updates: Partial<Furniture> }) {
    commit(mutation.ADD_UPDATES, { updates });
  },
  clearUpdates({ commit }) {
    commit(mutation.CLEAR_UPDATES);
  },
  async commitUpdates(
    { commit, state },
    { collection }: { collection: collections },
  ) {
    try {
      const service = new FirestoreService(collection);
      commit(mutation.UPDATE_CURRENT, { updates: state.currentUpdates });
      await service.updateItem(state.current!.id, state.currentUpdates);
      commit(mutation.CLEAR_UPDATES);
    } catch (e) {
      console.log("commitUpdates error: ", e);
    }
  },
  setSelected({ commit }, { list }: { list: Furniture[] }) {
    commit(mutation.SET_SELECTED, { list });
  },
  clearSelected({ commit }) {
    commit(mutation.CLEAR_SELECTED);
  },
  addSelected({ commit }, { item }: { item: Furniture }) {
    commit(mutation.ADD_SELECTED, { item });
  },
  archiveItems({ commit, state }) {
    try {
      state.selected.forEach(async (item: Furniture) => {
        await archiveItem(item.id);
      });
      commit(mutation.CLEAR_SELECTED);
    } catch (e) {
      console.log("archiveItems error: ", e);
    }
  },
  bindInventory: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("inventory", db.collection(collections.INVENTORY));
  }),
  unbindInventory: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("inventory");
  }),
  bindArchive: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("archive", db.collection(collections.ARCHIVE));
  }),
  unbindArchive: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("archive");
  }),
};

export default actions;
