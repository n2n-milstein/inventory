export enum VolunteerRole {
  Driver = "Driver",
  Volunteer = "Volunteer",
}
export default interface Volunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  // TODO: users can only have one stored role, but their role might change
  // with each run
  role: VolunteerRole;
  /**
   * We store run IDs (normalized data) because we don't really need to view
   * runs based on volunteer.
   */
  runs: string[]; // list of run ID
}
