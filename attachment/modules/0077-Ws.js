
class Ws {
  static _colorsMapping = new Map([
    ["CanvasText", [0, 0, 0]],
    ["Canvas", [255, 255, 255]],
  ]);
  get _colors() {
    const t = new Map([
      ["CanvasText", null],
      ["Canvas", null],
    ]);
    return (Vn(t), k(this, "_colors", t));
  }
  convert(t) {
    const e = Ie(t);
    if (!window.matchMedia("(forced-colors: active)").matches) return e;
    for (const [s, i] of this._colors) if (i.every((n, r) => n === e[r])) return Ws._colorsMapping.get(s);
    return e;
  }
  getHexCode(t) {
    const e = this._colors.get(t);
    return e ? T.makeHexColor(...e) : t;
  }
}