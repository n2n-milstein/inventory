import { Furniture } from "@/data/Furniture";
import { db, functions, storage } from "./firebase";
import collections from "./collections";

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
   * Gets the Furniture item with given id.
   * @param id - id of the item to get
   */
  getItem = (id: string): Promise<Furniture> => {
    return db
      .collection(this.collection)
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data() as Furniture;
        }
        throw new Error("No such document.");
      })
      .catch((err) => {
        throw new Error(`Error getting doc: ${err}`);
      });
  };

  /**
   * Adds an item to Firestore, setting its `id` and `dateAdded`.
   * @param item - item to add to collection in Firestore
   */
  addItem = (item: Furniture): Promise<void> => {
    return db.collection(this.collection).doc().set(item);
  };

  /**
   * Updates an item in Firestore with specified properties of the `Furniture`
   * class. Checks and updates copies of the item in Runs.
   * @param id - id of the item to update
   * @param updates - Partial type of furniture of the updates
   */
  updateItem = async (
    id: string,
    updates: Partial<Furniture>,
  ): Promise<void> => {
    // return if no updates
    if (Object.keys(updates).length === 0) {
      throw new Error("Updates are empty.");
    }
    return db.collection(this.collection).doc(id).update(updates);
  };

  /**
   * Deletes an item in Firestore with specified `id`. Throws an Error if
   * the item is part of a run.
   * @param id - id of the item to delete
   */
  deleteItem = async (id: string): Promise<void> => {
    const runQuerySnapshot = await db
      .collection(collections.RUNS)
      .where(`pickups.${id}.id`, "==", id)
      .get();

    if (runQuerySnapshot.size > 0)
      throw new Error("Item is part of a run. Failed to delete item.");

    return db
      .collection(this.collection)
      .doc(id)
      .delete()
      .then(() => {
        console.log("Successfully deleted item.");
      });
  };

  exportItems = (ids: string[]): Promise<void> => {
    const getInventoryXLSX = functions.httpsCallable("getInventoryXLSX");
    // Uncomment if running `npm run shell` for backend functions:
    // firebase.functions().useFunctionsEmulator("http://localhost:5001");
    return getInventoryXLSX({ id: ids, collection: this.collection })
      .then((res) => {
        const gsref = storage.refFromURL(`gs:/${res.data}`);
        gsref.getDownloadURL().then((url) => {
          window.open(url);
        });
      })
      .catch((err) => {
        console.error("exportItem error:", err);
      });
  };
}
