import { Timestamp } from "./furniture/Timing";
import { Furniture } from "./Furniture";
import Client from "./Client";
import Volunteer from "./Volunteer";

export enum RunStatus {
  Planning,
  Ready,
  InProgress,
  Complete,
}

export default interface Run {
  // metadata
  id: string;
  // TODO: rename to dateAdded?
  dateCreated: Date | Timestamp;
  lastUpdated: Date | Timestamp;

  // data
  date: Date | Timestamp;
  // TODO: make this a list of volunteers NOT volunteer IDs
  volunteers: Volunteer[];

  pickups: { [id: string]: Furniture }; // list of furniture
  // pickups: Furniture[]; // list of furniture
  // TODO: think of better way of mapping client --> dropoff
  // dropoff and client order matters
  dropoffs: { [id: string]: Furniture };
  clients: { [id: string]: Client }; // id should be the furniture ID

  status: RunStatus;

  notes: string;
}
