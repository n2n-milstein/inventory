/* eslint-disable no-param-reassign */
import Client from "@/data/Client";
import collections from "@/network/collections";
import { Module } from "vuex";
import { CollectionState, getter, mutation, action } from "./types";
import { RootState } from "../../types";

export const state: CollectionState = {
  collection: collections.CLIENTS,
  items: [] as Client[],
  selected: [] as Client[],
  current: null,
  currentUpdates: {},
};

export const clients: Module<CollectionState, RootState> = {
  namespaced: true,
  state,
  getters: {
    [getter.GET_ITEMS]: (s): Client[] => s.items,
    [getter.GET_SELECTED]: (s): Client[] => s.selected,
    [getter.GET_CURRENT]: (s): Client | null => s.current,
    [getter.GET_CURRENT_UPDATES]: (s): Partial<Client> => s.currentUpdates,
    [getter.GET_UPDATES_LENGTH]: (s): number =>
      Object.keys(s.currentUpdates).length,
    [getter.GET_ITEM]: (s) => (id: string): Client | undefined =>
      s.items.find((item: Client) => item.id === id),
    [getter.GET_ITEM_INDEX]: (s, getters) => (id: string): number => {
      const item: Client = getters.getItem(s, id);
      return s.items.indexOf(item);
    },
  },
  actions: {},
  mutations: {
    [mutation.CLEAR_INVENTORY](s: CollectionState): void {
      s.items = [];
    },
    [mutation.SET_CURRENT](s, { item }: { item: Client }): void {
      s.current = item;
    },
    [mutation.CLEAR_CURRENT](s): void {
      s.current = null;
    },
    [mutation.UPDATE_CURRENT](
      s,
      { updates }: { updates: Partial<Client> },
    ): void {
      s.current = s.current ? { ...s.current, ...updates } : null;
    },
    [mutation.CLEAN_CURRENT](s): void {
      if (s.current === null) return;
      const current = { ...s.current } as Client;
      const cleanUndefined = (obj: any): void => {
        Object.keys(obj).forEach((key) => {
          if (obj[key] && typeof obj[key] === "object")
            cleanUndefined(obj[key]);
          else if (obj[key] === undefined) {
            // eslint-disable-next-line no-param-reassign
            delete obj[key];
          }
        });
      };
      cleanUndefined(current);
      s.current = current;
    },
    [mutation.ADD_UPDATES](s, { updates }: { updates: Partial<Client> }): void {
      s.currentUpdates = { ...s.currentUpdates, ...updates };
    },
    [mutation.CLEAR_UPDATES](s): void {
      s.currentUpdates = {};
    },
    [mutation.SET_SELECTED](s, { list }: { list: Client[] }): void {
      s.selected = list;
    },
    [mutation.CLEAR_SELECTED](s): void {
      s.selected = [];
    },
    [mutation.ADD_SELECTED](s, { item }: { item: Client }): void {
      s.selected.push(item);
    },
  },
};
