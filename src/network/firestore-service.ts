import { Furniture } from "@/data/Furniture";
import db from "./db";
import collections from "./collections";
import { deepCopy } from "./converters";

export default class FirestoreService {
  collection: collections;

  /**
   * Sets the collection associated with the service.
   * @param collection - collection to edit
   */
  constructor(collection: collections) {
    this.collection = collection;
  }

  /**
   * Adds an item to Firestore, setting its `id` and `dateAdded`.
   * @param item - item to add to collection in Firestore
   */
  addItem = (item: Furniture): Promise<void> => {
    const data = deepCopy(item) as Furniture;
    const ref = db.collection(this.collection).doc();
    data.id = ref.id;
    data.timing.dateAdded = new Date();
    return ref.set(data);
  };

  /**
   * Updates an item in Firestore with specified properties of the `Furniture`
   * class.
   * @param id - id of the item to update
   * @param updates - Partial type of furniture of the updates
   */
  updateItem = (id: string, updates: Partial<Furniture>): Promise<void> => {
    return db.collection(this.collection).doc(id).update(updates);
  };

  /**
   * Deletes an item in Firestore with specified `id`.
   * @param id - id of the item to delete
   */
  deleteItem = (id: string): Promise<void> => {
    return db.collection(this.collection).doc(id).delete();
  };
}
