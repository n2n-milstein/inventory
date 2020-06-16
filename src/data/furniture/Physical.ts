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

  // 1-5 (small-big)
  public size: number;

  public material: Material;

  public altMaterial?: Material;

  public set: boolean;

  // TODO: create new furniture class
  public hasFrame: boolean;

  // TODO: create new furniture class
  public hasBoxSpring: boolean;

  public numChairs: number;

  public heavy: boolean;

  public constructor(
    size = 1,
    fclass = FClass.Chair,
    material = Material.Wood,
    set = false,
    heavy = false,
    hasFrame = false,
    hasBoxSpring = false,
    numChairs = 0,
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
