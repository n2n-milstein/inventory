import { Furniture } from "@/data/Furniture";
import { MutationTree } from "vuex";
import { CollectionState, mutation } from "./types";

const mutations: MutationTree<CollectionState> = {
  [mutation.CLEAR_INVENTORY](state): void {
    state.items = [];
  },
  [mutation.SET_CURRENT](state, { item }: { item: Furniture }): void {
    state.current = item;
  },
  [mutation.CLEAR_CURRENT](state): void {
    state.current = null;
  },
  [mutation.UPDATE_CURRENT](
    state,
    { updates }: { updates: Partial<Furniture> },
  ): void {
    state.current = state.current ? { ...state.current, ...updates } : null;
  },
  [mutation.ADD_UPDATES](
    state,
    { updates }: { updates: Partial<Furniture> },
  ): void {
    state.currentUpdates = { ...state.currentUpdates, ...updates };
  },
  [mutation.CLEAR_UPDATES](state): void {
    state.currentUpdates = {};
  },
  [mutation.SET_SELECTED](state, { list }: { list: Furniture[] }): void {
    state.selected = list;
  },
  [mutation.CLEAR_SELECTED](state): void {
    state.selected = [];
  },
  [mutation.ADD_SELECTED](state, { item }: { item: Furniture }): void {
    state.selected.push(item);
  },
};

export default mutations;
