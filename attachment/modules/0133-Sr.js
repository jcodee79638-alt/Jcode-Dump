
class Sr extends Ji {
  #t;
  #e;
  #s;
  #i;
  #n;
  #a;
  #r = 0;
  constructor({ docId: t, ownerDocument: e = globalThis.document }) {
    (super(), (this.#i = t), (this.#n = e));
  }
  get #o() {
    return (this.#e ||= new Map());
  }
  get #l() {
    return (this.#a ||= new Map());
  }
  get #h() {
    if (!this.#s) {
      const t = this.#n.createElement("div"),
        { style: e } = t;
      ((e.colorScheme = "only light"),
        (e.visibility = "hidden"),
        (e.contain = "strict"),
        (e.width = e.height = 0),
        (e.position = "absolute"),
        (e.top = e.left = 0),
        (e.zIndex = -1));
      const s = this.#n.createElementNS(ct, "svg");
      (s.setAttribute("width", 0),
        s.setAttribute("height", 0),
        (this.#s = this.#n.createElementNS(ct, "defs")),
        t.append(s),
        s.append(this.#s),
        this.#n.body.append(t));
    }
    return this.#s;
  }
  #u(t) {
    const e = (r) => r && Array.from(r, (a) => a / 255).join(",");
    if (t.length === 1) {
      const r = e(t[0]);
      return [r, r, r];
    }
    const [s, i, n] = t;
    return [e(s), e(i), e(n)];
  }
  #d(t) {
    if (this.#t === void 0) {
      this.#t = "";
      const e = this.#n.URL;
      e !== this.#n.baseURI &&
        (ss(e) ? H('#createUrl: ignore "data:"-URL for performance reasons.') : (this.#t = $i(e, "")));
    }
    return `url(${this.#t}#${t})`;
  }
  addFilter(t) {
    if (!t) return "none";
    let e = this.#o.get(t);
    if (e) return e;
    const [s, i, n] = this.#u(t),
      r = t.length === 1 ? s : `${s}${i}${n}`;
    if (((e = this.#o.get(r)), e)) return (this.#o.set(t, e), e);
    const a = `g_${this.#i}_transfer_map_${this.#r++}`,
      o = this.#d(a);
    (this.#o.set(t, o), this.#o.set(r, o));
    const l = this.#m(a);
    return (this.#p(s, i, n, l), o);
  }
  addHCMFilter(t, e) {
    const s = `${t}-${e}`,
      i = "base";
    let n = this.#l.get(i);
    if (
      n?.key === s ||
      (n
        ? (n.filter?.remove(), (n.key = s), (n.url = "none"), (n.filter = null))
        : ((n = { key: s, url: "none", filter: null }), this.#l.set(i, n)),
      !t || !e)
    )
      return n.url;
    const r = this.#y(t);
    t = T.makeHexColor(...r);
    const a = this.#y(e);
    if (((e = T.makeHexColor(...a)), this.#v(), (t === "#000000" && e === "#ffffff") || t === e))
      return n.url;
    const l = Array.from({ length: 256 }, (f, p) => Is(p / 255)).join(","),
      h = `g_${this.#i}_hcm_filter`,
      d = (n.filter = this.#m(h));
    (this.#p(l, l, l, d), this.#g(d));
    const u = (f, p) => {
      const g = r[f] / 255,
        m = a[f] / 255,
        b = new Array(p + 1);
      for (let y = 0; y <= p; y++) b[y] = g + (y / p) * (m - g);
      return b.join(",");
    };
    return (this.#p(u(0, 5), u(1, 5), u(2, 5), d), (n.url = this.#d(h)), n.url);
  }
  addSelectionHCMFilter(t, e) {
    return this.addHighlightHCMFilter("selection", t, e, "HighlightText", "Highlight");
  }
  addSelectionFilter() {
    return this.addHighlightHCMFilter("selection_default", "black", "white", "HighlightText", "Highlight");
  }
  createSelectionStyle(t = null) {
    const e = t ? this.addSelectionHCMFilter(t.foreground, t.background) : this.addSelectionFilter();
    return e === "none" || !j.platform.isFirefox
      ? null
      : { "backdrop-filter": e, "background-color": "transparent" };
  }
  addAlphaFilter(t) {
    let e = this.#o.get(t);
    if (e) return e;
    const [s] = this.#u([t]),
      i = `alpha_${s}`;
    if (((e = this.#o.get(i)), e)) return (this.#o.set(t, e), e);
    const n = `g_${this.#i}_alpha_map_${this.#r++}`,
      r = this.#d(n);
    (this.#o.set(t, r), this.#o.set(i, r));
    const a = this.#m(n);
    return (this.#b(s, a), r);
  }
  addLuminosityFilter(t) {
    let e = this.#o.get(t || "luminosity");
    if (e) return e;
    let s, i;
    if ((t ? (([s] = this.#u([t])), (i = `luminosity_${s}`)) : (i = "luminosity"), (e = this.#o.get(i)), e))
      return (this.#o.set(t, e), e);
    const n = `g_${this.#i}_luminosity_map_${this.#r++}`,
      r = this.#d(n);
    (this.#o.set(t, r), this.#o.set(i, r));
    const a = this.#m(n);
    return (this.#f(a), t && this.#b(s, a), r);
  }
  addKnockoutFilter(t = 0) {
    const e = t > 0 ? Math.min(1 / t, 1e6) : 1e6,
      s = `knockout_${e}`,
      i = this.#o.get(s);
    if (i) return i;
    const n = `g_${this.#i}_knockout_filter_${this.#r++}`,
      r = this.#d(n);
    this.#o.set(s, r);
    const a = this.#m(n),
      o = this.#n.createElementNS(ct, "feComponentTransfer");
    a.append(o);
    const l = this.#n.createElementNS(ct, "feFuncA");
    return (
      l.setAttribute("type", "linear"),
      l.setAttribute("slope", `${e}`),
      l.setAttribute("intercept", "0"),
      o.append(l),
      r
    );
  }
  addHighlightHCMFilter(t, e, s, i, n) {
    const r = `${e}-${s}-${i}-${n}`;
    let a = this.#l.get(t);
    if (
      a?.key === r ||
      (a
        ? (a.filter?.remove(), (a.key = r), (a.url = "none"), (a.filter = null))
        : ((a = { key: r, url: "none", filter: null }), this.#l.set(t, a)),
      !e || !s)
    )
      return a.url;
    const [o, l] = [e, s].map(this.#y.bind(this));
    let h = Math.round(0.2126 * o[0] + 0.7152 * o[1] + 0.0722 * o[2]),
      d = Math.round(0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]),
      [u, f] = [i, n].map(this.#w.bind(this));
    (d < h && ([h, d, u, f] = [d, h, f, u]), this.#v());
    const p = (b, y, A) => {
        const w = new Array(256),
          v = (d - h) / A,
          S = b / 255,
          x = (y - b) / (255 * A);
        let _ = 0;
        for (let E = 0; E <= A; E++) {
          const P = Math.round(h + E * v),
            C = S + E * x;
          for (let R = _; R <= P; R++) w[R] = C;
          _ = P + 1;
        }
        for (let E = _; E < 256; E++) w[E] = w[_ - 1];
        return w.join(",");
      },
      g = `g_${this.#i}_hcm_${t}_filter`,
      m = (a.filter = this.#m(g));
    return (
      this.#g(m),
      this.#p(p(u[0], f[0], 5), p(u[1], f[1], 5), p(u[2], f[2], 5), m),
      (a.url = this.#d(g)),
      a.url
    );
  }
  destroy(t = !1) {
    (t && this.#a?.size) ||
      (this.#s?.parentNode.parentNode.remove(),
      (this.#s = null),
      this.#e?.clear(),
      (this.#e = null),
      this.#a?.clear(),
      (this.#a = null),
      (this.#r = 0));
  }
  #f(t) {
    const e = this.#n.createElementNS(ct, "feColorMatrix");
    (e.setAttribute("type", "matrix"),
      e.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0.59 0.11 0 0"),
      t.append(e));
  }
  #g(t) {
    const e = this.#n.createElementNS(ct, "feColorMatrix");
    (e.setAttribute("type", "matrix"),
      e.setAttribute(
        "values",
        "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0",
      ),
      t.append(e));
  }
  #m(t) {
    const e = this.#n.createElementNS(ct, "filter");
    return (
      e.setAttribute("color-interpolation-filters", "sRGB"),
      e.setAttribute("id", t),
      this.#h.append(e),
      e
    );
  }
  #c(t, e, s) {
    if (!s) return;
    const i = this.#n.createElementNS(ct, e);
    (i.setAttribute("type", "discrete"), i.setAttribute("tableValues", s), t.append(i));
  }
  #p(t, e, s, i) {
    const n = this.#n.createElementNS(ct, "feComponentTransfer");
    (i.append(n), this.#c(n, "feFuncR", t), this.#c(n, "feFuncG", e), this.#c(n, "feFuncB", s));
  }
  #b(t, e) {
    const s = this.#n.createElementNS(ct, "feComponentTransfer");
    (e.append(s), this.#c(s, "feFuncA", t));
  }
  #y(t) {
    return (
      (this.#h.style.color = "CanvasText"),
      (this.#h.style.backgroundColor = t),
      Ie(getComputedStyle(this.#h).getPropertyValue("background-color"))
    );
  }
  #A(t) {
    return (
      (this.#h.style.color = "CanvasText"),
      (this.#h.style.backgroundColor = t),
      ge(getComputedStyle(this.#h).getPropertyValue("background-color"))
    );
  }
  #v() {
    ((this.#h.style.color = ""), (this.#h.style.backgroundColor = ""));
  }
  #w(t) {
    const [e, s, i, n] = this.#A(t);
    if (n === 1) return [e, s, i];
    const [r, a, o] = this.#y("Canvas");
    return [bs(e, r, n), bs(s, a, n), bs(i, o, n)];
  }
}