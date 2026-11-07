
class ur {
  #t;
  #e;
  constructor(t) {
    ((this.#t = t), (this.#e = new DataView(t)));
  }
  #s(t) {
    return (tt(t < hr.strings.length, "Invalid string index"), xe(this.#t, this.#e, t, 4));
  }
  get css() {
    return k(this, "css", this.#s(0));
  }
  get loadedName() {
    return k(this, "loadedName", this.#s(1));
  }
  get baseFontName() {
    return k(this, "baseFontName", this.#s(2));
  }
  get src() {
    return k(this, "src", this.#s(3));
  }
  get style() {
    let t = 0;
    t += 4 + this.#e.getUint32(t);
    const e = xe(this.#t, this.#e, 0, t),
      s = xe(this.#t, this.#e, 1, t);
    return k(this, "style", { style: e, weight: s });
  }
}