/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
import { Furniture } from "@/data/Furniture";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import { InventoryState } from "./types";

export const state: () => InventoryState = () => ({
  inventory: [] as Furniture[],
  archive: [] as Furniture[],
  selected: [] as Furniture[],
  current: null,
  currentUpdates: {},
});

const inventory = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default inventory;
