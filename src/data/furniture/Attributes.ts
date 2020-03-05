/**
 * Attributes used to generate ratings for a furniture item
 */
export default class Attributes {
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
