
class ei {
  #t = Object.create(null);
  updateProperty(t, e) {
    ((this[t] = e), this.updateSVGProperty(t, e));
  }
  updateProperties(t) {
    if (t) for (const [e, s] of Object.entries(t)) e.startsWith("_") || this.updateProperty(e, s);
  }
  updateSVGProperty(t, e) {
    this.#t[t] = e;
  }
  toSVGProperties() {
    const t = this.#t;
    return ((this.#t = Object.create(null)), { root: t });
  }
  reset() {
    this.#t = Object.create(null);
  }
  updateAll(t = this) {
    this.updateProperties(t);
  }
  clone() {
    $("Not implemented");
  }
}