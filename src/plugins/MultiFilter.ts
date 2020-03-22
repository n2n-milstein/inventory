// import Vue from "vue";
// import Component from "vue-class-component";
import { Furniture } from "@/data/Furniture";

/**
 * Enabled v-data-table to have more than one filter.
 */
class MultiFilters {
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
  private filter0(inv: Furniture[], filterVal: string): Furniture[] {
    inv;
    filterVal;
    alert("stub");
    return this.inventory;
  }

  /* TODO: Stub for class */
  private filter1(inv: Furniture[], filterVal: string): Furniture[] {
    let temp: Furniture[] = [];
    for (let i = 0; i < inv.length; i++) {
      if (inv[i].physical.class.toLowerCase().trim() === filterVal)
        this.filterTemp.push(inv[i]);
    }
    return temp;
  }

  /* TODO: Stub for status */
  private filter2(inv: Furniture[], filterVal: string): Furniture[] {
    inv;
    filterVal;
    alert("stub");
    return this.inventory;
  }

  /* Identify and execute the appropriate filtering function */
  private selectFilter(
    inv: Furniture[],
    filterNum: number,
    val: string,
  ): Furniture[] {
    if (filterNum === 0) return this.filter0(inv, val);
    else if (filterNum === 1) return this.filter1(inv, val);
    else if (filterNum === 2) return this.filter2(inv, val);
    else return [];
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
    } else {
      this.filteredItems = this.multifilters(this.inventory, filterList, vals);
      return this.filteredItems;
    }
  }
}

export default MultiFilters;
