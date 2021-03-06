import Run from "@/data/Run";
import collections from "./collections";
import { deepCopy } from "./converters";
import { db } from "./firebase";

export class RunService {
  collection = collections.RUNS;

  /**
   * Gets the item with given id.
   * @param id - id of the item to get
   */
  getItem = (id: string): Promise<Run> => {
    return db
      .collection(this.collection)
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data() as Run;
        }
        throw new Error("No such document.");
      })
      .catch((err) => {
        throw new Error(`Error getting doc: ${err}`);
      });
  };

  /**
   * Adds an item to Firestore, setting its `id` and other metadata.
   * @param item - item to add to collection in Firestore
   */
  addItem = (item: Run): Promise<void> => {
    // TODO: eventually make this into a Firebase function
    // onCreate ==> set ID, dateAdded + other metadata
    // this will allow us to avoid using deepCopy and creating a ref
    const data = deepCopy(item) as Run;
    const ref = db.collection(this.collection).doc();
    data.id = ref.id;
    data.dateCreated = new Date();
    data.lastUpdated = new Date();
    return ref.set(data);
  };

  /**
   * Updates an item in Firestore with specified properties of the `Run`
   * class.
   * @param id - id of the item to update
   * @param updates - Partial type of Run, holds the updates
   */
  updateItem = (id: string, updates: Partial<Run>): Promise<void> => {
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

export const { getItem, addItem, updateItem, deleteItem } = new RunService();
