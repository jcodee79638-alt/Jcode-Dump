
class sr {
  #t;
  #e;
  constructor(t, e) {
    ((this.#t = t), (this.#e = e));
  }
  get length() {
    return this.#t.length;
  }
  isEmpty(t) {
    return this.#t[t] === Fs;
  }
  minX(t) {
    return this.#e[t * 4 + 0] / 256;
  }
  minY(t) {
    return this.#e[t * 4 + 1] / 256;
  }
  maxX(t) {
    return (this.#e[t * 4 + 2] + 1) / 256;
  }
  maxY(t) {
    return (this.#e[t * 4 + 3] + 1) / 256;
  }
}