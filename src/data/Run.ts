import { Timestamp } from "./furniture/Timing";
import { Furniture } from "./Furniture";

export enum RunStatus {
  Planning,
  Ready,
  InProgress,
  Complete,
}

export default class Run {
  // metadata
  public id: string;

  public dateCreated: Date | Timestamp;

  public lastUpdated: Date | Timestamp;

  // data
  public date: Date | Timestamp;

  public volunteers: string[]; // list of volunteer IDs

  public pickups: Furniture[]; // list of furniture

  // list of client ID, furniture ID pairs
  // public dropoffs: { client: string; furniture: Furniture }[];
  public dropoffs: Furniture[];

  public status: RunStatus;

  public constructor(
    id = "",
    date = new Date(),
    volunteers = [] as string[],
    pickups = [] as Furniture[],
    dropoffs = [],
    status = RunStatus.Planning,
  ) {
    // metadata
    this.id = id;
    this.dateCreated = new Date();
    this.lastUpdated = new Date();

    // data
    this.date = date;
    this.volunteers = volunteers;
    this.pickups = pickups;
    this.dropoffs = dropoffs;
    this.status = status;
  }
}
