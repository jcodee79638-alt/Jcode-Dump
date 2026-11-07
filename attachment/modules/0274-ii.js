
class ii extends mn {
  static #t = 1.5;
  newOutliner(t, e, s, i, n, r, a = 0) {
    return new si(t, e, s, i, n, r, a);
  }
  get isFree() {
    return !0;
  }
  buildFocusOutline(t) {
    this.focusOutline = this.getNewOutline(t / 2 + ii.#t, 0.0025);
  }
  get defaultSVGProperties() {
    return bn(this);
  }
  getFocusSVGProperties(t) {
    return yn(this, t);
  }
  get focusMustRemoveSelfIntersections() {
    return !0;
  }
  updateRotation(t) {
    return { root: { "data-main-rotation": t } };
  }
  updateProperty(t, e) {
    if (t !== "thickness") return null;
    const s = this.updateThickness(e / 2);
    return (this.buildFocusOutline(e), s);
  }
  getPathResizedSVGProperties() {
    return { path: { d: this.toSVGPath() } };
  }
}