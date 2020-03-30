import { Furniture } from "@/data/Furniture";
import db from "./db";
import collections from "./collections";

/**
 * Adds an item to Firestore, setting its `id` and `dateAdded`.
 * @param item - item to add to collection in Firestore
 */
export function addItem(item: Furniture): Promise<void> {
  const data = { ...item };
  const ref = db.collection(collections.INVENTORY).doc();
  data.id = ref.id;
  data.timing.dateAdded = new Date();
  return ref.set(data);
}

/**
 * Updates an item in Firestore with specified properties of the `Furniture`
 * class.
 * @param id - id of the item to update
 * @param updates - Partial type of furniture of the updates
 */
export function updateItem(
  id: string,
  updates: Partial<Furniture>,
): Promise<void> {
  return db.collection(collections.INVENTORY).doc(id).update(updates);
}

/**
 * Deletes an item in Firestore with specified `id`.
 * @param id - id of the item to delete
 */
export function deleteItem(id: string): Promise<void> {
  return db.collection(collections.INVENTORY).doc(id).delete();
}
