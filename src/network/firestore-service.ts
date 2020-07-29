import { Furniture } from "@/data/Furniture";
import { db, functions, storage } from "./firebase";
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
    // TODO: eventually make this into a Firebase function
    // onCreate ==> set ID, dateAdded + other metadata
    // this will allow us to avoid using deepCopy and creating a ref
    const data = deepCopy(item) as Furniture;
    const ref = db.collection(this.collection).doc();
    data.id = ref.id;
    console.log("addItem id:", data.id);
    data.timing.dateAdded = new Date();
    return ref.set(data);
  };

  /**
   * TODO: eventually make this into a Firebase function
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

    // setup queries for individual item and runs containing item
    const itemRef = db.collection(this.collection).doc(id);
    const runQuery = db
      .collection(collections.RUNS)
      .where(`pickups.${id}.id`, "==", id);

    try {
      // run transaction
      await db.runTransaction(async (transaction) => {
        // get individual item
        const itemDoc = await transaction.get(itemRef);

        // make sure item exists
        if (!itemDoc.exists) {
          throw new Error("Document doesn't exist");
        }

        // get every run that contains the furniture item
        const runQuerySnapshot = await runQuery.get();

        // for each run, generate nested updates (e.g., pickups.id.<field>),
        // and update the run
        runQuerySnapshot.forEach((doc) => {
          console.log("run:", doc.id, "=>", doc.data());

          const nestedUpdatesKey = `pickups.${id}`;
          let nestedUpdates = {};
          Object.keys(updates).forEach((key) => {
            nestedUpdates = {
              ...nestedUpdates,
              [`${nestedUpdatesKey}.${key}`]: (updates as any)[key],
            };
          });

          console.log("nestedUpdates", nestedUpdates);

          // get the run document reference and call transaction update
          const docRef = db.collection(collections.RUNS).doc(doc.id);
          transaction.update(docRef, nestedUpdates);
        });

        // write to individual furniture
        console.log("updateItem (updates):", updates);
        transaction.update(itemRef, updates);
      });
      console.log("Transaction success!");
    } catch (e) {
      console.log("Transaction failure:", e);
    }
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
