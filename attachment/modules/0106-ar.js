
class ar {
  #t = new Set();
  #e = new Set();
  #s = null;
  constructor({ ownerDocument: t = globalThis.document, styleElement: e = null }) {
    ((this._document = t),
      (this.styleElement = null),
      (this.loadingRequests = []),
      (this.loadTestFontId = 0));
  }
  addNativeFontFace(t) {
    (this.#t.add(t), this._document.fonts.add(t));
  }
  removeNativeFontFace(t) {
    (this.#t.delete(t), this._document.fonts.delete(t));
  }
  insertRule(t) {
    const e = this.#i();
    e.insertRule(t, e.cssRules.length);
  }
  #i() {
    if (this.#s) return this.#s;
    const t = this._document.defaultView?.CSSStyleSheet || globalThis.CSSStyleSheet;
    if (!this.styleElement && t) {
      const { adoptedStyleSheets: e } = this._document;
      if (e) {
        const s = new t();
        return (e.push(s), (this.#s = s));
      }
    }
    return (
      this.styleElement ||
        ((this.styleElement = this._document.createElement("style")),
        this._document.documentElement.getElementsByTagName("head")[0].append(this.styleElement)),
      (this.#s = this.styleElement.sheet)
    );
  }
  clear() {
    for (const t of this.#t) this._document.fonts.delete(t);
    if ((this.#t.clear(), this.#e.clear(), this.#s)) {
      const { adoptedStyleSheets: t } = this._document;
      (t?.includes(this.#s) && (this._document.adoptedStyleSheets = t.filter((e) => e !== this.#s)),
        (this.#s = null));
    }
    (this.styleElement?.remove(), (this.styleElement = null));
  }
  async loadSystemFont({ systemFontInfo: t, disableFontFace: e, _inspectFont: s }) {
    if (!(!t || this.#e.has(t.loadedName))) {
      if (
        (tt(!e, "loadSystemFont shouldn't be called when `disableFontFace` is set."),
        this.isFontLoadingAPISupported)
      ) {
        const { loadedName: i, src: n, style: r } = t,
          a = new FontFace(i, n, r);
        this.addNativeFontFace(a);
        try {
          (await a.load(), this.#e.add(i), s?.(t));
        } catch {
          (H(
            `Cannot load system font: ${t.baseFontName}, installing it could help to improve PDF rendering.`,
          ),
            this.removeNativeFontFace(a));
        }
        return;
      }
      $("Not implemented: loadSystemFont without the Font Loading API.");
    }
  }
  async bind(t) {
    if (t.attached || (t.missingFile && !t.systemFontInfo)) return;
    if (((t.attached = !0), t.systemFontInfo)) {
      await this.loadSystemFont(t);
      return;
    }
    if (this.isFontLoadingAPISupported) {
      const s = t.createNativeFontFace();
      if (s) {
        this.addNativeFontFace(s);
        try {
          await s.loaded;
        } catch (i) {
          throw (H(`Failed to load font '${s.family}': '${i}'.`), (t.disableFontFace = !0), i);
        }
      }
      return;
    }
    const e = t.createFontFaceRule();
    if (e) {
      if ((this.insertRule(e), this.isSyncFontLoadingSupported)) return;
      await this.#n(t);
    }
  }
  get isFontLoadingAPISupported() {
    return k(this, "isFontLoadingAPISupported", !!this._document?.fonts);
  }
  get isSyncFontLoadingSupported() {
    return k(this, "isSyncFontLoadingSupported", mt || j.platform.isFirefox);
  }
  #n(t) {
    function e() {
      for (
        tt(!r.done, "completeRequest() cannot be called twice."), r.done = !0;
        s.length > 0 && s[0].done;
      ) {
        const E = s.shift();
        setTimeout(E.resolve, 0);
      }
    }
    const { loadingRequests: s } = this,
      { promise: i, resolve: n } = Promise.withResolvers(),
      r = { done: !1, resolve: n };
    (s.push(r),
      (this._loadTestFont ??= atob(
        "T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==",
      )));
    function a(E, P) {
      return (
        (E.charCodeAt(P) << 24) |
        (E.charCodeAt(P + 1) << 16) |
        (E.charCodeAt(P + 2) << 8) |
        (E.charCodeAt(P + 3) & 255)
      );
    }
    function o(E) {
      return String.fromCharCode((E >> 24) & 255, (E >> 16) & 255, (E >> 8) & 255, E & 255);
    }
    function l(E, P, C, R) {
      const L = E.substring(0, P),
        O = E.substring(P + C);
      return L + R + O;
    }
    let h, d;
    const u = this._document.createElement("canvas");
    ((u.width = 1), (u.height = 1));
    const f = u.getContext("2d");
    let p = 0;
    function g(E, P) {
      if (++p > 30) {
        (H("Load test font never loaded."), P());
        return;
      }
      if (((f.font = "30px " + E), f.fillText(".", 0, 20), f.getImageData(0, 0, 1, 1).data[3] > 0)) {
        P();
        return;
      }
      setTimeout(g.bind(null, E, P));
    }
    const m = `lt${Date.now()}${this.loadTestFontId++}`;
    let b = this._loadTestFont;
    b = l(b, 976, m.length, m);
    const A = 16,
      w = 1482184792;
    let v = a(b, A);
    for (h = 0, d = m.length - 3; h < d; h += 4) v = (v - w + a(m, h)) | 0;
    (h < m.length && (v = (v - w + a(m + "XXX", h)) | 0), (b = l(b, A, 4, o(v))));
    const S = `url(data:font/opentype;base64,${btoa(b)});`,
      x = `@font-face {font-family:"${m}";src:${S}}`;
    this.insertRule(x);
    const _ = this._document.createElement("div");
    ((_.style.visibility = "hidden"),
      (_.style.width = _.style.height = "10px"),
      (_.style.position = "absolute"),
      (_.style.top = _.style.left = "0px"));
    for (const E of [t.loadedName, m]) {
      const P = this._document.createElement("span");
      ((P.textContent = "Hi"), (P.style.fontFamily = E), _.append(P));
    }
    return (
      this._document.body.append(_),
      g(m, () => {
        (_.remove(), e());
      }),
      i
    );
  }
}