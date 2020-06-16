import { Furniture } from "@/data/Furniture";

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

export const furnitureConverter = {
  toFirestore(furniture: Furniture): Furniture {
    return deepCopy(furniture) as Furniture;
  },
};
