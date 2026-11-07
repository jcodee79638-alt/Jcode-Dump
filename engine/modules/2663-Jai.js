
var Jai = Ie(function (Hdc, Xai) {
  var HGo = qai(),
    { Minipass: cGo } = Ny();
  class Tpr extends Error {
    constructor(e, t) {
      super(e.message);
      Error.captureStackTrace(this, t || this.constructor);
    }
    get name() {
      return "JSONStreamError";
    }
  }
  var Gai = (e, t) =>
    typeof e === "string"
      ? String(t) === e
      : e && typeof e.test === "function"
        ? e.test(t)
        : typeof e === "boolean" || typeof e === "object"
          ? e
          : typeof e === "function"
            ? e(t)
            : !1;
  class vpr extends cGo {
    #e = 0;
    #r = !1;
    #t = null;
    #n = null;
    #i = null;
    #s;
    #a;
    #c = null;
    #H = null;
    constructor(e) {
      super({ ...e, objectMode: !0 });
      let t = (this.#a = new HGo());
      if (
        ((t.onValue = (r) => this.#o(r)),
        (this.#s = t.onToken),
        (t.onToken = (r, s) => this.#A(r, s)),
        (t.onError = (r) => this.#l(r)),
        (this.#c =
          typeof e.path === "string"
            ? e.path
                .split(".")
                .map((r) => (r === "$*" ? { emitKey: !0 } : r === "*" ? !0 : r === "" ? { recurse: !0 } : r))
            : Array.isArray(e.path) && e.path.length
              ? e.path
              : null),
        typeof e.map === "function")
      )
        this.#i = e.map;
    }
    #f(e, t) {
      if (this.#n !== !1) ((this.#n = this.#n || {}), (this.#n[e] = t));
      if (this.#t !== !1 && this.#n === !1) ((this.#t = this.#t || {}), (this.#t[e] = t));
    }
    #l(e) {
      let t = this.#r ? this.end : this.write;
      return ((this.#r = !1), this.emit("error", new Tpr(e, t)));
    }
    #A(e, t) {
      let r = this.#a;
      if ((this.#s.call(this.#a, e, t), r.stack.length === 0)) {
        if (this.#H) {
          let s = this.#H;
          if (!this.#c) super.write(s);
          ((this.#H = null), (this.#e = 0));
        }
      }
    }
    #o(e) {
      let t = this.#a;
      if (((this.#H = e), !this.#c)) return;
      let r = 0,
        s = 0,
        a = !1;
      while (r < this.#c.length) {
        let u = this.#c[r];
        if ((s++, u && !u.recurse)) {
          let f = s === t.stack.length ? t : t.stack[s];
          if (!f) return;
          if (!Gai(u, f.key)) {
            this.#f(f.key, e);
            return;
          }
          ((a = !!u.emitKey), r++);
        } else {
          if ((r++, r >= this.#c.length)) return;
          let f = this.#c[r];
          if (!f) return;
          while (!0) {
            let d = s === t.stack.length ? t : t.stack[s];
            if (!d) return;
            if (Gai(f, d.key)) {
              if ((r++, !Object.isFrozen(t.stack[s]))) t.stack[s].value = null;
              break;
            } else this.#f(d.key, e);
            s++;
          }
        }
      }
      if (this.#n) {
        let u = this.#n;
        ((this.#n = !1), this.emit("header", u));
      }
      if (s !== t.stack.length) return;
      this.#e++;
      let H = t.stack
        .slice(1)
        .map((u) => u.key)
        .concat([t.key]);
      if (e !== null && e !== void 0) {
        let u = this.#i ? this.#i(e, H) : e;
        if (u !== null && u !== void 0) {
          let f = a ? { value: u } : u;
          if (a) f.key = t.key;
          super.write(f);
        }
      }
      if (t.value) delete t.value[t.key];
      for (let u of t.stack) u.value = null;
    }
    write(e, t) {
      if (typeof e === "string") e = Buffer.from(e, t);
      else if (!Buffer.isBuffer(e))
        return this.emit("error", TypeError("Can only parse JSON from string or buffer input"));
      return (this.#a.write(e), this.flowing);
    }
    end(e, t) {
      if (((this.#r = !0), e)) this.write(e, t);
      let r = this.#n;
      this.#n = null;
      let s = this.#t;
      if (((this.#t = null), r)) this.emit("header", r);
      if (s) this.emit("footer", s);
      return super.end();
    }
    static get JSONStreamError() {
      return Tpr;
    }
    static parse(e, t) {
      return new vpr({ path: e, map: t });
    }
  }
  Xai.exports = vpr;
});