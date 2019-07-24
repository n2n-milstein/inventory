// for future reference: https://www.typescriptlang.org/docs/handbook/enums.html

/**
 * Represents the class of a furniture item
 */
export enum FClass {
  Bed = "Bed",
  Chair = "Chair",
  Table = "Table",
  Set = "Set",
  Dresser = "Dresser"
}

/**
 * Represents the material of a furniture item
 */
export enum Material {
  Wood = "Wood",
  Metal = "Metal",
  Glass = "Glass",
  Plastic = "Plastic"
}

/**
 * Represents the status/location of a furniture item
 */
export enum Status {
  Donor, // 0
  OnTruck, // 1
  Shed,
  Delivered,
  Unknown
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

  constructor(
    name: string,
    phone: string,
    email: string,
    address: string,
    zone: string
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
  class: FClass;
  size: number; // 1-5 (small-big)
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
    altMaterial?: Material
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
 * Dates and timing information associated with a furniture item
 */
class Timing {
  urgent: boolean;
  pickupBy: Date;
  dateOffered: Date;
  confirmedPickupDate?: Date;
  dateAdded?: Date;
  dateCollected?: Date;

  constructor(
    urgent: boolean,
    pickupBy: Date,
    dateOffered: Date,
    confirmedPickupDate?: Date,
    dateAdded?: Date,
    dateCollected?: Date
  ) {
    this.urgent = urgent;
    this.pickupBy = pickupBy;
    this.dateOffered = dateOffered;
    if (confirmedPickupDate) this.confirmedPickupDate = confirmedPickupDate;
    if (dateAdded) this.dateAdded = dateAdded;
    if (dateCollected) this.dateCollected = dateCollected;
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
    donateToFriend: boolean
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
type Dict = { [key: string]: string };

/**
 * Dictionary that maps attribute names to their "pretty" string representation
 */
export const AttributesDict: Dict = {
  partsIntact: "Parts Intact",
  finishIntact: "Finish Intact",
  smokeFree: "Smoke Free",
  petFree: "Pet Free",
  bedbugFree: "Bedbug Free",
  mildewFree: "Mildew Free",
  donateToFriend: "Donate to Friend"
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
    staffNotes: string
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
