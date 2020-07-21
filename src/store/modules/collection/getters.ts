/* eslint no-shadow: ["error", { "allow": ["getters"] }] */
import { Furniture } from "@/data/Furniture";
import { GetterTree } from "vuex";
import { CollectionState, getter } from "./types";
import { RootState } from "../../types";

const getters: GetterTree<CollectionState, RootState> = {
  [getter.GET_ITEMS]: (state): Furniture[] => state.items,
  [getter.GET_SELECTED]: (state): Furniture[] => state.selected,
  [getter.GET_CURRENT]: (state): Furniture | null => state.current,
  [getter.GET_CURRENT_UPDATES]: (state): Partial<Furniture> =>
    state.currentUpdates,
  [getter.GET_UPDATES_LENGTH]: (state): number =>
    Object.keys(state.currentUpdates).length,
  [getter.GET_ITEM]: (state) => (id: string): Furniture | undefined =>
    state.items.find((item: Furniture) => item.id === id),
  [getter.GET_ITEM_INDEX]: (state, getters) => (id: string): number => {
    const item: Furniture = getters.getItem(state, id);
    return state.items.indexOf(item);
  },
};

export default getters;
