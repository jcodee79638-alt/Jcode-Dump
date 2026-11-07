
class Me {
  constructor({
    viewBox: t,
    userUnit: e,
    scale: s,
    rotation: i,
    offsetX: n = 0,
    offsetY: r = 0,
    dontFlip: a = !1,
  }) {
    ((this.viewBox = t),
      (this.userUnit = e),
      (this.scale = s),
      (this.rotation = i),
      (this.offsetX = n),
      (this.offsetY = r),
      (s *= e));
    const o = (t[2] + t[0]) / 2,
      l = (t[3] + t[1]) / 2;
    let h, d, u, f;
    switch (((i %= 360), i < 0 && (i += 360), i)) {
      case 180:
        ((h = -1), (d = 0), (u = 0), (f = 1));
        break;
      case 90:
        ((h = 0), (d = 1), (u = 1), (f = 0));
        break;
      case 270:
        ((h = 0), (d = -1), (u = -1), (f = 0));
        break;
      case 0:
        ((h = 1), (d = 0), (u = 0), (f = -1));
        break;
      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
    }
    a && ((u = -u), (f = -f));
    let p, g, m, b;
    (h === 0
      ? ((p = Math.abs(l - t[1]) * s + n),
        (g = Math.abs(o - t[0]) * s + r),
        (m = (t[3] - t[1]) * s),
        (b = (t[2] - t[0]) * s))
      : ((p = Math.abs(o - t[0]) * s + n),
        (g = Math.abs(l - t[1]) * s + r),
        (m = (t[2] - t[0]) * s),
        (b = (t[3] - t[1]) * s)),
      (this.transform = [h * s, d * s, u * s, f * s, p - h * s * o - u * s * l, g - d * s * o - f * s * l]),
      (this.width = m),
      (this.height = b));
  }
  get rawDims() {
    const t = this.viewBox;
    return k(this, "rawDims", { pageWidth: t[2] - t[0], pageHeight: t[3] - t[1], pageX: t[0], pageY: t[1] });
  }
  clone({
    scale: t = this.scale,
    rotation: e = this.rotation,
    offsetX: s = this.offsetX,
    offsetY: i = this.offsetY,
    dontFlip: n = !1,
  } = {}) {
    return new Me({
      viewBox: this.viewBox.slice(),
      userUnit: this.userUnit,
      scale: t,
      rotation: e,
      offsetX: s,
      offsetY: i,
      dontFlip: n,
    });
  }
  convertToViewportPoint(t, e) {
    const s = [t, e];
    return (T.applyTransform(s, this.transform), s);
  }
  convertToPdfPoint(t, e) {
    const s = [t, e];
    return (T.applyInverseTransform(s, this.transform), s);
  }
}