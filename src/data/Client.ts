export interface Client {
  phoneNumber: string;
  address: string;
  zone: string;
  dateConfirmed?: Date;
  dateDelivered?: Date;

  requests: {
    beds: number;
    sofa: number;
    diningSet: number; // number of chairs needed
    otherTables: number;
    dresser: number;
    crib: number;
  };
  conditions: {
    leavingHomelessness: boolean;
    recentPrison: boolean;
    pregnantMember: boolean;
    under18Children: boolean;
    disability: boolean;
    veteran: boolean;
    elderly: boolean;
    domesticViolence: boolean;
  };
  comments: string;
}
