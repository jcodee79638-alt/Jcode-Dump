
var Umi = Ie(function (eLc, Omi) {
  var Rea = cr("events"),
    Cmi = Symbol("onProgress"),
    Sve = Symbol("bars"),
    LZ = Symbol("listener"),
    wmi = Symbol("normData");
  class kmi extends Rea {
    constructor({ normalize: e = !1, stopOnDone: t = !1 } = {}) {
      super();
      ((this.normalize = !!e), (this.stopOnDone = !!t), (this[Sve] = new Map()), (this[LZ] = null));
    }
    get size() {
      return this[Sve].size;
    }
    get listening() {
      return !!this[LZ];
    }
    addListener(...e) {
      return this.on(...e);
    }
    on(e, ...t) {
      if (e === "progress" && !this[LZ]) this.start();
      return super.on(e, ...t);
    }
    off(e, ...t) {
      return this.removeListener(e, ...t);
    }
    removeListener(e, ...t) {
      let r = super.removeListener(e, ...t);
      if (e === "progress" && this.listeners(e).length === 0) this.stop();
      return r;
    }
    stop() {
      if (this[LZ]) (process.removeListener("progress", this[LZ]), (this[LZ] = null));
    }
    start() {
      if (!this[LZ]) ((this[LZ] = (...e) => this[Cmi](...e)), process.on("progress", this[LZ]));
    }
    [Cmi](e, t) {
      if (((t = this[wmi](e, t)), !this[Sve].has(e))) this.emit("bar", e, t);
      if ((this[Sve].set(e, t), this.emit("progress", e, t), t.done)) {
        if ((this[Sve].delete(e), this.emit("barDone", e, t), this.size === 0)) {
          if (this.stopOnDone) this.stop();
          this.emit("done");
        }
      }
    }
    [wmi](e, t) {
      let { value: r, total: s } = t,
        a = r,
        H = s,
        u = t.done || a >= H;
      if (this.normalize) {
        let f = this[Sve].get(e);
        if (((H = 100), u)) a = 100;
        else {
          let d = (100 * r) / s;
          if (f) a = d > f.value ? d : (100 - f.value) / 100 + f.value;
        }
      }
      return { ...t, key: e, name: t.name || e, value: a, total: H, actualValue: r, actualTotal: s, done: u };
    }
  }
  Omi.exports = kmi;
});