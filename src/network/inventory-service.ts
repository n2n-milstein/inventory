import collections from "./collections";
import FirestoreService from "./firestore-service";

const InventoryService = new FirestoreService(collections.INVENTORY);

export const { addItem, updateItem, deleteItem } = InventoryService;
