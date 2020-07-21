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
  dateCreated: Date | Timestamp;
  lastUpdated: Date | Timestamp;

  // data
  date: Date | Timestamp;
  // TODO: make this a list of volunteers NOT volunteer IDs
  volunteers: Volunteer[];

  pickups: Furniture[]; // list of furniture
  // TODO: think of better way of mapping client --> dropoff
  // dropoff and client order matters
  dropoffs: Furniture[];
  clients: Client[];

  status: RunStatus;
}
