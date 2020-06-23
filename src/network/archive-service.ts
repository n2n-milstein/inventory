import { Furniture } from "@/data/Furniture";
import collections from "./collections";
import FirestoreService from "./firestore-service";
import db from "./db";

class ArchiveService extends FirestoreService {
  unarchiveItem = async (id: string): Promise<void> => {
    try {
      const doc = await db.collection(this.collection).doc(id).get();
      if (doc.exists) {
        const item = doc.data() as Furniture;
        await db.collection(this.collection).doc(id).delete();
        return db
          .collection(collections.INVENTORY)
          .doc(id)
          .set({ ...item });
      }
    } catch (e) {
      console.log("Error unarchiving item: ", e);
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
  unarchiveItem,
} = new ArchiveService(collections.ARCHIVE);
