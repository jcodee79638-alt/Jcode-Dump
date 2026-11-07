
class Ha {
  #t;
  #e;
  constructor(t, e, s, i, n, r, a) {
    ((this.#t = new si(t, e, s, i, n, r, a)), (this.#e = n));
  }
  add(t, e) {
    return this.#t.add(t, e) ? { path: { d: this.#t.toSVGPath() } } : null;
  }
  addPoints(t) {
    let e = !1;
    for (let s = 0, i = t.length; s < i; s += 2) e = this.#t.add(t[s], t[s + 1]) || e;
    return e ? { path: { d: this.#t.toSVGPath() } } : null;
  }
  end(t, e) {
    return t === void 0 ? null : this.add(t, e);
  }
  isEmpty() {
    return this.#t.isEmpty();
  }
  isCancellable() {
    return this.#t.isCancellable();
  }
  removeLastElement() {
    return this.#t.removeLastElement();
  }
  updateProperty(t, e) {
    return null;
  }
  getOutlines() {
    const t = this.#t.getOutlines();
    return (t.buildFocusOutline(2 * this.#e), t);
  }
  get defaultSVGProperties() {
    return {
      bbox: [0, 0, 1, 1],
      root: { viewBox: "0 0 1 1" },
      rootClass: { highlight: !0, free: !0 },
      path: { d: this.#t.toSVGPath() },
    };
  }
}