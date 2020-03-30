/**
 * Our Firestore collections exported as an enum to keep Firestore calls
 * consistent.
 */
enum Collections {
  INVENTORY = "furniture",
  PENDING = "pending",
  REJECTED = "rejected",
}

export default Collections;
