import { Furniture } from "@/data/Furniture";
import collections from "@/network/collections";

export interface CollectionState {
  collection: collections | null;
  items: Furniture[];
  current: Furniture | null;
  selected: Furniture[];
  currentUpdates: Partial<Furniture>;
}

export enum getter {
  GET_ITEMS = "getItems",
  GET_SELECTED = "getSelected",
  GET_CURRENT = "getCurrent",
  GET_CURRENT_UPDATES = "getCurrentUpdates",
  GET_UPDATES_LENGTH = "getUpdatesLength",
  GET_ITEM = "getItem",
  GET_ITEM_INDEX = "getItemIndex",
}

export enum mutation {
  CLEAR_INVENTORY = "CLEAR_INVENTORY",
  SET_CURRENT = "SET_CURRENT",
  CLEAR_CURRENT = "CLEAR_CURRENT",
  UPDATE_CURRENT = "UPDATE_CURRENT",
  ADD_UPDATES = "ADD_UPDATES",
  CLEAR_UPDATES = "CLEAR_UPDATES",
  SET_SELECTED = "SET_SELECTED",
  CLEAR_SELECTED = "CLEAR_SELECTED",
  ADD_SELECTED = "ADD_SELECTED",
}

export enum action {
  SET_CURRENT = "setCurrent",
  CLEAR_CURRENT = "clearCurrent",
  UPDATE_CURRENT = "updateCurrent",
  CLEAR_UPDATES = "clearUpdates",
  COMMIT_UPDATES = "commitUpdates",
  SET_SELECTED = "setSelected",
  CLEAR_SELECTED = "clearSelected",
  ADD_SELECTED = "addSelected",
  BIND_ITEMS = "bindItems",
  UNBIND_ITEMS = "unbindItems",
}
