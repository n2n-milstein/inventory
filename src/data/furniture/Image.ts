/**
 * Images associated with a furniture item
 */
export default class Image {
  public url: string;

  public caption?: string;

  public constructor(url: string, caption?: string) {
    this.url = url;
    if (caption) this.caption = caption;
  }
}
