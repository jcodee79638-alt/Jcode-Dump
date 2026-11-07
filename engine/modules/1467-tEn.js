
class tEn {
  #e;
  #r = new Map();
  #t = 0;
  #n;
  #i;
  #s;
  #a;
  constructor(e, t) {
    ((this.#e = e), (this.#s = new Ymt(!1, !1, t)), (this.#a = new Ymt(!1, !0, t)));
  }
  #c(e) {
    return { state: e, match: e.match, dead: e.dead, next: new Map() };
  }
  #H(e) {
    let t = eEn(e),
      r = this.#r.get(t);
    if (r) return r;
    if (this.#t > NJs) this.#f();
    let s = this.#c(e);
    return (this.#r.set(t, s), (this.#t += t.length + 1), s);
  }
  #f() {
    (this.#r.clear(), (this.#t = 0), (this.#n = void 0), (this.#i = void 0));
  }
  start(e) {
    if (e) {
      if (this.#i) return this.#i;
      let r = this.#a.state();
      return (this.#a.add(r, this.#e, 0, !0), (this.#i = this.#c(this.#a.done(r))));
    }
    if (this.#n) return this.#n;
    let t = this.#s.state();
    return (this.#s.add(t, this.#e, 0, !0), (this.#n = this.#H(this.#s.done(t))));
  }
  next(e, t) {
    let r = t.charCodeAt(0),
      s = r < 128 ? void 0 : e.next.get(t);
    if (s) return s;
    let a =
      e === this.#i ? this.#H(this.#a.step(e.state, t, 0, !0)) : this.#H(this.#s.step(e.state, t, 1, !0));
    if (r < 128) {
      if (!e.ascii) ((e.ascii = Array(128)), (this.#t += 128));
      e.ascii[r] = a;
    } else e.next.set(t, a);
    return (this.#t++, a);
  }
}