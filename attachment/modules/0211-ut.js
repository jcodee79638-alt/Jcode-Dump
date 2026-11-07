
class ut {
  #t = Promise.withResolvers();
  #e = null;
  #s = !1;
  #i = !!globalThis.FontInspector?.enabled;
  #n = null;
  #a = null;
  #r = null;
  #o = 0;
  #l = 0;
  #h = _t.pixelRatio;
  #u = null;
  #d = null;
  #f = 0;
  #g = 0;
  #m = Object.create(null);
  #c = [];
  #p = null;
  #b = [];
  #y = new WeakMap();
  #A = null;
  static #v = new Map();
  static #w = new Map();
  static #x = new WeakMap();
  static #_ = null;
  static #E = new Set();
  constructor({ textContentSource: t, images: e, container: s, viewport: i }) {
    if (t instanceof ReadableStream) this.#p = t;
    else if (typeof t == "object")
      this.#p = new ReadableStream({
        start(l) {
          (l.enqueue(t), l.close());
        },
      });
    else throw new Error('No "textContentSource" parameter specified.');
    ((this.#e = this.#d = s),
      (this.#n = e),
      (this.#g = i.scale * this.#h),
      (this.#f = i.rotation),
      (this.#r = { div: null, properties: null, ctx: null }));
    const { pageWidth: n, pageHeight: r, pageX: a, pageY: o } = i.rawDims;
    ((this.#A = [1, 0, 0, -1, -a, o + r]),
      (this.#l = n),
      (this.#o = r),
      ut.#R(),
      s.style.setProperty("--min-font-size", ut.#_),
      Qt(s, i),
      this.#t.promise
        .finally(() => {
          (ut.#E.delete(this), (this.#r = null), (this.#m = null));
        })
        .catch(() => {}));
  }
  static get fontFamilyMap() {
    const { isWindows: t, isFirefox: e } = j.platform;
    return k(
      this,
      "fontFamilyMap",
      new Map([
        ["sans-serif", `${t && e ? "Calibri, " : ""}sans-serif`],
        ["monospace", `${t && e ? "Lucida Console, " : ""}monospace`],
      ]),
    );
  }
  render() {
    this.#n && this.#e.append(this.#n.render());
    const t = () => {
      this.#u.read().then(({ value: e, done: s }) => {
        if (s) {
          this.#t.resolve();
          return;
        }
        ((this.#a ??= e.lang), Object.assign(this.#m, e.styles), this.#M(e.items), t());
      }, this.#t.reject);
    };
    return ((this.#u = this.#p.getReader()), ut.#E.add(this), t(), this.#t.promise);
  }
  update({ viewport: t, onBefore: e = null }) {
    const s = t.scale * _t.pixelRatio,
      i = t.rotation;
    if ((i !== this.#f && (e?.(), (this.#f = i), Qt(this.#d, { rotation: i })), s !== this.#g)) {
      (e?.(), (this.#g = s), (this.#h = _t.pixelRatio));
      const n = { div: null, properties: null, ctx: ut.#F(this.#a) };
      for (const r of this.#b) ((n.properties = this.#y.get(r)), (n.div = r), this.#T(n));
    }
  }
  cancel() {
    const t = new zt("TextLayer task cancelled.");
    (this.#u?.cancel(t).catch(() => {}), (this.#u = null), this.#t.reject(t));
  }
  get textDivs() {
    return this.#b;
  }
  get textContentItemsStr() {
    return this.#c;
  }
  #M(t) {
    if (this.#s) return;
    this.#r.ctx ??= ut.#F(this.#a);
    const e = this.#b,
      s = this.#c;
    for (const i of t) {
      if (e.length > ca) {
        (H("Ignoring additional textDivs for performance reasons."), (this.#s = !0));
        return;
      }
      if (i.str === void 0) {
        if (i.type === "beginMarkedContentProps" || i.type === "beginMarkedContent") {
          const n = this.#e;
          ((this.#e = document.createElement("span")),
            this.#e.classList.add("markedContent"),
            i.id && this.#e.setAttribute("id", i.id),
            i.tag === "Artifact" && (this.#e.ariaHidden = !0),
            n.append(this.#e));
        } else i.type === "endMarkedContent" && (this.#e = this.#e.parentNode);
        continue;
      }
      (s.push(i.str), this.#k(i));
    }
  }
  #k(t) {
    const e = document.createElement("span"),
      s = { angle: 0, canvasWidth: 0, hasText: t.str !== "", hasEOL: t.hasEOL, fontSize: 0 };
    this.#b.push(e);
    const i = T.transform(this.#A, t.transform);
    let n = Math.atan2(i[1], i[0]);
    const r = this.#m[t.fontName];
    r.vertical && (n += Math.PI / 2);
    let a = (this.#i && r.fontSubstitution) || r.fontFamily;
    a = ut.fontFamilyMap.get(a) || a;
    const o = Math.hypot(i[2], i[3]),
      l = o * ut.#D(a, r, this.#a);
    let h, d;
    n === 0 ? ((h = i[4]), (d = i[5] - l)) : ((h = i[4] + l * Math.sin(n)), (d = i[5] - l * Math.cos(n)));
    const u = e.style;
    ((u.left = `${((100 * h) / this.#l).toFixed(2)}%`), (u.top = `${((100 * d) / this.#o).toFixed(2)}%`));
    const f = Math.round(o * 100) / 100;
    (u.setProperty("--font-height", `${f}px`),
      (u.fontFamily = a),
      (s.fontSize = f),
      e.setAttribute("role", "presentation"),
      (e.textContent = t.str),
      (e.dir = t.dir),
      this.#i && (e.dataset.fontName = r.fontSubstitutionLoadedName || t.fontName),
      n !== 0 && (s.angle = n * (180 / Math.PI)));
    let p = !1;
    if (t.str.length > 1) p = !0;
    else if (t.str !== " " && t.transform[0] !== t.transform[3]) {
      const g = Math.abs(t.transform[0]),
        m = Math.abs(t.transform[3]);
      g !== m && Math.max(g, m) / Math.min(g, m) > 1.5 && (p = !0);
    }
    if (
      (p && (s.canvasWidth = r.vertical ? t.height : t.width),
      this.#y.set(e, s),
      (this.#r.div = e),
      (this.#r.properties = s),
      this.#T(this.#r),
      s.hasText && this.#e.append(e),
      s.hasEOL)
    ) {
      const g = document.createElement("br");
      (g.setAttribute("role", "presentation"), this.#e.append(g));
    }
  }
  #T(t) {
    const { div: e, properties: s, ctx: i } = t,
      { style: n } = e,
      { canvasWidth: r, fontSize: a } = s;
    if (r !== 0 && a !== 0 && s.hasText) {
      const { fontFamily: o } = n,
        l = this.#h,
        h = ut.#I((a * this.#g) / l) * l;
      ut.#O(i, h, o);
      const { width: d } = i.measureText(e.textContent);
      d > 0 && n.setProperty("--scale-x", (r * h) / (d * a));
    }
    s.angle !== 0 && n.setProperty("--rotate", `${s.angle}deg`);
  }
  static cleanup() {
    if (!(this.#E.size > 0)) {
      this.#v.clear();
      for (const { canvas: t } of this.#w.values()) t.remove();
      this.#w.clear();
    }
  }
  static #F(t = null) {
    let e = this.#w.get((t ||= ""));
    if (!e) {
      const s = document.createElement("canvas");
      ((s.style.cssText =
        "position:absolute;top:0;left:0;width:0;height:0;display:none;letter-spacing:normal;word-spacing:normal"),
        (s.lang = t),
        document.body.append(s),
        (e = s.getContext("2d", { alpha: !1, willReadFrequently: !0 })),
        this.#w.set(t, e),
        this.#x.set(e, { size: 0, family: "" }));
    }
    return e;
  }
  static #I(t) {
    t = Math.fround(t);
    const e = Math.fround(t * ((1 << 17) + 1));
    return Math.fround(e - Math.fround(e - t));
  }
  static #O(t, e, s) {
    const i = this.#x.get(t);
    (e === i.size && s === i.family) || ((t.font = `${e}px ${s}`), (i.size = e), (i.family = s));
  }
  static #R() {
    if (this.#_ !== null) return;
    const t = document.createElement("div");
    ((t.style.opacity = 0),
      (t.style.lineHeight = 1),
      (t.style.fontSize = "1px"),
      (t.style.position = "absolute"),
      (t.textContent = "X"),
      document.body.append(t),
      (this.#_ = t.getBoundingClientRect().height),
      t.remove());
  }
  static #D(t, e, s) {
    const i = this.#v.get(t);
    if (i) return i;
    const n = this.#F(s);
    this.#O(n, da, t);
    const r = n.measureText(""),
      a = r.fontBoundingBoxAscent,
      o = Math.abs(r.fontBoundingBoxDescent);
    let l = 0.8;
    return (
      a
        ? (l = a / (a + o))
        : (j.platform.isFirefox &&
            H(
              "Enable the `dom.textMetrics.fontBoundingBox.enabled` preference in `about:config` to improve TextLayer rendering.",
            ),
          e.ascent ? (l = e.ascent) : e.descent && (l = 1 + e.descent)),
      this.#v.set(t, l),
      l
    );
  }
}