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
 * Physical attributes of a furniture item
 */
export default class Physical {
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
