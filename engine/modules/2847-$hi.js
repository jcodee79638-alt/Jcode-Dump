
var $hi = Ie(function (ULc, Lhi) {
  var { hasOwnProperty: $na } = Object.prototype,
    gna = Tae(),
    _hi = ["name", "license", "funding", "realpath", "packageName"];
  class hhi extends Map {
    #e;
    constructor() {
      super();
      this.#e = new Map();
      for (let e of _hi) this.#e.set(e, new Map());
    }
    get primaryKey() {
      return "location";
    }
    get indexes() {
      return [..._hi];
    }
    *filter(e) {
      for (let t of this.values()) if (e(t)) yield t;
    }
    add(e) {
      let t = super.get("");
      if (t && e.root !== t && e.root !== t.root) {
        gna(() => {
          throw Object.assign(Error("adding external node to inventory"), {
            root: t.path,
            node: e.path,
            nodeRoot: e.root.path,
          });
        });
        return;
      }
      let r = super.get(e.location);
      if (r) {
        if (r === e) return;
        this.delete(r);
      }
      super.set(e.location, e);
      for (let [s, a] of this.#e.entries()) {
        let H;
        if ($na.call(e, s)) H = e[s];
        else if (s === "license" && e.package) {
          if (e.package.license) H = e.package.license;
          else if (e.package.licence) H = e.package.licence;
          else if (Array.isArray(e.package.licenses)) H = e.package.licenses[0];
          else if (Array.isArray(e.package.licences)) H = e.package.licences[0];
        } else if (e[s]) H = e[s];
        else H = e.package?.[s];
        if (H && typeof H === "object") {
          if (s === "license") H = H.type;
          else if (s === "funding") H = H.url;
        }
        if (!a.has(H)) a.set(H, new Set());
        a.get(H).add(e);
      }
    }
    delete(e) {
      if (!this.has(e)) return;
      super.delete(e.location);
      for (let [t, r] of this.#e.entries()) {
        let s;
        if (e[t] !== void 0) s = e[t];
        else s = e.package?.[t];
        let a = r.get(s);
        if (a) {
          if ((a.delete(e), a.size === 0)) r.delete(e[t]);
        }
      }
    }
    query(e, t) {
      let r = this.#e.get(e);
      if (arguments.length === 2) {
        if (r.has(t)) return r.get(t);
        return new Set();
      }
      return r.keys();
    }
    has(e) {
      return super.get(e.location) === e;
    }
    set() {
      throw Error("direct set() not supported, use inventory.add(node)");
    }
  }
  Lhi.exports = hhi;
});