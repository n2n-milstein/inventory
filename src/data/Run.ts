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
  dateCreated: Date;
  lastUpdated: Date;

  // data
  date: Date;
  volunteers: Volunteer[];

  pickups: { [furnitureId: string]: Furniture };
  // furniture items have a clientId property that maps clients to dropoffs
  dropoffs: { [furnitureId: string]: Furniture };
  clients: { [clientId: string]: Client };

  status: RunStatus;

  notes: string;
}
