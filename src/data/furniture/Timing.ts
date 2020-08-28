import * as firebase from "firebase/app";

export type Timestamp = firebase.firestore.Timestamp;
export const { Timestamp } = firebase.firestore;

/**
 * Dates and timing information associated with a furniture item
 */
export default class Timing {
  public urgent: boolean;

  public pickupBy: Date;

  public dateOffered: Date;

  public dateAdded: Date;

  public confirmedPickupDate?: Date;

  public dateCollected?: Date;

  public dateDelivered?: Date;

  public constructor(
    urgent = false,
    pickupBy = new Date(),
    dateOffered = new Date(),
    dateAdded = new Date(),
    confirmedPickupDate?: Date | Timestamp,
    dateCollected?: Date | Timestamp,
    dateDelivered?: Date | Timestamp,
  ) {
    this.urgent = urgent;
    this.pickupBy = Timing.toDate(pickupBy);
    this.dateOffered = Timing.toDate(dateOffered);
    // TODO: just set this to `new Date()` - user shouldn't control this metadata
    this.dateAdded = Timing.toDate(dateAdded);
    if (confirmedPickupDate)
      this.confirmedPickupDate = Timing.toDate(confirmedPickupDate);
    if (dateCollected) this.dateCollected = Timing.toDate(dateCollected);
    if (dateDelivered) this.dateDelivered = Timing.toDate(dateDelivered);
  }

  static toDate(date: Date | Timestamp): Date {
    if (date instanceof Timestamp) {
      return date.toDate();
    }
    return date;
  }

  static formatDate(date?: Date | Timestamp): string {
    if (!date) return "";
    if (date instanceof Date) return date.toISOString().substring(0, 10);
    return date.toDate().toISOString().substring(0, 10);
  }

  static inRange(date: Date, start: Date, end: Date): boolean {
    return start <= date && date <= end;
  }
}
