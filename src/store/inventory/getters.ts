/* eslint no-shadow: ["error", { "allow": ["getters"] }] */
import { Furniture } from "@/data/Furniture";
import { InventoryState } from "./types";

const getters = {
  getInventory: (state: InventoryState): Furniture[] => state.inventory,
  getArchive: (state: InventoryState): Furniture[] => state.archive,
  getSelected: (state: InventoryState): Furniture[] => state.selected,
  getCurrent: (state: InventoryState): Furniture | null => state.current,
  getCurrentUpdates: (state: InventoryState): Partial<Furniture> =>
    state.currentUpdates,
  getUpdatesLength: (state: InventoryState): number =>
    Object.keys(state.currentUpdates).length,
  getItem: (state: InventoryState) => (id: string): Furniture | undefined =>
    state.inventory.find((item: Furniture) => item.id === id),
  getItemIndex: (state: InventoryState, getters: any) => (
    id: string,
  ): number => {
    const item: Furniture = getters.getItem(state, id);
    return state.inventory.indexOf(item);
  },
};

export default getters;
