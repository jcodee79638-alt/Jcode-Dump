
class N {
  #t = null;
  #e = new Map();
  #s = null;
  #i = null;
  #n = null;
  #a = null;
  #r = new Map();
  static #o = 0;
  static #l = 0;
  static #h = null;
  static #u = new Set();
  static #d = !1;
  static #f = new Set();
  static #g = new WeakMap();
  constructor({ filterFactory: t = null, pageColors: e = null, pageIndex: s, textLayer: i = null }) {
    if (((this.pageIndex = s), (this.#i = t), (this.#n = e), i)) {
      const n = N.#g.get(i);
      if (
        (n?.selectionDiv && (n.selectionDiv.remove(), N.#u.delete(n.selectionDiv)),
        N.#g.set(i, { drawLayer: this }),
        N.#f.add(i),
        (this.#s = i),
        (this.#a = new MutationObserver((r) => {
          if (!(!this.#t || !this.#s?.isConnected || !N.#c())) {
            for (const { addedNodes: a } of r)
              for (const o of a)
                if (o.nodeType === Node.ELEMENT_NODE && o.classList.contains("endOfContent")) {
                  N.#b();
                  return;
                }
          }
        })),
        this.#a.observe(i, { childList: !0 }),
        N.#h === null)
      ) {
        N.#h = new AbortController();
        const { signal: r } = N.#h;
        (document.addEventListener("selectionchange", N.#b.bind(N), { signal: r }),
          document.addEventListener(
            "pointerdown",
            () => {
              N.#d = !0;
            },
            { signal: r },
          ),
          document.addEventListener(
            "pointerup",
            () => {
              N.#d = !1;
            },
            { signal: r },
          ),
          window.addEventListener(
            "blur",
            () => {
              N.#d = !1;
            },
            { signal: r },
          ));
      }
    }
  }
  setParent(t) {
    if (!this.#t) {
      ((this.#t = t), this.#s?.isConnected && N.#c() && N.#b());
      return;
    }
    if (this.#t !== t) {
      if (this.#e.size > 0) for (const e of this.#e.values()) (e.remove(), t.append(e));
      this.#t = t;
    }
  }
  static #m(t) {
    const e = this.#g.get(t);
    e?.selectionDiv &&
      (e.selectionDiv.remove(), this.#u.delete(e.selectionDiv), (e.selectionDiv = null), (e.path = null));
  }
  static #c() {
    const t = document.getSelection();
    return !!t && !t.isCollapsed;
  }
  static #p() {
    return this.#f
      .keys()
      .filter((t) => t.isConnected)
      .toArray()
      .sort($a);
  }
  static #b() {
    const t = document.getSelection();
    if (!t || t.isCollapsed) {
      for (const r of this.#u) r.remove();
      this.#u.clear();
      return;
    }
    const e = new WeakMap(),
      s = this.#p(),
      i = [];
    for (let r = 0, a = t.rangeCount; r < a; r++) {
      const o = t.getRangeAt(r);
      if (o.collapsed) continue;
      let { startContainer: l, startOffset: h, endContainer: d, endOffset: u } = o,
        f = ze(l),
        p = ze(d);
      const g = f === null,
        m = p === null;
      if (this.#d && g !== m) return;
      if (t.rangeCount === 1) {
        const { anchorNode: A, anchorOffset: w, focusNode: v, focusOffset: S } = t,
          x = ze(A),
          _ = ze(v),
          E = za(A, w, v, S);
        x &&
          _ &&
          E !== null &&
          (E
            ? ((l = A), (h = w), (f = x), (d = v), (u = S), (p = _))
            : ((l = v), (h = S), (f = _), (d = A), (u = w), (p = x)));
      }
      const b = s.filter((A) => o.intersectsNode(A));
      if (b.length === 0) continue;
      let y = !1;
      if (
        (f || ((f = b[0]), (l = f), (h = 0), (y = !0)),
        p || ((p = b.at(-1)), (d = p), (u = p.childNodes.length), (y = !0)),
        d.nodeType === Node.ELEMENT_NODE)
      ) {
        if (d.classList.contains("endOfContent")) {
          const A = d.previousSibling;
          if (!A) continue;
          ((d = A), (u = A.nodeType === Node.TEXT_NODE ? A.textContent.length : A.childNodes.length));
        } else if (d.classList.contains("textLayer") && d.childNodes.length === u) {
          const A = Ui(d, u, p);
          if (!A) continue;
          ((d = A.container), (u = A.offset));
        }
      }
      if (l.nodeType === Node.ELEMENT_NODE) {
        const A = Ui(l, h, f);
        if (!A) continue;
        ((l = A.container), (h = A.offset));
      }
      if (f === p && !y && b.includes(f)) {
        i.push([o, f]);
        continue;
      }
      for (const A of b) {
        const w = A.firstChild;
        if (!w) continue;
        const v = document.createRange();
        if ((A === f ? v.setStart(l, h) : v.setStartBefore(w), A === p)) v.setEnd(d, u);
        else {
          const S = A.lastChild;
          if (!S) continue;
          if (S.nodeType === Node.ELEMENT_NODE && S.classList.contains("endOfContent")) {
            const x = S.previousSibling;
            if (!x) continue;
            v.setEndAfter(x);
          } else v.setEndAfter(S);
        }
        v.collapsed || i.push([v, A]);
      }
    }
    const n = new Set(i.map((r) => r[1]));
    for (const r of this.#f) n.has(r) || this.#m(r);
    for (const [r, a] of i) {
      const o = N.#g.get(a);
      if (!o) continue;
      let l = e.get(a);
      if (!l) {
        const p = a.getBoundingClientRect();
        ((l = (g, m, b, y) => ({
          x: (g - p.x) / p.width,
          y: (m - p.y) / p.height,
          width: b / p.width,
          height: y / p.height,
        })),
          e.set(a, l));
      }
      const h = [];
      for (let { x: p, y: g, width: m, height: b } of r.getClientRects())
        m === 0 ||
          b === 0 ||
          (({ x: p, y: g, width: m, height: b } = l(p, g, m, b)),
          !(m === 1 && b === 1) && h.push(`M${p} ${g} h${m} v${b} h-${m} Z`));
      if (h.length === 0) continue;
      const d = o.drawLayer;
      let u = o.selectionDiv,
        f = o.path;
      if (!u) {
        const p = `clip_selection_${N.#l++}`;
        ((u = document.createElement("div")), (u.className = "selection"), (u.style.clipPath = `url(#${p})`));
        const g = d.#i?.createSelectionStyle(d.#n);
        if (g) for (const [y, A] of Object.entries(g)) u.style.setProperty(y, A);
        const m = N._svgFactory.create(1, 1, !0);
        (m.setAttribute("aria-hidden", "true"),
          m.setAttribute("width", "100%"),
          m.setAttribute("height", "100%"));
        const b = N._svgFactory.createElement("clipPath");
        (b.setAttribute("id", p),
          b.setAttribute("clipPathUnits", "objectBoundingBox"),
          (f = N._svgFactory.createElement("path")),
          b.append(f),
          m.append(b),
          u.append(m),
          (o.path = f),
          (o.selectionDiv = u));
      }
      (d.#t && u.parentNode !== d.#t && (d.#t.append(u), this.#u.add(u)), f.setAttribute("d", h.join(" ")));
    }
  }
  static get _svgFactory() {
    return k(this, "_svgFactory", new qe());
  }
  static #y(t, [e, s, i, n]) {
    const { style: r } = t;
    ((r.top = `${100 * s}%`),
      (r.left = `${100 * e}%`),
      (r.width = `${100 * i}%`),
      (r.height = `${100 * n}%`));
  }
  #A() {
    const t = N._svgFactory.create(1, 1, !0);
    return (this.#t.append(t), t.setAttribute("aria-hidden", "true"), t);
  }
  #v(t, e) {
    const s = N._svgFactory.createElement("clipPath");
    t.append(s);
    const i = `clip_${e}`;
    (s.setAttribute("id", i), s.setAttribute("clipPathUnits", "objectBoundingBox"));
    const n = N._svgFactory.createElement("use");
    return (s.append(n), n.setAttribute("href", `#${e}`), n.classList.add("clip"), i);
  }
  #w(t, e) {
    for (const [s, i] of Object.entries(e)) i === null ? t.removeAttribute(s) : t.setAttribute(s, i);
  }
  draw(t, e = !1, s = !1) {
    const i = N.#o++,
      n = this.#A(),
      r = N._svgFactory.createElement("defs");
    n.append(r);
    const a = N._svgFactory.createElement("path");
    r.append(a);
    const o = `path_${i}`;
    (a.setAttribute("id", o), a.setAttribute("vector-effect", "non-scaling-stroke"), e && this.#r.set(i, a));
    const l = s ? this.#v(r, o) : null,
      h = N._svgFactory.createElement("use");
    return (
      n.append(h),
      h.setAttribute("href", `#${o}`),
      this.updateProperties(n, t),
      this.#e.set(i, n),
      { id: i, clipPathId: `url(#${l})` }
    );
  }
  drawOutline(t, e) {
    const s = N.#o++,
      i = this.#A(),
      n = N._svgFactory.createElement("defs");
    i.append(n);
    const r = N._svgFactory.createElement("path");
    n.append(r);
    const a = `path_${s}`;
    (r.setAttribute("id", a), r.setAttribute("vector-effect", "non-scaling-stroke"));
    let o;
    if (e) {
      const d = N._svgFactory.createElement("mask");
      (n.append(d),
        (o = `mask_${s}`),
        d.setAttribute("id", o),
        d.setAttribute("maskUnits", "objectBoundingBox"));
      const u = N._svgFactory.createElement("rect");
      (d.append(u),
        u.setAttribute("width", "1"),
        u.setAttribute("height", "1"),
        u.setAttribute("fill", "white"));
      const f = N._svgFactory.createElement("use");
      (d.append(f),
        f.setAttribute("href", `#${a}`),
        f.setAttribute("stroke", "none"),
        f.setAttribute("fill", "black"),
        f.setAttribute("fill-rule", "nonzero"),
        f.classList.add("mask"));
    }
    const l = N._svgFactory.createElement("use");
    (i.append(l), l.setAttribute("href", `#${a}`), o && l.setAttribute("mask", `url(#${o})`));
    const h = l.cloneNode();
    return (
      i.append(h),
      l.classList.add("mainOutline"),
      h.classList.add("secondaryOutline"),
      this.updateProperties(i, t),
      this.#e.set(s, i),
      s
    );
  }
  finalizeDraw(t, e) {
    (this.#r.delete(t), this.updateProperties(t, e));
  }
  updateProperties(t, e) {
    if (!e) return;
    const { root: s, bbox: i, rootClass: n, path: r } = e,
      a = typeof t == "number" ? this.#e.get(t) : t;
    if (a) {
      if ((s && this.#w(a, s), i && N.#y(a, i), n)) {
        const { classList: o } = a;
        for (const [l, h] of Object.entries(n)) o.toggle(l, h);
      }
      if (r) {
        const l = a.firstElementChild.firstElementChild;
        this.#w(l, r);
      }
    }
  }
  updateParent(t, e) {
    if (e === this) return;
    const s = this.#e.get(t);
    s && (e.#t.append(s), this.#e.delete(t), e.#e.set(t, s));
  }
  remove(t) {
    (this.#r.delete(t), this.#t !== null && (this.#e.get(t).remove(), this.#e.delete(t)));
  }
  destroy() {
    this.#t = null;
    for (const t of this.#e.values()) t.remove();
    (this.#e.clear(),
      this.#r.clear(),
      this.#a?.disconnect(),
      (this.#a = null),
      this.#s &&
        (N.#g.get(this.#s)?.drawLayer === this &&
          (N.#m(this.#s),
          N.#g.delete(this.#s),
          N.#f.delete(this.#s),
          N.#f.size === 0 && (N.#h?.abort(), (N.#h = null), (N.#d = !1))),
        (this.#s = null)));
  }
}