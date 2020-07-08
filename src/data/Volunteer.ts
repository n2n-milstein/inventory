export default interface Volunteer {
  name: string;
  phone: string;
  email: string;
  address: string;
  /**
   * We store run IDs (normalized data) because we don't really need to view
   * runs based on volunteer.
   */
  runs: string[]; // list of run ID
}
