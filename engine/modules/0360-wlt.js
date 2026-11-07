
class wlt {
  decode;
  encode;
  constructor(e, t) {
    ((this.decode = e), (this.encode = t));
  }
  flip() {
    return new wlt(this.encode, this.decode);
  }
}