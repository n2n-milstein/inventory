import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import getData from "./xlsx-functions";
import * as itemFunctions from "./item-functions";

admin.initializeApp();

exports.getInventoryXLSX = functions.https.onCall(
  (data: { id: string[]; collection: string }) => {
    return getData(data.id, data.collection);
  },
);

exports.addItem = functions.firestore
  .document("furniture/{id}")
  .onCreate(async (snap) => {
    await itemFunctions.addItem(snap);
  });

exports.updateItem = functions.firestore
  .document("furniture/{id}")
  .onUpdate(async (change) => {
    await itemFunctions.updateItem(change);
  });
