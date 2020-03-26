import admin = require("firebase-admin");
import XLSX = require("xlsx");
import functions = require("firebase-functions");
// const serviceAccount = require("../firebase.json");

admin.initializeApp();

exports.getInventoryXLSX = functions.https.onCall(
  async (data: { id: string[] }) => {
    // const fs = require("fs");
    const inventory: any = [];
    const furniture = admin.firestore().collection("furniture");
    const wb = XLSX.utils.book_new();

    furniture
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const item = doc.data();
          // const itemInfo = [];
          inventory.push(item);
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(data.id.length);
      });
    wb.SheetNames.push("Inventory");
    const inventoryWS = XLSX.utils.aoa_to_sheet(inventory);
    wb.Sheets.Inventory = inventoryWS;

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    const storage = admin.storage();
    const bucket = storage.bucket("inventory");
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    const fileName = `${date}.xlsx`;
    const file = bucket.file(fileName);
    await file.save(buffer);
    return `/inventory/${fileName}`;
  },
);
