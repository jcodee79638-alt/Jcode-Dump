
var Pmi = Ie(function (Zhc, jmi) {
  var { LRUCache: Nea } = aoe(),
    { getHeapStatistics: Fea } = cr("v8"),
    { log: Bea } = mg();
  class zyt extends Nea {
    static #e = Math.floor(Fea().heap_size_limit);
    #r;
    #t = new Set();
    #n(...e) {
      Bea.silly("packumentCache", ...e);
    }
    constructor({ heapFactor: e = 0.25, maxEntryFactor: t = 0.5, sizeKey: r = "_contentLength" } = {}) {
      let s = Math.floor(zyt.#e * e),
        a = Math.floor(s * t);
      super({
        maxSize: s,
        maxEntrySize: a,
        sizeCalculation: (H) => {
          if (!H[r]) return a + 1;
          if (H[r] < 1e4) return H[r] * 2;
          if (H[r] < 1e6) return Math.floor(H[r] * 1.5);
          return a + 1;
        },
        dispose: (H, u) => {
          (this.#t.add(u), this.#n(u, "dispose"));
        },
      });
      ((this.#r = r), this.#n(`heap:${zyt.#e} maxSize:${s} maxEntrySize:${a}`));
    }
    set(e, t, ...r) {
      let s = this.#t.has(e);
      if (s) this.#t.delete(e);
      return (this.#n(e, "set", `size:${t[this.#r]} disposed:${s}`), super.set(e, t, ...r));
    }
    has(e, ...t) {
      let r = super.has(e, ...t);
      return (this.#n(e, `cache-${r ? "hit" : "miss"}`), r);
    }
  }
  jmi.exports = zyt;
});