import { Furniture } from "@/data/Furniture";

export interface InventoryState {
  inventory: Furniture[];
}

export enum types {
  CLEAR_INVENTORY = "CLEAR_INVENTORY",
}
