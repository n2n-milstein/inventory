/**
 * Dates and timing information associated with a furniture item
 */
export default class Timing {
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
