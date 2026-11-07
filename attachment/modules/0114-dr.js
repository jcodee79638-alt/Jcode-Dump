
class dr {
  #t;
  #e;
  constructor(t) {
    ((this.#t = t), (this.#e = new DataView(t)));
  }
  #s(t) {
    return (tt(t < lr.strings.length, "Invalid string index"), xe(this.#t, this.#e, t));
  }
  get fontFamily() {
    return k(this, "fontFamily", this.#s(0));
  }
  get fontWeight() {
    return k(this, "fontWeight", this.#s(1));
  }
  get italicAngle() {
    return k(this, "italicAngle", this.#s(2));
  }
}