
var _It = Ie(function (Kfc, kni) {
  var wni = /[^^_`a-zA-Z\-0-9!#$%&'*+.|~]/,
    jfr = /[^\t\x20-\x7e\x80-\xff]/,
    g4e = (e) => {
      if (((e = `${e}`), wni.test(e) || e === "")) throw TypeError(`${e} is not a legal HTTP header name`);
    },
    Cni = (e) => {
      if (((e = `${e}`), jfr.test(e))) throw TypeError(`${e} is not a legal HTTP header value`);
    },
    ATe = (e, t) => {
      t = t.toLowerCase();
      for (let r in e) if (r.toLowerCase() === t) return r;
      return;
    },
    Fy = Symbol("map");
  class E4e {
    constructor(e = void 0) {
      if (((this[Fy] = Object.create(null)), e instanceof E4e)) {
        let t = e.raw(),
          r = Object.keys(t);
        for (let s of r) for (let a of t[s]) this.append(s, a);
        return;
      }
      if (e === void 0 || e === null) return;
      if (typeof e === "object") {
        let t = e[Symbol.iterator];
        if (t !== null && t !== void 0) {
          if (typeof t !== "function") throw TypeError("Header pairs must be iterable");
          let r = [];
          for (let s of e) {
            if (typeof s !== "object" || typeof s[Symbol.iterator] !== "function")
              throw TypeError("Each header pair must be iterable");
            let a = Array.from(s);
            if (a.length !== 2) throw TypeError("Each header pair must be a name/value tuple");
            r.push(a);
          }
          for (let s of r) this.append(s[0], s[1]);
        } else for (let r of Object.keys(e)) this.append(r, e[r]);
      } else throw TypeError("Provided initializer must be an object");
    }
    get(e) {
      ((e = `${e}`), g4e(e));
      let t = ATe(this[Fy], e);
      if (t === void 0) return null;
      return this[Fy][t].join(", ");
    }
    forEach(e, t = void 0) {
      let r = Pfr(this);
      for (let s = 0; s < r.length; s++) {
        let [a, H] = r[s];
        (e.call(t, H, a, this), (r = Pfr(this)));
      }
    }
    set(e, t) {
      ((e = `${e}`), (t = `${t}`), g4e(e), Cni(t));
      let r = ATe(this[Fy], e);
      this[Fy][r !== void 0 ? r : e] = [t];
    }
    append(e, t) {
      ((e = `${e}`), (t = `${t}`), g4e(e), Cni(t));
      let r = ATe(this[Fy], e);
      if (r !== void 0) this[Fy][r].push(t);
      else this[Fy][e] = [t];
    }
    has(e) {
      return ((e = `${e}`), g4e(e), ATe(this[Fy], e) !== void 0);
    }
    delete(e) {
      ((e = `${e}`), g4e(e));
      let t = ATe(this[Fy], e);
      if (t !== void 0) delete this[Fy][t];
    }
    raw() {
      return this[Fy];
    }
    keys() {
      return new o_e(this, "key");
    }
    values() {
      return new o_e(this, "value");
    }
    [Symbol.iterator]() {
      return new o_e(this, "key+value");
    }
    entries() {
      return new o_e(this, "key+value");
    }
    get [Symbol.toStringTag]() {
      return "Headers";
    }
    static exportNodeCompatibleHeaders(e) {
      let t = Object.assign(Object.create(null), e[Fy]),
        r = ATe(e[Fy], "Host");
      if (r !== void 0) t[r] = t[r][0];
      return t;
    }
    static createHeadersLenient(e) {
      let t = new E4e();
      for (let r of Object.keys(e)) {
        if (wni.test(r)) continue;
        if (Array.isArray(e[r]))
          for (let s of e[r]) {
            if (jfr.test(s)) continue;
            if (t[Fy][r] === void 0) t[Fy][r] = [s];
            else t[Fy][r].push(s);
          }
        else if (!jfr.test(e[r])) t[Fy][r] = [e[r]];
      }
      return t;
    }
  }
  Object.defineProperties(E4e.prototype, {
    get: { enumerable: !0 },
    forEach: { enumerable: !0 },
    set: { enumerable: !0 },
    append: { enumerable: !0 },
    has: { enumerable: !0 },
    delete: { enumerable: !0 },
    keys: { enumerable: !0 },
    values: { enumerable: !0 },
    entries: { enumerable: !0 },
  });
  var Pfr = (e, t = "key+value") =>
      Object.keys(e[Fy])
        .sort()
        .map(
          t === "key"
            ? (r) => r.toLowerCase()
            : t === "value"
              ? (r) => e[Fy][r].join(", ")
              : (r) => [r.toLowerCase(), e[Fy][r].join(", ")],
        ),
    bfr = Symbol("internal");
  class o_e {
    constructor(e, t) {
      this[bfr] = { target: e, kind: t, index: 0 };
    }
    get [Symbol.toStringTag]() {
      return "HeadersIterator";
    }
    next() {
      if (!this || Object.getPrototypeOf(this) !== o_e.prototype)
        throw TypeError("Value of `this` is not a HeadersIterator");
      let { target: e, kind: t, index: r } = this[bfr],
        s = Pfr(e, t),
        a = s.length;
      if (r >= a) return { value: void 0, done: !0 };
      return (this[bfr].index++, { value: s[r], done: !1 });
    }
  }
  Object.setPrototypeOf(o_e.prototype, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  kni.exports = E4e;
});