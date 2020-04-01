import { ActionTree } from "vuex";
import { firestoreAction } from "vuexfire";
import db from "@/network/db";
import collections from "@/network/collections";
import { Furniture } from "@/data/Furniture";
import { InventoryState, types } from "./types";
import { RootState } from "../types";

const actions: ActionTree<InventoryState, RootState> = {
  setCurrent({ commit }, { item }: { item: Furniture }) {
    commit(types.SET_CURRENT, { item });
  },
  clearCurrent({ commit }) {
    commit(types.CLEAR_CURRENT);
  },
  setSelected({ commit }, { list }: { list: Furniture[] }) {
    commit(types.SET_SELECTED, { list });
  },
  clearSelected({ commit }) {
    commit(types.CLEAR_SELECTED);
  },
  addSelected({ commit }, { item }: { item: Furniture }) {
    commit(types.ADD_SELECTED, { item });
  },
  bindInventory: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("inventory", db.collection(collections.INVENTORY));
  }),
  unbindInventory: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("inventory");
  }),
};

export default actions;
