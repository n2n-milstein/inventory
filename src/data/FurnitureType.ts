// for future reference: https://www.typescriptlang.org/docs/handbook/enums.html

enum FurnitureClass {
  Bed,
  Chair,
  Table,
  Set,
  Dresser
}

enum Material {
  Wood,
  Metal,
  Glass,
  Plastic
}

enum Location {
  Donor,
  OnTruck,
  Shed,
  Delivered,
  Unknown
}

export type Furniture = {
  // donor location info
  donorName: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  zone: string; // of Tompkins County

  // physical attributes
  class: FurnitureClass;
  size: number; // 1-5 (small-big)
  material: Material;
  set: boolean;
  hasFrame?: boolean;
  hasBoxSpring?: boolean;
  numChairs?: number;
  heavy: boolean;

  urgent: boolean;
  pickupDate: Date;
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

  location: Location;

  images: [{ url: string; caption?: string }];
  comments: string;
};
