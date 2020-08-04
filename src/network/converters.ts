import { Furniture } from "@/data/Furniture";
import { firestore } from "firebase";
import Timing from "@/data/furniture/Timing";

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

export const objectValues = (obj: any): any => {
  return Object.keys(obj).map((key) => obj[key]);
};

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
