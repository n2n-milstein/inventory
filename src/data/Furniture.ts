// for future reference: https://www.typescriptlang.org/docs/handbook/enums.html

/**
 * Represents the class of a furniture item
 */
export enum FClass {
  Bed = "Bed",
  Chair = "Chair",
  Couch = "Couch",
  Table = "Table",
  Dresser = "Dresser",
}

/**
 * Represents the material of a furniture item
 */
export enum Material {
  Wood = "Wood",
  Metal = "Metal",
  Glass = "Glass",
  Plastic = "Plastic",
}

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
 * Information about the donor associated with a furniture item
 */
class Donor {
  name: string;

  phone: string;

  email: string;

  address: string;

  zone: string; // of Tompkins County

  constructor(name: string, phone: string, email: string, address: string, zone: string) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.zone = zone;
  }
}

/**
 * Physical attributes of a furniture item
 */
class Physical {
  class: FClass;

  size: number;

  // 1-5 (small-big)
  material: Material;

  altMaterial?: Material;

  set: boolean;

  hasFrame: boolean;

  hasBoxSpring: boolean;

  numChairs: number;

  heavy: boolean;

  constructor(
    size: number,
    fclass: FClass,
    material: Material,
    set: boolean,
    heavy: boolean,
    hasFrame: boolean,
    hasBoxSpring: boolean,
    numChairs: number,
    altMaterial?: Material,
  ) {
    this.class = fclass;
    this.size = size;
    this.material = material;
    this.set = set;
    this.heavy = heavy;
    this.hasFrame = hasFrame;
    this.hasBoxSpring = hasBoxSpring;
    this.numChairs = numChairs;
    if (altMaterial) this.altMaterial = altMaterial;
  }
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
  Couch: ["Love seat", "Futon", "2 cushions", "3 cushions", "4+ cushions (large couch set)"],
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
 * Dates and timing information associated with a furniture item
 */
class Timing {
  urgent: boolean;

  pickupBy: Date;

  dateOffered: Date;

  confirmedPickupDate?: Date;

  dateAdded?: Date;

  dateCollected?: Date;

  dateDelivered?: Date;

  constructor(
    urgent: boolean,
    pickupBy: Date,
    dateOffered: Date,
    confirmedPickupDate?: Date,
    dateAdded?: Date,
    dateCollected?: Date,
    dateDelivered?: Date,
  ) {
    this.urgent = urgent;
    this.pickupBy = pickupBy;
    this.dateOffered = dateOffered;
    if (confirmedPickupDate) this.confirmedPickupDate = confirmedPickupDate;
    if (dateAdded) this.dateAdded = dateAdded;
    if (dateCollected) this.dateCollected = dateCollected;
    if (dateDelivered) this.dateDelivered = dateDelivered;
  }
}

/**
 * Attributes used to generate ratings for a furniture item
 */
class Attributes {
  [key: string]: any;

  partsIntact: boolean;

  finishIntact: boolean;

  smokeFree: boolean;

  petFree: boolean;

  bedbugFree: boolean;

  mildewFree: boolean;

  donateToFriend: boolean;

  constructor(
    partsIntact: boolean,
    finishIntact: boolean,
    smokeFree: boolean,
    petFree: boolean,
    bedbugFree: boolean,
    mildewFree: boolean,
    donateToFriend: boolean,
  ) {
    this.partsIntact = partsIntact;
    this.finishIntact = finishIntact;
    this.smokeFree = smokeFree;
    this.petFree = petFree;
    this.bedbugFree = bedbugFree;
    this.mildewFree = mildewFree;
    this.donateToFriend = donateToFriend;
  }
}

/**
 * Dictionary type with string values
 */
interface Dict {
  [key: string]: any;
}

/**
 * Dictionary that maps attribute names to their "pretty" string representation
 */
export const AttributesDict: { [key: string]: { pretty: string; question: string } } = {
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
 * Images associated with a furniture item
 */
class Image {
  url: string;

  caption?: string;

  constructor(url: string, caption?: string) {
    this.url = url;
    if (caption) this.caption = caption;
  }
}

/**
 * Represents a furniture donation record
 */
export class Furniture {
  id: string;

  donor: Donor;

  physical: Physical;

  timing: Timing;

  attributes: Attributes;

  status: Status;

  images: Image[];

  comments: string;

  staffNotes: string;

  constructor(
    id: string,
    donor: Donor,
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
