
var ahi = Ie(function (PLc, ohi) {
  ohi.exports = class extends Map {
    #e = new Map();
    constructor(t = []) {
      super();
      for (let [r, s] of t) this.set(r, s);
    }
    #r(t) {
      if (typeof t !== "string") return t;
      return t.normalize("NFKD").toLowerCase();
    }
    get(t) {
      let r = this.#r(t);
      return this.#e.has(r) ? super.get(this.#e.get(r)) : void 0;
    }
    set(t, r) {
      let s = this.#r(t);
      if (this.#e.has(s)) super.delete(this.#e.get(s));
      return (this.#e.set(s, t), super.set(t, r));
    }
    delete(t) {
      let r = this.#r(t);
      if (this.#e.has(r)) {
        let s = this.#e.get(r);
        return (this.#e.delete(r), super.delete(s));
      }
    }
    has(t) {
      let r = this.#r(t);
      return this.#e.has(r) && super.has(this.#e.get(r));
    }
  };
});