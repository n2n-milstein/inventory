import { Timestamp } from "./furniture/Timing";

export enum RunStatus {
  Planning,
  Ready,
  InProgress,
  Complete,
}

export default class Run {
  // metadata
  public dateCreated: Date | Timestamp;

  public lastUpdated: Date | Timestamp;

  // data
  public date: Date | Timestamp;

  public volunteers: string[]; // list of volunteer IDs

  public pickups: string[]; // list of furniture IDs

  // list of client ID, furniture ID pairs
  public dropoffs: { client: string; furniture: string }[];

  public status: RunStatus;

  public constructor(
    date = new Date(),
    volunteers = [] as string[],
    pickups = [] as string[],
    dropoffs = [],
    status = RunStatus.Planning,
  ) {
    // metadata
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
