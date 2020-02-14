/**
 * Information about the donor associated with a furniture item
 */
export default class Donor {
  public name: string;

  public phone: string;

  public email: string;

  public address: string;

  public zone: string; // of Tompkins County

  public constructor(
    name: string,
    phone: string,
    email: string,
    address: string,
    zone: string,
  ) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.zone = zone;
  }
}
