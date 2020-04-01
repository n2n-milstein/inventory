/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
import { Module } from "vuex";
import { Furniture } from "@/data/Furniture";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import { InventoryState } from "./types";
import { RootState } from "../types";

export const state: InventoryState = {
  inventory: [] as Furniture[],
  selected: [] as Furniture[],
  current: undefined,
};

const inventory: Module<InventoryState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default inventory;
