
class aPi {
  constructor() {
    ((this._map = new WeakMap()), (this._idmap = new Map()));
  }
  add(e, ...t) {
    let r = t[0];
    if ((this._map.set(e, r), r && typeof r === "object" && "id" in r)) this._idmap.set(r.id, e);
    return this;
  }
  clear() {
    return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
  }
  remove(e) {
    let t = this._map.get(e);
    if (t && typeof t === "object" && "id" in t) this._idmap.delete(t.id);
    return (this._map.delete(e), this);
  }
  get(e) {
    let t = e._zod.parent;
    if (t) {
      let r = { ...(this.get(t) ?? {}) };
      delete r.id;
      let s = { ...r, ...this._map.get(e) };
      return Object.keys(s).length ? s : void 0;
    }
    return this._map.get(e);
  }
  has(e) {
    return this._map.has(e);
  }
}