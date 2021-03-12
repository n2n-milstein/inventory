import { Change } from "firebase-functions/lib/cloud-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import admin = require("firebase-admin");

export async function addItem(snap: DocumentSnapshot): Promise<void> {
  const data = snap.data();
  if (data !== undefined) {
    data.id = snap.ref.id;
    data.timing.dateAdded = new Date();
    await snap.ref.set(data);
  }
}

export async function updateItem(
  change: Change<DocumentSnapshot>,
): Promise<void> {
  const itemDoc = change.after.data();
  // const oldDoc = change.before.data();
  const db = admin.firestore();
  if (itemDoc !== undefined) {
    const { id } = itemDoc;
    const pickupQuery = db
      .collection("runs")
      .where(`pickups.${id}.id`, "==", id);
    const dropoffQuery = db
      .collection("runs")
      .where(`dropoffs.${id}.id`, "==", id);
    try {
      // run transaction
      await db.runTransaction(async (transaction) => {
        // get every run that contains the furniture item
        const pickupQuerySnapshot = await pickupQuery.get();
        const dropoffQuerySnapshot = await dropoffQuery.get();

        // generate nested updates for the run (e.g., pickups.id.<field>),
        // and update the run
        const nestedUpdate = (
          group: "pickups" | "dropoffs",
          doc: any,
        ): void => {
          const nestedUpdatesKey = `${group}.${id}`;
          let nestedUpdates = {};
          Object.keys(itemDoc).forEach((key) => {
            nestedUpdates = {
              ...nestedUpdates,
              [`${nestedUpdatesKey}.${key}`]: (itemDoc as any)[key],
            };
          });

          // get the run document reference and call transaction update
          const docRef = db.collection("runs").doc(doc.id);
          transaction.update(docRef, nestedUpdates);
        };

        // generate nested updates for each run
        pickupQuerySnapshot.forEach((doc) => {
          nestedUpdate("pickups", doc);
        });

        dropoffQuerySnapshot.forEach((doc) => {
          nestedUpdate("dropoffs", doc);
        });
      });
    } catch (e) {
      console.log("Transaction failure:", e);
      // if (oldDoc !== undefined) {
      //   await change.after.ref.set(oldDoc);
      // }
    }
  }
}
