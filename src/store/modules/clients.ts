/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Client from "@/data/Client";
import collections from "@/network/collections";
import { db } from "@/network/firebase";
import { Module } from "vuex";
import { firestoreAction } from "vuexfire";
import ClientService from "@/network/client-service";
import { RootState } from "@/store/types";
import { CollectionState, getter, mutation, action } from "./collection/types";

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
  actions: {
    [action.SET_CURRENT]({ commit }, { item }: { item: Client }): void {
      commit(mutation.SET_CURRENT, { item });
    },
    [action.CLEAR_CURRENT]({ commit }): void {
      commit(mutation.CLEAR_UPDATES);
      commit(mutation.CLEAR_CURRENT);
    },
    [action.UPDATE_CURRENT](
      { commit },
      { updates }: { updates: Partial<Client> },
    ): void {
      commit(mutation.ADD_UPDATES, { updates });
    },
    [action.CLEAR_UPDATES]({ commit }): void {
      commit(mutation.CLEAR_UPDATES);
    },
    async [action.COMMIT_UPDATES]({ commit, state }): Promise<void> {
      try {
        const service = new ClientService();
        commit(mutation.UPDATE_CURRENT, { updates: state.currentUpdates });
        commit(mutation.CLEAN_CURRENT);
        await service.updateItem(state.current!.id, state.currentUpdates);
        commit(mutation.CLEAR_UPDATES);
      } catch (e) {
        console.error("commitUpdates error:", e);
      }
    },
    [action.SET_SELECTED]({ commit }, { list }: { list: Client[] }): void {
      commit(mutation.SET_SELECTED, { list });
    },
    [action.CLEAR_SELECTED]({ commit }): void {
      commit(mutation.CLEAR_SELECTED);
    },
    [action.ADD_SELECTED]({ commit }, { item }: { item: Client }): void {
      commit(mutation.ADD_SELECTED, { item });
    },
    [action.BIND_ITEMS]: firestoreAction<CollectionState, RootState>(
      ({ bindFirestoreRef, state }) => {
        return bindFirestoreRef("items", db.collection(state.collection!));
      },
    ),
    [action.UNBIND_ITEMS]: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("items");
    }),
    async commitItem({ commit, state }): Promise<void> {
      try {
        commit(mutation.UPDATE_CURRENT, { updates: state.currentUpdates });
        commit(mutation.CLEAN_CURRENT);
        await new ClientService().addItem(state.current!);
        commit(mutation.CLEAR_UPDATES);
      } catch (e) {
        console.error("addItem error:", e);
      }
    },
  },
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
