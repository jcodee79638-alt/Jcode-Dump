
var gkn = Ie(function (Lkn) {
  Object.defineProperty(Lkn, "__esModule", { value: !0 });
  Lkn.BaggageImpl = void 0;
  class Xxe {
    constructor(e) {
      this._entries = e ? new Map(e) : new Map();
    }
    getEntry(e) {
      let t = this._entries.get(e);
      if (!t) return;
      return Object.assign({}, t);
    }
    getAllEntries() {
      return Array.from(this._entries.entries()).map(([e, t]) => [e, t]);
    }
    setEntry(e, t) {
      let r = new Xxe(this._entries);
      return (r._entries.set(e, t), r);
    }
    removeEntry(e) {
      let t = new Xxe(this._entries);
      return (t._entries.delete(e), t);
    }
    removeEntries(...e) {
      let t = new Xxe(this._entries);
      for (let r of e) t._entries.delete(r);
      return t;
    }
    clear() {
      return new Xxe();
    }
  }
  Lkn.BaggageImpl = Xxe;
});