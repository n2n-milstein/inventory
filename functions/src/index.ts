import admin = require("firebase-admin");
import XLSX = require("xlsx");
import functions = require("firebase-functions");
// const serviceAccount = require("../firebase.json");

admin.initializeApp();

/**
 * Takes nested JSON object and flattens to one level
 * @param ob original multi-level JSON object
 * @param prefix prefix to attach to keys
 * @returns sortedJSON - JSON sorted by keys alphabetically
 */
function flattenObject(ob: any, prefix: any): { [key: string]: any[] } {
  const toReturn: { [key: string]: any[] } = {};
  const newPrefix = prefix ? `${prefix}.` : "";

  Object.keys(ob).forEach(function(i) {
    if (typeof ob[i] === "object" && ob[i] !== null) {
      // Recursion on deeper objects
      Object.assign(toReturn, flattenObject(ob[i], newPrefix + i));
    } else if (ob[i] === true) {
      toReturn[prefix + i] = "Yes" as any;
    } else if (ob[i] === false) {
      toReturn[prefix + i] = "No" as any;
    } else {
      toReturn[prefix + i] = ob[i];
    }
  });
  const sortedJSON = Object.keys(toReturn)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: toReturn[key] }), {});
  return sortedJSON;
}

/**
 * Creates array of start and end indices of cells to be nested
 * @param indices the start indices of each subheader
 * @param totalLength total length of the header row
 * @returns merged - array of cells to merge in excel document
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
 * @param mainHeaders the names of the main header fields
 * @param headers the names of all the subheaders
 * @returns The main headers with spaces and subheaders, along with the cells to be merged
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

/**
 * Rename the subheaders for more clarity
 * @param mainHeaders Top level headers
 * @param subheaders Subheaders that will be filtered
 * @return array of headers with appropriate naming schemes
 */
function renameSubheaders(mainHeaders: string[], subheaders: string[]): any {
  let counter = 0;
  const newHeaders = subheaders.map((header) => {
    if (!header.includes(mainHeaders[counter])) {
      counter += 1;
    }
    if (mainHeaders[counter].length === header.length) {
      return header;
    }
    return header.substring(mainHeaders[counter].length);
  });
  return newHeaders;
}

async function getData(id: string[]): Promise<string> {
  const inventory: any = [];
  const furniture = admin.firestore().collection("furniture");
  const wb = XLSX.utils.book_new();

  // converting each inventory entry to single-layer JSON object
  const furnitureData = await furniture.get();
  furnitureData.forEach((doc) => {
    const item = doc.data();
    Object.keys(item.timing).forEach(function(field) {
      // changing the way time data is represented
      if (item.timing[field] !== undefined && field !== "urgent") {
        const date = item.timing[field].toDate();
        item.timing[field] = date.toDateString();
      }
    });
    // only putting selected items into spreadsheet
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
    // get current header names
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
    // reformatting spreadsheet to include main headers and sub headers and changing some header names
    const [headers, merged] = sortHeaders(mainHeaders, cellNames);
    inventoryWS = XLSX.utils.aoa_to_sheet([headers[0]]);
    XLSX.utils.sheet_add_json(inventoryWS, inventory, {
      header: headers[1],
      origin: "A2",
    });
    XLSX.utils.sheet_add_aoa(
      inventoryWS,
      [renameSubheaders(mainHeaders, headers[1])],
      { origin: "A2" },
    );

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
