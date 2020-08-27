import Timing, { Timestamp } from "@/data/furniture/Timing";
import { Area } from "./Area";

export default interface Client {
  // metadata
  id: string;
  dateAdded: Date; // timestamp column
  lastUpdated: Date;

  // agency data
  dateOfReferral: Date | Timestamp;
  referringAgency: string;
  agencyContactName: string;
  agencyContactEmail: string;
  agencyContactPhone: string;

  // client data
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  clientArea: Area;
  clientAreaOther: string;

  // request data
  comments: string;
  staffNotes: string;

  requestedFurniture: BoolElems;
  reasonForNeed: BoolElems;
}

export interface BoolElems {
  [attr: string]: boolean;
}

function randomPhone(): string {
  const first = Math.floor(Math.random() * 899 + 100);
  const second = Math.floor(Math.random() * 899 + 100);
  const third = Math.floor(Math.random() * 8999 + 1000);
  return `${first}-${second}-${third}`;
}

function randomBoolean(): boolean {
  return !!Math.floor(Math.random() * 2);
}

export function generateClient(): Client {
  return {
    id: URL.createObjectURL(new Blob())
      .toString()
      .split("/")
      .reverse()[0]
      .substring(0, 8),
    dateAdded: new Date(),
    lastUpdated: new Date(),

    dateOfReferral: new Date(),
    referringAgency: "Cornell",
    agencyContactName: "Andrew",
    agencyContactEmail: "andrew@cornell.edu",
    agencyContactPhone: randomPhone(),

    // client data
    clientName: "Johann Smith",
    clientPhone: randomPhone(),
    clientAddress: "123 ABC Rd",
    clientArea: Area.DowntownIthaca,
    clientAreaOther: "",

    // request data
    comments: "comment",
    staffNotes: "staff notes",

    requestedFurniture: {
      queenOrFullBed: randomBoolean(),
      twinBed: randomBoolean(),
      couch: randomBoolean(),
      livingRoomChair: randomBoolean(),
      tableAndChairs: randomBoolean(),
      otherTables: randomBoolean(),
      dresser: randomBoolean(),
      crib: randomBoolean(),
      other: randomBoolean(),
    },

    reasonForNeed: {
      leavingHomelessness: randomBoolean(),
      recentReleasedPrison: randomBoolean(),
      pregnantMember: randomBoolean(),
      childrenUnder18: randomBoolean(),
      hasDisability: randomBoolean(),
      isVeteran: randomBoolean(),
      isElderly: randomBoolean(),
      domesticViolence: randomBoolean(),
    },
  };
}

export function furnitureRequested(req: BoolElems): string {
  let string = "";
  if (req.queenOrFullBed) {
    string += "Full Bed, ";
  }
  if (req.twinBed) {
    string += "Twin Bed, ";
  }
  if (req.couch) {
    string += "Couch, ";
  }
  if (req.livingRoomChair) {
    string += "Living Room Chair, ";
  }
  if (req.tableAndChairs) {
    string += "Table and Chairs, ";
  }
  if (req.dresser) {
    string += "Dresser, ";
  }
  if (req.crib) {
    string += "Crib, ";
  }
  if (req.other) {
    string += "Other, ";
  }
  if (string !== "") {
    string = string.substr(0, string.length - 2);
  }
  return string;
}

export function needReason(need: BoolElems): string {
  let string = "";
  if (need.leavingHomelessness) {
    string += "Leaving Homelessness, ";
  }
  if (need.recentReleasedPrison) {
    string += "Recently Released from Prison, ";
  }
  if (need.pregnantMember) {
    string += "Pregnant Member, ";
  }
  if (need.childrenUnder18) {
    string += "Children U18, ";
  }
  if (need.hasDisability) {
    string += "Disability, ";
  }
  if (need.isVeteran) {
    string += "Veteran, ";
  }
  if (need.isElderly) {
    string += "Elderly, ";
  }
  if (need.domesticViolence) {
    string += "Domestic Violence, ";
  }
  if (string !== "") {
    string = string.substr(0, string.length - 2);
  }
  return string;
}

export function searchString(client: Client): string {
  return (
    Timing.formatDate(client.dateOfReferral) +
    Area[client.clientArea] +
    furnitureRequested(client.requestedFurniture) +
    needReason(client.reasonForNeed) +
    client.clientName +
    client.clientAddress +
    client.clientArea
  );
}

export const requestOptions = [
  { text: "Full Bed", value: "queenOrFullBed" },
  { text: "Twin Bed", value: "twinBed" },
  { text: "Couch", value: "couch" },
  { text: "Living Room Chair", value: "livingRoomChair" },
  { text: "Table and Chairs", value: "tableAndChairs" },
  { text: "Dresser", value: "dresser" },
  { text: "Crib", value: "crib" },
  { text: "Other", value: "other" },
];

export const needOptions = [
  { text: "Leaving Homelessness", value: "leavingHomelessness" },
  {
    text: "Recently Released from Prison",
    value: "recentReleasedPrison",
  },
  { text: "Pregnant Member", value: "pregnantMember" },
  { text: "Children U18", value: "childrenUnder18" },
  { text: "Disability", value: "hasDisability" },
  { text: "Veteran", value: "isVeteran" },
  { text: "Elderly", value: "isElderly" },
  { text: "Domestic Violence", value: "domesticViolence" },
];

export const agencyData = [
  { name: "referringAgency", label: "Referring Agency", icon: "" },
  { name: "agencyContactName", label: "Contact Name", icon: "" },
  { name: "agencyContactPhone", label: "Contact Phone", icon: "" },
  { name: "agencyContactEmail", label: "Contact Email", icon: "" },
  { name: "dateOfReferral", label: "Date of Referral", icon: "" },
];

export const clientData = [
  { name: "clientName", label: "Client Name", icon: "" },
  { name: "clientPhone", label: "Client Phone", icon: "" },
  { name: "clientAddress", label: "Client Address", icon: "" },
  { name: "clientArea", label: "Client Adress Zone", icon: "" },
];
