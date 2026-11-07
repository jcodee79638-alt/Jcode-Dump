
class _t {
  constructor() {
    const { pixelRatio: t } = _t;
    ((this.sx = t), (this.sy = t));
  }
  get scaled() {
    return this.sx !== 1 || this.sy !== 1;
  }
  get symmetric() {
    return this.sx === this.sy;
  }
  limitCanvas(t, e, s, i, n = -1) {
    let r = 1 / 0,
      a = 1 / 0,
      o = 1 / 0;
    ((s = _t.capPixels(s, n)), s > 0 && (r = Math.sqrt(s / (t * e))), i !== -1 && ((a = i / t), (o = i / e)));
    const l = Math.min(r, a, o);
    return this.sx > l || this.sy > l ? ((this.sx = l), (this.sy = l), !0) : !1;
  }
  static get pixelRatio() {
    return globalThis.devicePixelRatio || 1;
  }
  static capPixels(t, e) {
    if (e >= 0) {
      const s = Math.ceil(
        window.screen.availWidth * window.screen.availHeight * this.pixelRatio ** 2 * (1 + e / 100),
      );
      return t > 0 ? Math.min(t, s) : s;
    }
    return t;
  }
}