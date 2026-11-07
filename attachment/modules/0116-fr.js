
class fr {
  #t;
  #e;
  constructor(t) {
    ((this.#t = t), (this.#e = new DataView(t)));
  }
  #s(t) {
    tt(t < ne.bools.length, "Invalid boolean index");
    const e = Math.floor(t / 4),
      s = (t * 2) % 8,
      i = (this.#e.getUint8(e) >> s) & 3;
    return i === 0 ? void 0 : i === 2;
  }
  get black() {
    return k(this, "black", this.#s(0));
  }
  get bold() {
    return k(this, "bold", this.#s(1));
  }
  get disableFontFace() {
    return k(this, "disableFontFace", this.#s(2));
  }
  get fontExtraProperties() {
    return k(this, "fontExtraProperties", this.#s(3));
  }
  get isInvalidPDFjsFont() {
    return k(this, "isInvalidPDFjsFont", this.#s(4));
  }
  get isType3Font() {
    return k(this, "isType3Font", this.#s(5));
  }
  get italic() {
    return k(this, "italic", this.#s(6));
  }
  get missingFile() {
    return k(this, "missingFile", this.#s(7));
  }
  get remeasure() {
    return k(this, "remeasure", this.#s(8));
  }
  get vertical() {
    return k(this, "vertical", this.#s(9));
  }
  #i(t, e, s, i) {
    const n = this.#e.getUint8(t++);
    if (n === 0) return;
    tt(n === e, "Invalid array length.");
    const r = new Array(n);
    for (let a = 0; a < n; a++) ((r[a] = this.#e[s](t, !0)), (t += i));
    return r;
  }
  get bbox() {
    return k(this, "bbox", this.#i(ne.OFFSET_BBOX, 4, "getInt16", 2));
  }
  get fontMatrix() {
    return k(this, "fontMatrix", this.#i(ne.OFFSET_FONT_MATRIX, 6, "getFloat64", 8));
  }
  #n(t) {
    return (
      tt(t < ne.strings.length, "Invalid string index"),
      xe(this.#t, this.#e, t, ne.OFFSET_STRINGS + 4)
    );
  }
  get fallbackName() {
    return k(this, "fallbackName", this.#n(0));
  }
  get loadedName() {
    return k(this, "loadedName", this.#n(1));
  }
  #a(t) {
    let e = ne.OFFSET_STRINGS;
    for (let i = 0; i <= t; i++) e += 4 + this.#e.getUint32(e);
    const s = this.#e.getUint32(e);
    return { offset: e, length: s };
  }
  get data() {
    const { offset: t, length: e } = this.#a(2);
    return e ? new Uint8Array(this.#t, t + 4, e) : void 0;
  }
  clearData() {
    const { offset: t, length: e } = this.#a(2);
    e &&
      (this.#e.setUint32(t, 0),
      (this.#t = new Uint8Array(this.#t, 0, t + 4).slice().buffer),
      (this.#e = new DataView(this.#t)));
  }
  get cssFontInfo() {
    const { offset: t, length: e } = this.#a(1);
    let s = null;
    if (e) {
      const i = new Uint8Array(this.#t, t + 4, e).slice();
      s = new dr(i.buffer);
    }
    return k(this, "cssFontInfo", s);
  }
  get systemFontInfo() {
    const { offset: t, length: e } = this.#a(0);
    let s = null;
    if (e) {
      const i = new Uint8Array(this.#t, t + 4, e).slice();
      s = new ur(i.buffer);
    }
    return k(this, "systemFontInfo", s);
  }
}