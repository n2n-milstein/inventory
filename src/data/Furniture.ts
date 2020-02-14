import Attributes from "./furniture/Attributes";
import DonorInfo from "./furniture/Donor";
import Image from "./furniture/Image";
import Physical from "./furniture/Physical";
import Timing from "./furniture/Timing";

/**
 * Represents the status/location of a furniture item
 */
export enum Status {
  Donor, // 0
  OnTruck, // 1
  Shed,
  Delivered,
  Unknown,
}

/**
 * Specifies the meaning of the sizes (1-5) for each furniture class
 */
export const Size = {
  Bed: ["Smaller than Twin (baby)", "Twin/XL", "Full", "Queen", "King+"],
  Chair: [
    "Dining chair",
    "Desk chair",
    "Living room chair",
    "Recliner",
    "Chair and a half (or larger)",
  ],
  Couch: [
    "Love seat",
    "Futon",
    "2 cushions",
    "3 cushions",
    "4+ cushions (large couch set)",
  ],
  Table: [
    "Small table (night stand, coffee table)",
    "1 person table (desk)",
    "2 person table",
    "3-4 person table",
    "5+ person table",
  ],
  Dresser: ["1 drawer", "2 drawers", "3 drawers", "4 drawers", "5+ drawers"],
};

/**
 * Dictionary that maps attribute names to their "pretty" string representation
 */
export const AttributesDict: {
  [key: string]: { pretty: string; question: string };
} = {
  partsIntact: {
    pretty: "Parts Intact",
    question: "Are all the parts intact?",
  },
  finishIntact: { pretty: "Finish Intact", question: "Is the finish intact?" },
  smokeFree: { pretty: "Smoke Free", question: "Does anyone smoke at home?" },
  petFree: { pretty: "Pet Free", question: "Are there pets in the house?" },
  bedbugFree: { pretty: "Bedbug Free", question: "Does it have bedbugs?" },
  mildewFree: { pretty: "Mildew Free", question: "Does it have mildew?" },
  donateToFriend: {
    pretty: "Donate to Friend",
    question: "Would you donate this to a friend?",
  },
};

/**
 * Represents a furniture donation record
 */
export class Furniture {
  public id: string;

  public donor: DonorInfo;

  public physical: Physical;

  public timing: Timing;

  public attributes: Attributes;

  public status: Status;

  public images: Image[];

  public comments: string;

  public staffNotes: string;

  public constructor(
    id: string,
    donor: DonorInfo,
    physical: Physical,
    timing: Timing,
    attributes: Attributes,
    status: Status,
    images: Image[],
    comments: string,
    staffNotes: string,
  ) {
    this.id = id;
    this.donor = donor;
    this.physical = physical;
    this.timing = timing;
    this.attributes = attributes;
    this.status = status;
    this.images = images;
    this.comments = comments;
    this.staffNotes = staffNotes;
  }
}
