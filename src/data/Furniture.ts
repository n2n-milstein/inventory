// for future reference: https://www.typescriptlang.org/docs/handbook/enums.html

/**
 * Represents the class of a furniture item
 */
export enum FClass {
  Bed,
  Chair,
  Table,
  Set,
  Dresser
}

/**
 * Represents the material of a furniture item
 */
export enum Material {
  Wood,
  Metal,
  Glass,
  Plastic
}

/**
 * Represents the status/location of a furniture item
 */
export enum Status {
  Donor,
  OnTruck,
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
  originalOwner: boolean;
  smokeFree: boolean;
  petFree: boolean;
  donateToFriend: boolean;
  age?: number;

  constructor(
    originalOwner: boolean,
    smokeFree: boolean,
    petFree: boolean,
    donateToFriend: boolean,
    age?: number
  ) {
    this.originalOwner = originalOwner;
    this.smokeFree = smokeFree;
    this.petFree = petFree;
    this.donateToFriend = donateToFriend;
    if (age) this.age = age;
  }
}

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
  donor: Donor;
  physical: Physical;
  timing: Timing;
  attributes: Attributes;

  status: Status;

  images: Image[];
  comments: string;

  constructor(
    donor: Donor,
    physical: Physical,
    timing: Timing,
    attributes: Attributes,
    status: Status,
    images: Image[],
    comments: string
  ) {
    this.donor = donor;
    this.physical = physical;
    this.timing = timing;
    this.attributes = attributes;
    this.status = status;
    this.images = images;
    this.comments = comments;
  }
}

/**
 * DEPRECATED: do not use, this is here for reference because it is easier to
 * read
 */
type FurnitureType = {
  // donor location info
  donorName: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  zone: string; // of Tompkins County

  // physical attributes
  class: FClass;
  size: number; // 1-5 (small-big)
  material: Material;
  set: boolean;
  hasFrame?: boolean;
  hasBoxSpring?: boolean;
  numChairs?: number;
  heavy: boolean;

  urgent: boolean;
  pickupBy: Date;
  confirmedPickupDate: Date;
  dateOffered: Date;
  dateAdded: Date;
  dateCollected: Date;

  attributes: {
    originalOwner: boolean;
    smokeFree: boolean;
    petFree: boolean;
    donateToFriend: boolean;
    age?: number;
  };

  status: Status;

  images: [{ url: string; caption?: string }];
  comments: string;
};
