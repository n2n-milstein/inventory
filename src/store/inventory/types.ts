import { Furniture } from "@/data/Furniture";

export interface InventoryState {
  inventory: Furniture[];
  current?: Furniture;
  selected: Furniture[];
}

export enum types {
  CLEAR_INVENTORY = "CLEAR_INVENTORY",
  SET_CURRENT = "SET_CURRENT",
  CLEAR_CURRENT = "CLEAR_CURRENT",
  SET_SELECTED = "SET_SELECTED",
  CLEAR_SELECTED = "CLEAR_SELECTED",
  ADD_SELECTED = "ADD_SELECTED",
}
