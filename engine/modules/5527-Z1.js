
class Z1 {
  url;
  searchParams;
  constructor(e) {
    this.url = e;
    this.searchParams = new Sg(e.searchParams);
  }
}