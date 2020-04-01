import { Furniture } from "@/data/Furniture";

export interface InventoryState {
  inventory: Furniture[];
  current?: Furniture;
  selected: Furniture[];
}

export enum types {
  CLEAR_INVENTORY = "CLEAR_INVENTORY",
}
