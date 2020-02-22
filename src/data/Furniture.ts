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
  public name: string;

  public phone: string;

  public email: string;

  public address: string;

  public zone: string; // of Tompkins County

  public constructor(
    name: string,
    phone: string,
    email: string,
    address: string,
    zone: string,
  ) {
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
  public class: FClass;

  public size: number;

  // 1-5 (small-big)
  public material: Material;

  public altMaterial?: Material;

  public set: boolean;

  public hasFrame: boolean;

  public hasBoxSpring: boolean;

  public numChairs: number;

  public heavy: boolean;

  public constructor(
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
 * Dates and timing information associated with a furniture item
 */
class Timing {
  public urgent: boolean;

  public pickupBy: Date;

  public dateOffered: Date;

  public confirmedPickupDate?: Date;

  public dateAdded?: Date;

  public dateCollected?: Date;

  public dateDelivered?: Date;

  public constructor(
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
  [key: string]: boolean;

  public partsIntact: boolean;

  public finishIntact: boolean;

  public smokeFree: boolean;

  public petFree: boolean;

  public bedbugFree: boolean;

  public mildewFree: boolean;

  public donateToFriend: boolean;

  public constructor(
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
 * Dictionary that maps attribute names to their "pretty" string representation
 */
export const AttributesDict: {
  [key: string]: { prettyPos: string; prettyNeg: string; question: string };
} = {
  partsIntact: {
    prettyPos: "Parts Intact",
    prettyNeg: "Not All Parts Intact",
    question: "Are all the parts intact?",
  },
  finishIntact: {
    prettyPos: "Finish Intact",
    prettyNeg: "Finish Not Intact",
    question: "Is the finish intact?",
  },
  smokeFree: {
    prettyPos: "Smoke Free",
    prettyNeg: "Not Smoke Free",
    question: "Does anyone smoke at home?",
  },
  petFree: {
    prettyPos: "Pet Free",
    prettyNeg: "Not Pet Free",
    question: "Are there pets in the house?",
  },
  bedbugFree: {
    prettyPos: "Bedbug Free",
    prettyNeg: "Not Bedbug Free",
    question: "Does it have bedbugs?",
  },
  mildewFree: {
    prettyPos: "Mildew Free",
    prettyNeg: "Not Mildew Free",
    question: "Does it have mildew?",
  },
  donateToFriend: {
    prettyPos: "Donate to Friend",
    prettyNeg: "Donate to Anyone",
    question: "Would you donate this to a friend?",
  },
};

/**
 * Images associated with a furniture item
 */
class Image {
  public url: string;

  public caption?: string;

  public constructor(url: string, caption?: string) {
    this.url = url;
    if (caption) this.caption = caption;
  }
}

/**
 * Represents a furniture donation record
 */
export class Furniture {
  public id: string;

  public donor: Donor;

  public physical: Physical;

  public timing: Timing;

  public attributes: Attributes;

  public status: Status;

  public images: Image[];

  public comments: string;

  public staffNotes: string;

  public constructor(
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
