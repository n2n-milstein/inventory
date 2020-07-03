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
    name = "",
    phone = "",
    email = "",
    address = "",
    zone = "",
  ) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.zone = zone;
  }

  public generateEmail(): void {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let email = "";
    const userlen = Math.floor(Math.random() * Math.floor(5)) + 10;
    for (let i = 0; i < userlen; i += 1) {
      email += chars[Math.floor(Math.random() * chars.length)];
    }
    this.email = email;
  }

  public generateRandom(): Donor {
    const zones = ["North", "South", "West", "East"];
    this.name = "";
    this.phone = Math.floor(100000000 + Math.random() * 900000000).toString();
    this.generateEmail();
    this.address = "todo";
    this.zone = zones[Math.floor(Math.random() * zones.length)];
    return this;
  }
}
