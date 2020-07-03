import { Furniture } from "@/data/Furniture";
import collections from "./collections";
import FirestoreService from "./firestore-service";
import { db } from "./firebase";

class InventoryService extends FirestoreService {
  archiveItem = async (id: string): Promise<void> => {
    try {
      const doc = await db.collection(this.collection).doc(id).get();
      if (doc.exists) {
        const item = doc.data() as Furniture;
        await db.collection(this.collection).doc(id).delete();
        return db
          .collection(collections.ARCHIVE)
          .doc(id)
          .set({ ...item });
      }
    } catch (e) {
      console.log("Error archiving item: ", e);
    }
    return new Promise(() => {
      // do nothing
    });
  };
}

export const {
  addItem,
  updateItem,
  deleteItem,
  archiveItem,
} = new InventoryService(collections.INVENTORY);
