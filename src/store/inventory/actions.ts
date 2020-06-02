import { firestoreAction } from "vuexfire";
import db from "@/network/db";
import FirestoreService from "@/network/firestore-service";
import { archiveItem } from "@/network/inventory-service";
import collections from "@/network/collections";
import { Furniture } from "@/data/Furniture";
import { mutation } from "./types";

const actions = {
  setCurrent({ commit }: any, { item }: { item: Furniture }): void {
    commit(mutation.SET_CURRENT, { item });
  },
  clearCurrent({ commit }: any): void {
    commit(mutation.CLEAR_UPDATES);
    commit(mutation.CLEAR_CURRENT);
  },
  updateCurrent(
    { commit }: any,
    { updates }: { updates: Partial<Furniture> },
  ): void {
    commit(mutation.ADD_UPDATES, { updates });
  },
  clearUpdates({ commit }: any): void {
    commit(mutation.CLEAR_UPDATES);
  },
  async commitUpdates(
    { commit, state }: any,
    { collection }: { collection: collections },
  ): Promise<void> {
    try {
      const service = new FirestoreService(collection);
      commit(mutation.UPDATE_CURRENT, { updates: state.currentUpdates });
      await service.updateItem(state.current.id, state.currentUpdates);
      commit(mutation.CLEAR_UPDATES);
    } catch (e) {
      console.log("commitUpdates error: ", e);
    }
  },
  setSelected({ commit }: any, { list }: { list: Furniture[] }): void {
    commit(mutation.SET_SELECTED, { list });
  },
  clearSelected({ commit }: any): void {
    commit(mutation.CLEAR_SELECTED);
  },
  addSelected({ commit }: any, { item }: { item: Furniture }): void {
    commit(mutation.ADD_SELECTED, { item });
  },
  archiveItems({ commit, state }: any): void {
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
