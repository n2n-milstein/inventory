import { Furniture } from "@/data/Furniture";
import { InventoryState, mutation } from "./types";

const mutations = {
  [mutation.CLEAR_INVENTORY](state: InventoryState): void {
    state.inventory = [];
  },
  [mutation.SET_CURRENT](
    state: InventoryState,
    { item }: { item: Furniture },
  ): void {
    state.current = item;
  },
  [mutation.CLEAR_CURRENT](state: InventoryState): void {
    state.current = null;
  },
  [mutation.UPDATE_CURRENT](
    state: InventoryState,
    { updates }: { updates: Partial<Furniture> },
  ): void {
    state.current = state.current ? { ...state.current, ...updates } : null;
  },
  [mutation.ADD_UPDATES](
    state: InventoryState,
    { updates }: { updates: Partial<Furniture> },
  ): void {
    state.currentUpdates = { ...state.currentUpdates, ...updates };
  },
  [mutation.CLEAR_UPDATES](state: InventoryState): void {
    state.currentUpdates = {};
  },
  [mutation.SET_SELECTED](
    state: InventoryState,
    { list }: { list: Furniture[] },
  ): void {
    state.selected = list;
  },
  [mutation.CLEAR_SELECTED](state: InventoryState): void {
    state.selected = [];
  },
  [mutation.ADD_SELECTED](
    state: InventoryState,
    { item }: { item: Furniture },
  ): void {
    state.selected.push(item);
  },
};

export default mutations;
