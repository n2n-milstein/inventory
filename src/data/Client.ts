import { Area } from "./Area";

export default interface Client {
  // metadata
  dateAdded: Date; // timestamp column
  lastUpdated: Date;

  // agency data
  dateOfReferral: Date;
  referringAgency: string;
  agencyContactName: string;
  agencyContactEmail: string;
  agencyContactPhone: string;

  // client data
  clientName: string;
  clientPhoneNumber: string;
  clientAddress: string;
  clientArea: Area;
  clientAreaOther: string;

  // request data
  comments: string;
  staffNotes: string;

  requestedFurniture: {
    queenOrFullBed: boolean;
    twinBed: boolean;
    couch: boolean;
    livingRoomChair: boolean;
    tableAndChairs: boolean;
    otherTables: boolean;
    dresser: boolean;
    crib: boolean;
    other: boolean;
  };

  reasonForNeed: {
    leavingHomelessness: boolean;
    recentReleasedPrison: boolean;
    pregnantMember: boolean;
    childrenUnder18: boolean;
    hasDisability: boolean;
    isVeteran: boolean;
    isElderly: boolean;
    domesticViolence: boolean;
  };
}
