import { Furniture } from "@/data/Furniture";
import Run from "@/data/Run";
import { getItem, updateItem } from "@/network/run-service";
import { firestoreAction } from "vuexfire";
import collections from "@/network/collections";
import { db } from "@/network/firebase";
import { cleanUndefined } from "@/network/converters";

export const runDetailModule = {
  namespaced: true,
  state: () => ({
    id: "",
    run: null,
    runUpdates: null,
    furniture: null,
    furnitureUpdates: null,
  }),
  getters: {
    getRun: (state: any): Run => state.run,
    getCurrent: (state: any): Furniture => state.furniture,
    getCurrentUpdates: (state: any): Partial<Furniture> =>
      state.furnitureUpdates,
    getUpdatesLength: (state: any): number =>
      state.furnitureUpdates ? Object.keys(state.furnitureUpdates).length : 0,
  },
  mutations: {
    /** run */
    SET_ID(state: any, { id }: { id: string }): void {
      state.id = id;
    },
    SET_RUN(state: any, { run }: { run: Run }): void {
      state.run = run;
    },
    UPDATE_RUN(state: any): void {
      state.run = state.run ? { ...state.run, ...state.runUpdates } : null;
    },
    CLEAN_RUN(state: any): void {
      if (state.run === null) return;
      state.run = cleanUndefined(state.run);
    },

    /** run updates */
    ADD_RUN_UPDATES(state: any, { updates }: { updates: Partial<Run> }): void {
      state.runUpdates = { ...state.runUpdates, ...updates };
    },
    CLEAR_RUN_UPDATES(state: any): void {
      state.runUpdates = null;
    },

    /** furniture */
    SET_FURNITURE(state: any, { item }: { item: Furniture }): void {
      state.furniture = item;
    },
    CLEAR_FURNITURE(state: any): void {
      state.furniture = null;
    },
    UPDATE_FURNITURE(state: any): void {
      state.furniture = state.furniture
        ? { ...state.furniture, ...state.furnitureUpdates }
        : null;
    },

    /** furniture updates */
    ADD_FURNITURE_UPDATES(
      state: any,
      { updates }: { updates: Partial<Furniture> },
    ): void {
      state.furnitureUpdates = { ...state.furnitureUpdates, ...updates };
    },
    CLEAR_FURNITURE_UPDATES(state: any): void {
      state.furnitureUpdates = null;
    },
  },
  actions: {
    setId({ commit }: any, { id }: { id: string }): void {
      commit("SET_ID", { id });
    },
    async getRun({ commit }: any, { id }: { id: string }): Promise<void> {
      try {
        const run = await getItem(id);
        commit("SET_RUN", { run });
      } catch (err) {
        console.log(err);
      }
    },
    setFurniture({ commit }: any, { item }: { item: Furniture }): void {
      commit("SET_FURNITURE", { item });
    },
    // TODO: fix furniture edit card and dialog so we don't have to name actions like this
    clearCurrent({ commit }: any): void {
      commit("CLEAR_FURNITURE");
    },
    // TODO: restructure how archive/inventory are stored - then updates can
    // be made directly from the run detail page
    // updateFurniture(
    //   { commit }: any,
    //   { updates }: { updates: Partial<Furniture> },
    // ): void {
    //   commit("ADD_FURNITURE_UPDATES", { updates });
    // },
    updateRun({ commit }: any, { updates }: { updates: Partial<Run> }): void {
      commit("ADD_RUN_UPDATES", { updates });
    },
    async commitRunUpdates({ commit, state }: any): Promise<void> {
      if (!state.runUpdates || Object.keys(state.runUpdates).length === 0)
        return;

      try {
        commit("UPDATE_RUN");
        commit("CLEAN_RUN");
        await updateItem(state.run.id, state.runUpdates);
        commit("CLEAR_RUN_UPDATES");
      } catch (err) {
        console.error("commitRunUpdates error:", err);
      }
    },
    bindRun: firestoreAction(({ bindFirestoreRef, state }) => {
      return bindFirestoreRef(
        "run",
        db.collection(collections.RUNS).doc((state as any).id),
      );
    }),
  },
};

export default runDetailModule;
