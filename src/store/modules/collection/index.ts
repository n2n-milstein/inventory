import { Furniture } from "@/data/Furniture";
import collections from "@/network/collections";
import { Module, ActionTree } from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import { CollectionState } from "./types";
import { RootState } from "../../types";

export const state: CollectionState = {
  collection: null,
  items: [] as Furniture[],
  selected: [] as Furniture[],
  current: null,
  currentUpdates: {},
};

export default function createCollectionModule(
  collection: collections,
  moduleActions?: ActionTree<CollectionState, RootState>,
): Module<CollectionState, RootState> {
  return {
    namespaced: true,
    state: (): CollectionState => ({ ...state, collection }),
    getters,
    actions: { ...actions, ...moduleActions },
    mutations,
  };
}
