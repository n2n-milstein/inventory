import { MutationTree } from "vuex";
import { Furniture } from "@/data/Furniture";
import { InventoryState, types } from "./types";

const mutations: MutationTree<InventoryState> = {
  [types.CLEAR_INVENTORY](state: InventoryState): void {
    state.inventory = [];
  },
  [types.SET_CURRENT](
    state: InventoryState,
    { item }: { item: Furniture },
  ): void {
    state.current = item;
  },
  [types.CLEAR_CURRENT](state: InventoryState): void {
    state.current = null;
  },
  [types.UPDATE_CURRENT](
    state: InventoryState,
    { updates }: { updates: Partial<Furniture> },
  ): void {
    state.current = state.current ? { ...state.current, ...updates } : null;
  },
  [types.ADD_UPDATES](
    state: InventoryState,
    { updates }: { updates: Partial<Furniture> },
  ): void {
    state.currentUpdates = { ...state.currentUpdates, ...updates };
  },
  [types.CLEAR_UPDATES](state: InventoryState): void {
    state.currentUpdates = {};
  },
  [types.SET_SELECTED](
    state: InventoryState,
    { list }: { list: Furniture[] },
  ): void {
    state.selected = list;
  },
  [types.CLEAR_SELECTED](state: InventoryState): void {
    state.selected = [];
  },
  [types.ADD_SELECTED](
    state: InventoryState,
    { item }: { item: Furniture },
  ): void {
    state.selected.push(item);
  },
};

export default mutations;
