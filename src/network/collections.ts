/**
 * Our Firestore collections exported as an enum to keep Firestore calls
 * consistent.
 */
enum collections {
  INVENTORY = "furniture",
  PENDING = "pending",
  REJECTED = "rejected",
  ARCHIVE = "archive",
  RUNS = "runs",
  CLIENTS = "clients",
}

export default collections;
