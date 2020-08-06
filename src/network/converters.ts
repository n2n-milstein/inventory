import { Furniture } from "@/data/Furniture";
import { firestore } from "firebase";
import Timing from "@/data/furniture/Timing";
import Run from "@/data/Run";

/**
 * Creates a deep copy of object
 */
export const deepCopy = (obj: any): any => {
  const copy = {} as any;
  Object.keys(obj).forEach((key) => {
    if (
      obj[key] &&
      !(obj[key] instanceof Date) &&
      typeof obj[key] === "object"
    ) {
      // eslint-disable-next-line no-param-reassign
      copy[key] = deepCopy(obj[key]);
    } else {
      // eslint-disable-next-line no-param-reassign
      copy[key] = obj[key];
    }
  });
  return copy;
};

/**
 * Returns the values of an object
 */
export const objectValues = (obj: any): any => {
  return Object.keys(obj).map((key) => obj[key]);
};

/**
 * Returns copy of object with undefined fields cleaned from object
 */
export const cleanUndefined = (obj: any): any => {
  const copy = deepCopy(obj);
  Object.keys(copy).forEach((key) => {
    if (copy[key] && typeof copy[key] === "object") cleanUndefined(copy[key]);
    else if (copy[key] === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete copy[key];
    }
  });
  return copy;
};

/**
 * Convert objects to and from Firestore
 */
export const furnitureConverter: firestore.FirestoreDataConverter<Furniture> = {
  toFirestore(furniture: Furniture): Furniture {
    return deepCopy(furniture) as Furniture;
  },
  fromFirestore(snapshot, options): Furniture {
    const data = snapshot.data(options);
    return new Furniture(
      data.id,
      data.donor,
      data.physical,
      new Timing(
        data.timing.urgent,
        data.timing.pickupBy,
        data.timing.dateOffered,
        data.timing.dateAdded,
        data.timing.confirmedPickupDate,
        data.timing.dateCollected,
        data.timing.dateDelivered,
      ),
      data.attributes,
      data.status,
      data.images,
      data.comments,
      data.staffNotes,
    );
  },
};

/**
 * Convert objects to and from Firestore
 */
export const runConverter: firestore.FirestoreDataConverter<Run> = {
  toFirestore(run: Run): Run {
    return deepCopy(run) as Run;
  },
  fromFirestore(snapshot, options): Run {
    const data = snapshot.data(options);
    return {
      id: data.id,
      dateCreated: Timing.toDate(data.dateCreated),
      lastUpdated: Timing.toDate(data.lastUpdated),
      date: Timing.toDate(data.date),
      volunteers: data.volunteers,
      pickups: data.pickups,
      dropoffs: data.dropoffs,
      clients: data.clients,
      status: data.status,
      notes: data.notes,
    };
  },
};
