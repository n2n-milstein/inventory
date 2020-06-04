import { firestoreAction } from "vuexfire";
import db from "@/network/db";
import FirestoreService from "@/network/firestore-service";
import { archiveItem } from "@/network/inventory-service";
import collections from "@/network/collections";
import { Furniture } from "@/data/Furniture";
import { ActionTree } from "vuex";
import { CollectionState, mutation, action } from "./types";
import { RootState } from "../types";

const actions: ActionTree<CollectionState, RootState> = {
  [action.SET_CURRENT]({ commit }, { item }: { item: Furniture }): void {
    commit(mutation.SET_CURRENT, { item });
  },
  [action.CLEAR_CURRENT]({ commit }): void {
    commit(mutation.CLEAR_UPDATES);
    commit(mutation.CLEAR_CURRENT);
  },
  [action.UPDATE_CURRENT](
    { commit },
    { updates }: { updates: Partial<Furniture> },
  ): void {
    commit(mutation.ADD_UPDATES, { updates });
  },
  [action.CLEAR_UPDATES]({ commit }): void {
    commit(mutation.CLEAR_UPDATES);
  },
  async [action.COMMIT_UPDATES](
    { commit, state },
    { collection }: { collection: collections },
  ): Promise<void> {
    try {
      const service = new FirestoreService(collection);
      commit(mutation.UPDATE_CURRENT, { updates: state.currentUpdates });
      await service.updateItem(state.current!.id, state.currentUpdates);
      commit(mutation.CLEAR_UPDATES);
    } catch (e) {
      console.log("commitUpdates error: ", e);
    }
  },
  [action.SET_SELECTED]({ commit }, { list }: { list: Furniture[] }): void {
    commit(mutation.SET_SELECTED, { list });
  },
  [action.CLEAR_SELECTED]({ commit }): void {
    commit(mutation.CLEAR_SELECTED);
  },
  [action.ADD_SELECTED]({ commit }, { item }: { item: Furniture }): void {
    commit(mutation.ADD_SELECTED, { item });
  },
  [action.ARCHIVE_ITEMS]({ commit, state }): void {
    try {
      state.selected.forEach(async (item: Furniture) => {
        await archiveItem(item.id);
      });
      commit(mutation.CLEAR_SELECTED);
    } catch (e) {
      console.log("archiveItems error: ", e);
    }
  },
  [action.BIND_ITEMS]: firestoreAction<CollectionState, RootState>(
    ({ bindFirestoreRef, state }) => {
      return bindFirestoreRef("items", db.collection(state.collection!));
    },
  ),
  [action.UNBIND_ITEMS]: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("items");
  }),
};

export default actions;
