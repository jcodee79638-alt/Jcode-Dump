
class oa {
  #t;
  #e;
  constructor({ parsedData: t, rawData: e }) {
    ((this.#t = t), (this.#e = e));
  }
  getRaw() {
    return this.#e;
  }
  get(t) {
    return this.#t.get(t) ?? null;
  }
  [Symbol.iterator]() {
    return this.#t.entries();
  }
}