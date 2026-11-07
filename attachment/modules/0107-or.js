
class or {
  #t = new Map();
  #e;
  constructor(t, e = null, s, i) {
    ((this.#e = t),
      (this._inspectFont = e),
      s && (this.charProcOperatorList = s),
      i && Object.assign(this, i));
  }
  createNativeFontFace() {
    const { data: t } = this;
    if (!t || this.disableFontFace) return null;
    let e;
    if (!this.cssFontInfo) e = new FontFace(this.loadedName, t, {});
    else {
      const s = { weight: this.cssFontInfo.fontWeight };
      (this.cssFontInfo.italicAngle && (s.style = `oblique ${this.cssFontInfo.italicAngle}deg`),
        (e = new FontFace(Ei(this.cssFontInfo.fontFamily), t, s)));
    }
    return (this._inspectFont?.(this), e);
  }
  createFontFaceRule() {
    const { data: t } = this;
    if (!t || this.disableFontFace) return null;
    const e = `url(data:${this.mimetype};base64,${t.toBase64()});`;
    let s;
    if (!this.cssFontInfo) s = `@font-face {font-family:"${this.loadedName}";src:${e}}`;
    else {
      let i = `font-weight: ${this.cssFontInfo.fontWeight};`;
      (this.cssFontInfo.italicAngle && (i += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`),
        (s = `@font-face {font-family:${Ei(this.cssFontInfo.fontFamily)};${i}src:${e}}`));
    }
    return (this._inspectFont?.(this, e), s);
  }
  getPathGenerator(t, e) {
    let s = this.#t.get(e);
    if (s) return s;
    const i = `${this.loadedName}_path_${e}`;
    let n;
    try {
      n = t.get(i);
    } catch (r) {
      H(`getPathGenerator - ignoring character: "${r}".`);
    }
    return ((s = Wi(n?.path)), this.fontExtraProperties || t.delete(i), this.#t.set(e, s), s);
  }
  get black() {
    return this.#e.black;
  }
  get bold() {
    return this.#e.bold;
  }
  get disableFontFace() {
    return this.#e.disableFontFace;
  }
  set disableFontFace(t) {
    k(this, "disableFontFace", !!t);
  }
  get fontExtraProperties() {
    return this.#e.fontExtraProperties;
  }
  get isInvalidPDFjsFont() {
    return this.#e.isInvalidPDFjsFont;
  }
  get isType3Font() {
    return this.#e.isType3Font;
  }
  get italic() {
    return this.#e.italic;
  }
  get missingFile() {
    return this.#e.missingFile;
  }
  get remeasure() {
    return this.#e.remeasure;
  }
  get vertical() {
    return this.#e.vertical;
  }
  get bbox() {
    return this.#e.bbox;
  }
  get fontMatrix() {
    return this.#e.fontMatrix;
  }
  get fallbackName() {
    return this.#e.fallbackName;
  }
  get loadedName() {
    return this.#e.loadedName;
  }
  get mimetype() {
    return this.missingFile ? null : "font/opentype";
  }
  get data() {
    return this.#e.data;
  }
  clearData() {
    this.#e.clearData();
  }
  get cssFontInfo() {
    return this.#e.cssFontInfo;
  }
  get systemFontInfo() {
    return this.#e.systemFontInfo;
  }
}