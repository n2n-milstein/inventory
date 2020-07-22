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
    data.timing.dateAdded = new Date();
    return ref.set(data);
  };

  /**
   * TODO: rewrite to do batch update
   * Updates an item in Firestore with specified properties of the `Furniture`
   * class.
   * @param id - id of the item to update
   * @param updates - Partial type of furniture of the updates
   */
  updateItem = async (
    id: string,
    updates: Partial<Furniture>,
  ): Promise<void> => {
    const itemRef = db.collection(this.collection).doc(id);
    try {
      await db.runTransaction(async (t) => {
        // get every run that contains the furniture item
        // subgroup query

        // write to individual furniture
        t.update(itemRef, updates);

        // write to each item in run
      });
      console.log("Transaction success!");
    } catch (e) {
      console.log("Transaction failure:", e);
    }

    // return db.collection(this.collection).doc(id).update(updates);
  };

  /**
   * TODO: rewrite to check for runs that refer to furniture item
   * Deletes an item in Firestore with specified `id`.
   * @param id - id of the item to delete
   */
  deleteItem = (id: string): Promise<void> => {
    return db.collection(this.collection).doc(id).delete();
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
