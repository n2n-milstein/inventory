import admin = require("firebase-admin");
import XLSX = require("xlsx");
import functions = require("firebase-functions");
// const serviceAccount = require("../firebase.json");

admin.initializeApp();

function flattenObject(ob: any, prefix: any) {
  const toReturn: { [key: string]: any[] } = {};
  const newPrefix = prefix ? `${prefix}.` : "";

  Object.keys(ob).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      if (typeof ob[i] === "object" && ob[i] !== null) {
        // Recursion on deeper objects
        Object.assign(toReturn, flattenObject(ob[i], newPrefix + i));
      } else {
        toReturn[prefix + i] = ob[i];
      }
    }
  });
  return toReturn;
}

async function getData(id: string[]): Promise<string> {
  const inventory: any = [];
  const furniture = admin.firestore().collection("furniture");
  const wb = XLSX.utils.book_new();

  const furnitureData = await furniture.get();
  furnitureData.forEach((doc) => {
    const item = doc.data();
    const newJSON = flattenObject(item, "");
    inventory.push(newJSON);
  });
  console.log(id.length);
  wb.SheetNames.push("Inventory");
  console.log(inventory);
  const inventoryWS = XLSX.utils.json_to_sheet(inventory);
  wb.Sheets.Inventory = inventoryWS;

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  const storage = admin.storage();
  const bucket = storage.bucket("n2n-inventory");
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() +
    1}-${today.getDate()}`;
  const fileName = `${date}.xlsx`;
  const file = bucket.file(fileName);
  await file.save(buffer);
  return `/n2n-inventory/${fileName}`;
}

exports.getInventoryXLSX = functions.https.onCall((data: { id: string[] }) => {
  return getData(data.id);
});
