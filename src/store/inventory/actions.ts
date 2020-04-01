import { ActionTree } from "vuex";
import { firestoreAction } from "vuexfire";
import db from "@/network/db";
import collections from "@/network/collections";
import { InventoryState } from "./types";
import { RootState } from "../types";

const actions: ActionTree<InventoryState, RootState> = {
  bindInventory: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("inventory", db.collection(collections.INVENTORY));
  }),
  unbindInventory: firestoreAction(({ unbindFirestoreRef }) => {
    unbindFirestoreRef("inventory");
  }),
};

export default actions;
