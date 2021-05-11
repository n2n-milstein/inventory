import { firestoreAction } from "vuexfire";
import { db } from "@/network/firebase";
import FirestoreService from "@/network/firestore-service";
import { Furniture, Status } from "@/data/Furniture";
import { ActionTree } from "vuex";
import { furnitureConverter } from "@/network/converters";
import { CollectionState, mutation, action } from "./types";
import { RootState } from "../../types";

const actions: ActionTree<CollectionState, RootState> = {
  [action.SET_CURRENT]({ commit }, { item }: { item: Furniture }): void {
    commit(mutation.SET_CURRENT, { item });
  },
  [action.CLEAR_CURRENT]({ commit }): void {
    commit(mutation.CLEAR_UPDATES);
    commit(mutation.CLEAR_CURRENT);
  },
  async [action.EXPORT_CURRENT]({ state }): Promise<void> {
    try {
      const service = new FirestoreService(state.collection!);
      await service.exportItems([state.current!.id]);
    } catch (e) {
      console.error("exportCurrent error:", e);
    }
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
  async [action.COMMIT_UPDATES]({ commit, state }): Promise<void> {
    try {
      const service = new FirestoreService(state.collection!);
      commit(mutation.UPDATE_CURRENT, { updates: state.currentUpdates });
      commit(mutation.CLEAN_CURRENT);
      await service.updateItem(state.current!.id, state.currentUpdates);
      commit(mutation.CLEAR_UPDATES);
    } catch (e) {
      console.error("commitUpdates error:", e);
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
  async [action.EXPORT_SELECTED]({ state }): Promise<void> {
    try {
      const service = new FirestoreService(state.collection!);
      await service.exportItems(state.selected.map((item) => item.id));
    } catch (e) {
      console.error("exportSelected error:", e);
    }
  },
  [action.BIND_ITEMS]: firestoreAction<CollectionState, RootState>(
    ({ bindFirestoreRef, state }) => {
      return bindFirestoreRef(
        "items",
        db.collection(state.collection!).withConverter(furnitureConverter),
      );
    },
  ),
  [action.UNBIND_ITEMS]: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("items");
  }),
  [action.UPDATE_SELECTED_STATUS](
    { state },
    { status }: { status: Status },
  ): void {
    try {
      const service = new FirestoreService(state.collection!);
      state.selected.map(async (furniture) => {
        await service.updateItem(furniture.id, { status });
      });
    } catch (e) {
      console.error("updateSelectedStatus error:", e);
    }
  },
};

export default actions;
