
class Qi {
  #t = !1;
  constructor({ enableHWA: t = !1 }) {
    this.#t = t;
  }
  create(t, e) {
    if (t <= 0 || e <= 0) throw new Error("Invalid canvas size");
    const s = this._createCanvas(t, e);
    return { canvas: s, context: s.getContext("2d", { willReadFrequently: !this.#t }) };
  }
  reset({ canvas: t }, e, s) {
    if (!t) throw new Error("Canvas is not specified");
    if (e <= 0 || s <= 0) throw new Error("Invalid canvas size");
    ((t.width = e), (t.height = s));
  }
  destroy(t) {
    const { canvas: e } = t;
    if (!e) throw new Error("Canvas is not specified");
    ((e.width = e.height = 0), (t.canvas = null), (t.context = null));
  }
  _createCanvas(t, e) {
    $("Abstract method `_createCanvas` called.");
  }
}