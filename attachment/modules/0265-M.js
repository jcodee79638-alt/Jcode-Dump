
class M {
  static PRECISION = 1e-4;
  focusOutline = null;
  toSVGPath() {
    $("Abstract method `toSVGPath` must be implemented.");
  }
  get box() {
    $("Abstract getter `box` must be implemented.");
  }
  serialize(t, e) {
    $("Abstract method `serialize` must be implemented.");
  }
  get defaultSVGProperties() {
    $("Abstract getter `defaultSVGProperties` must be implemented.");
  }
  get defaultProperties() {
    return this.defaultSVGProperties;
  }
  getFocusSVGProperties(t) {
    return null;
  }
  get focusMustRemoveSelfIntersections() {
    return !1;
  }
  updateProperty(t, e) {
    return null;
  }
  updateParentDimensions(t, e) {
    return null;
  }
  serializeQuadPoints(t, e) {
    return null;
  }
  updateRotation(t) {
    return {};
  }
  getPathResizingSVGProperties(t) {
    return {};
  }
  getPathResizedSVGProperties(t) {
    return {};
  }
  getPathTranslatedSVGProperties(t, e) {
    return {};
  }
  static _rotateBox([t, e, s, i], n) {
    switch (n) {
      case 90:
        return [1 - e - i, t, i, s];
      case 180:
        return [1 - t - s, 1 - e - i, s, i];
      case 270:
        return [e, 1 - t - s, i, s];
    }
    return [t, e, s, i];
  }
  static _rescale(t, e, s, i, n, r) {
    r ||= new Float32Array(t.length);
    for (let a = 0, o = t.length; a < o; a += 2) ((r[a] = e + t[a] * i), (r[a + 1] = s + t[a + 1] * n));
    return r;
  }
  static _rescaleAndSwap(t, e, s, i, n, r) {
    r ||= new Float32Array(t.length);
    for (let a = 0, o = t.length; a < o; a += 2) ((r[a] = e + t[a + 1] * i), (r[a + 1] = s + t[a] * n));
    return r;
  }
  static _translate(t, e, s, i) {
    i ||= new Float32Array(t.length);
    for (let n = 0, r = t.length; n < r; n += 2) ((i[n] = e + t[n]), (i[n + 1] = s + t[n + 1]));
    return i;
  }
  static svgRound(t) {
    return Math.round(t * 1e4);
  }
  static _normalizePoint(t, e, s, i, n) {
    switch (n) {
      case 90:
        return [1 - e / s, t / i];
      case 180:
        return [1 - t / s, 1 - e / i];
      case 270:
        return [e / s, 1 - t / i];
      default:
        return [t / s, e / i];
    }
  }
  static createBezierPoints(t, e, s, i, n, r) {
    return [(t + 5 * s) / 6, (e + 5 * i) / 6, (5 * s + n) / 6, (5 * i + r) / 6, (s + n) / 2, (i + r) / 2];
  }
}