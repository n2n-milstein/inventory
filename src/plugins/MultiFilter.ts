// import Vue from "vue";
// import Component from "vue-class-component";
// import { FClass, Material, Status, Furniture } from "@/data/Furniture";
// /**
//  * Enabled v-data-table to have moire than one filter.
//  */
// class MultiFilters {
//   items: Furniture[];
//   filters: string[];
//   filter: string;
//   headers;
//   filterCallbacks;
//   filteredItems: Furniture[];
//   self;

//   /**
//    * Constructor.
//    *
//    * @param items
//    * @param filters
//    * @param filter
//    * @param headers
//    */
//   constructor(items, filters, filter, headers) {
//     this.items = items;
//     this.filter = filter;
//     this.headers = headers;
//     this.filters = filters;
//     this.filterCallbacks = {};
//   }

//   /**
//    * Updates filter values.
//    * @param filters filter´s object
//    * @param val JSON chunk to be updated.
//    * @returns {*}
//    */
//   static updateFilters(filters, val) {
//     return Object.assign({}, filters, val);
//   }

//   /**
//    * Adds a new filter
//    * @param filterName The name of the filter from which the information will be extracted
//    * @param filterCallback The callback that will apply the filter.
//    */
//   registerFilter(filterName, filterCallback) {
//     this.filterCallbacks[filterName] = filterCallback;
//   }

//   /**
//    * Run all filters.
//    * @returns {*}
//    */
//   runFilters() {
//     const self = this;
//     this.filteredItems = self.items;

//     Object.entries(this.filterCallbacks).forEach(([entity, cb]) => {
//       this.filteredItems = cb.call(
//         self,
//         self.filters[entity],
//         this.filteredItems
//       );
//     });

//     return this.filteredItems;
//   }
// }

// export default class MultiFiltersPlugin extends MultiFilters {
//   install(Vue, options) {
//     Vue.prototype.$MultiFilters = MultiFilters;
//   }
// }

// // Vue.use(MultiFiltersPlugin);
