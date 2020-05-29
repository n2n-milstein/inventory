import collections from "./collections";
import FirestoreService from "./firestore-service";

const ArchiveService = new FirestoreService(collections.ARCHIVE);

export const { addItem, updateItem, deleteItem } = ArchiveService;
