// import Vue from "vue";
// import Component from "vue-class-component";
import { Furniture } from "@/data/Furniture";

/**
 * Enabled v-data-table to have more than one filter.
 */
class Filters {
  // TODO: Undo filters individually
  private inventory: Furniture[] = [];

  private filters: number[] = [];

  private vals: string[] = [];

  private filterTemp: Furniture[] = [];

  public filteredItems: Furniture[] = [];

  /**
   * Constructor.
   *
   * @param items the full inventory
   * @param filters the list of filters being applied
   * @param val the list of filter values to be matched against
   */
  public constructor(
    inventory: Furniture[],
    filters: number[],
    vals: string[],
  ) {
    this.inventory = inventory;
    this.filters = filters;
    this.vals = vals;
  }

  /* TODO: Stub for search */
  private filter0(): Furniture[] {
    return this.inventory;
  }

  /**
   * Returns the inventory after filtering by CLASS.
   * @param inv the current inventory
   * @param filterVal a string value representing furniture class
   */
  private filter1(inv: Furniture[], filterVal: string): Furniture[] {
    const temp: Furniture[] = [];
    if (this.inventory === []) return []; // TODO: fix error caused by removing this
    for (let i = 0; i < inv.length; i += 1) {
      if (inv[i].physical.class.toLowerCase().trim() === filterVal)
        temp.push(inv[i]);
    }
    return temp;
  }

  /**
   * Returns the inventory after filtering by STATUS.
   * PRECONDITION: filterVal must be castable to an int
   * @param inv the current inventory
   * @param filterVal a string value representing class
   */
  private filter2(inv: Furniture[], filterVal: string): Furniture[] {
    const temp: Furniture[] = [];
    if (this.inventory === []) return []; // TODO: fix error caused by removing this
    const statusVal: number = parseInt(filterVal, 10);
    for (let i = 0; i < inv.length; i += 1) {
      if (inv[i].status === statusVal) temp.push(inv[i]);
    }
    return temp;
  }

  /* Identify and execute the appropriate filtering function */
  private selectFilter(
    inv: Furniture[],
    filterNum: number,
    val: string,
  ): Furniture[] {
    if (filterNum === 0) return this.filter0();
    if (filterNum === 1) return this.filter1(inv, val);
    if (filterNum === 2) return this.filter2(inv, val);
    return [];
  }

  /* Returns the filtered inventory based on given filter type and comparison value
   * - FILTER 0: search
   * - FILTER 1: class
   * - FILTER 2: status
   */
  private multifilters(
    inv: Furniture[],
    filterList: number[],
    vals: string[],
  ): Furniture[] {
    if (filterList.length >= 1) {
      this.filterTemp = this.selectFilter(inv, filterList[0], vals[0]);
    }
    filterList.shift();
    vals.shift();
    if (filterList !== undefined && vals !== undefined) {
      return this.multifilters(this.filterTemp, filterList, vals);
    }
    return this.filterTemp;
  }

  /**
   * Run all filters.
   * @returns {*}
   */
  public runFilters(filterList: number[], vals: string[]): Furniture[] {
    if (filterList.length === 1) {
      return this.selectFilter(this.inventory, filterList[0], vals[0]);
    }
    this.filteredItems = this.multifilters(this.inventory, filterList, vals);
    return this.filteredItems;
  }
}

export default Filters;
