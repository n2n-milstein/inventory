import admin = require("firebase-admin");
import XLSX = require("xlsx");
import functions = require("firebase-functions");
// const serviceAccount = require("../firebase.json");

admin.initializeApp();

/**
 * Takes nested JSON object and flattens to one level
 */
function flattenObject(ob: any, prefix: any): { [key: string]: any[] } {
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

/**
 * Creates array of start and end indices of cells to be nested
 */
function mergedCells(indices: number[], totalLength: number): any {
  const merged: any = [];
  for (let i = 0; i < indices.length - 1; i += 1) {
    merged.push({
      s: { r: 0, c: indices[i] },
      e: { r: 0, c: indices[i + 1] - 1 },
    });
  }
  merged.push({
    s: { r: 0, c: indices[indices.length - 1] },
    e: { r: 0, c: totalLength - 1 },
  });
  return merged;
}

/**
 * Creates main and sub headers and returns headers along with cells to be merged
 */
function sortHeaders(mainHeaders: string[], headers: string[]): any {
  const result: any = [];
  const indices: any = [];
  headers.forEach(function(header) {
    for (let i = 0; i < mainHeaders.length; i += 1) {
      if (header.includes(mainHeaders[i])) {
        result.push([i, header]);
      }
    }
  });
  result.sort((a: any, b: any) => a[0] - b[0]);
  let counter = 0;
  for (let i = 0; i < result.length; i += 1) {
    if (result[i][0] === counter) {
      indices.push(i);
      counter += 1;
    }
  }
  const topHeader = Array(result.length).fill("");
  for (let i = 0; i < indices.length; i += 1) {
    topHeader[indices[i]] = mainHeaders[i];
  }
  return [
    [topHeader, result.map((x: any) => x[1])],
    mergedCells(indices, headers.length),
  ];
}

async function getData(id: string[]): Promise<string> {
  const inventory: any = [];
  const furniture = admin.firestore().collection("furniture");
  const wb = XLSX.utils.book_new();

  const furnitureData = await furniture.get();
  furnitureData.forEach((doc) => {
    const item = doc.data();
    Object.keys(item.timing).forEach(function(field) {
      if (item.timing[field] !== undefined && field !== "urgent") {
        const date = item.timing[field].toDate();
        item.timing[field] = date.toDateString();
      }
    });
    if (id.includes(item.id)) {
      const newJSON = flattenObject(item, "");
      inventory.push(newJSON);
    }
  });
  wb.SheetNames.push("Inventory");
  let inventoryWS = XLSX.utils.json_to_sheet(inventory);
  if (inventoryWS["!ref"] !== undefined) {
    const cellRange = XLSX.utils.decode_range(inventoryWS["!ref"]);
    cellRange.e.r = 0;
    const cellNames = [];
    for (let C = cellRange.s.c; C <= cellRange.e.c; C += 1) {
      const cellAddress = { c: C, r: 0 };
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      cellNames.push(inventoryWS[cellRef].v);
    }
    const mainHeaders = [
      "id",
      "status",
      "donor",
      "timing",
      "physical",
      "attributes",
      "images",
      "comments",
      "staffNotes",
    ];
    const [headers, merged] = sortHeaders(mainHeaders, cellNames);
    inventoryWS = XLSX.utils.aoa_to_sheet([headers[0]]);
    XLSX.utils.sheet_add_json(inventoryWS, inventory, {
      header: headers[1],
      origin: "A2",
    });

    inventoryWS["!merges"] = merged;
  }
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
