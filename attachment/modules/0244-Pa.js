
class Pa {
  #t = null;
  #e = this.#j.bind(this);
  #s = this.#S.bind(this);
  #i = this.#C.bind(this);
  #n = this.#G.bind(this);
  #a = null;
  #r = null;
  #o = null;
  #l = null;
  #h = null;
  #u = null;
  #d = null;
  #f = !1;
  #g = null;
  #m = null;
  #c = null;
  #p = null;
  #b = null;
  #y = null;
  #A = null;
  #v = null;
  #w = null;
  #x = null;
  #_ = !1;
  #E = null;
  #M = null;
  constructor({
    container: t,
    color: e,
    elements: s,
    titleObj: i,
    modificationDate: n,
    contentsObj: r,
    richText: a,
    parent: o,
    rect: l,
    parentRect: h,
    open: d,
    commentManager: u = null,
  }) {
    ((this.#r = t),
      (this.#w = i),
      (this.#o = r),
      (this.#v = a),
      (this.#u = o),
      (this.#a = e),
      (this.#A = l),
      (this.#d = h),
      (this.#h = s),
      (this.#t = u),
      (this.#E = s[0]),
      (this.#l = ks.toDateObject(n)),
      (this.trigger = s.flatMap((f) => f.getElementsToTriggerPopup())),
      u || (this.#k(), (this.#r.hidden = !0), d && this.#G()));
  }
  #k() {
    if (this.#m) return;
    this.#m = new AbortController();
    const { signal: t } = this.#m;
    for (const e of this.trigger)
      (e.addEventListener("click", this.#n, { signal: t }),
        e.addEventListener("pointerenter", this.#i, { signal: t }),
        e.addEventListener("pointerleave", this.#s, { signal: t }),
        e.classList.add("popupTriggerArea"));
    for (const e of this.#h) e.container?.addEventListener("keydown", this.#e, { signal: t });
  }
  #T() {
    const t = this.#h.find((e) => e.hasCommentButton);
    t && (this.#b = t._normalizePoint(t.commentButtonPosition));
  }
  renderCommentButton() {
    if (this.#p) {
      this.#p.parentNode || this.#E.container.after(this.#p);
      return;
    }
    if ((this.#b || this.#T(), !this.#b)) return;
    const { signal: t } = (this.#m = new AbortController()),
      e = this.#E.hasOwnCommentButton,
      s = () => {
        this.#t.toggleCommentPopup(this, !0, void 0, !e);
      },
      i = () => {
        this.#t.toggleCommentPopup(this, !1, !0, !e);
      },
      n = () => {
        this.#t.toggleCommentPopup(this, !1, !1);
      };
    if (e) {
      this.#p = this.#E.container;
      for (const r of this.trigger)
        ((r.ariaHasPopup = "dialog"),
          (r.ariaControls = "commentPopup"),
          r.addEventListener("keydown", this.#e, { signal: t }),
          r.addEventListener("click", s, { signal: t }),
          r.addEventListener("pointerenter", i, { signal: t }),
          r.addEventListener("pointerleave", n, { signal: t }),
          r.classList.add("popupTriggerArea"));
    } else {
      const r = (this.#p = document.createElement("button"));
      r.className = "annotationCommentButton";
      const a = this.#E.container;
      ((r.style.zIndex = parseInt(a.style.zIndex, 10) + 1),
        (r.tabIndex = 0),
        (r.ariaHasPopup = "dialog"),
        (r.ariaControls = "commentPopup"),
        r.setAttribute("data-l10n-id", "pdfjs-show-comment-button"),
        this.#I(),
        this.#F(),
        r.addEventListener("keydown", this.#e, { signal: t }),
        r.addEventListener("click", s, { signal: t }),
        r.addEventListener("pointerenter", i, { signal: t }),
        r.addEventListener("pointerleave", n, { signal: t }),
        a.after(r));
    }
  }
  #F() {
    if (this.#E.extraPopupElement && !this.#E.editor) return;
    this.#p || this.renderCommentButton();
    const [t, e] = this.#b,
      { style: s } = this.#p;
    ((s.left = `calc(${t}%)`), (s.top = `calc(${e}% - var(--comment-button-dim))`));
  }
  #I() {
    this.#E.extraPopupElement ||
      (this.#p || this.renderCommentButton(),
      (this.#p.style.backgroundColor = this.commentButtonColor || ""));
  }
  get commentButtonColor() {
    const { color: t, opacity: e } = this.#E.commentData;
    return t ? this.#u._commentManager.makeCommentColor(t, e) : null;
  }
  focusCommentButton() {
    setTimeout(() => {
      this.#p?.focus();
    }, 0);
  }
  getData() {
    const { richText: t, color: e, opacity: s, creationDate: i, modificationDate: n } = this.#E.commentData;
    return {
      contentsObj: { str: this.comment },
      richText: t,
      color: e,
      opacity: s,
      creationDate: i,
      modificationDate: n,
    };
  }
  get elementBeforePopup() {
    return this.#p;
  }
  get comment() {
    return ((this.#M ||= this.#E.commentText), this.#M);
  }
  set comment(t) {
    t !== this.comment && (this.#E.commentText = this.#M = t);
  }
  focus() {
    this.#E.container?.focus();
  }
  get parentBoundingClientRect() {
    return this.#E.layer.getBoundingClientRect();
  }
  setCommentButtonStates({ selected: t, hasPopup: e }) {
    this.#p && (this.#p.classList.toggle("selected", t), (this.#p.ariaExpanded = e));
  }
  setSelectedCommentButton(t) {
    this.#p.classList.toggle("selected", t);
  }
  get commentPopupPosition() {
    if (this.#y) return this.#y;
    const { x: t, y: e, height: s } = this.#p.getBoundingClientRect(),
      { x: i, y: n, width: r, height: a } = this.#E.layer.getBoundingClientRect();
    return [(t - i) / r, (e + s - n) / a];
  }
  set commentPopupPosition(t) {
    this.#y = t;
  }
  hasDefaultPopupPosition() {
    return this.#y === null;
  }
  get commentButtonPosition() {
    return this.#b;
  }
  get commentButtonWidth() {
    return this.#p.getBoundingClientRect().width / this.parentBoundingClientRect.width;
  }
  editComment(t) {
    const [e, s] = this.#y || this.commentButtonPosition.map((l) => l / 100),
      i = this.parentBoundingClientRect,
      { x: n, y: r, width: a, height: o } = i;
    this.#t.showDialog(null, this, n + e * a, r + s * o, { ...t, parentDimensions: i });
  }
  render() {
    if (this.#g) return;
    const t = (this.#g = document.createElement("div"));
    if (((t.className = "popup"), this.#a)) {
      const s = (t.style.outlineColor = T.makeHexColor(...this.#a));
      t.style.backgroundColor = `color-mix(in srgb, ${s} 30%, white)`;
    }
    const e = document.createElement("span");
    if (((e.className = "header"), this.#w?.str)) {
      const s = document.createElement("span");
      ((s.className = "title"), e.append(s), ({ dir: s.dir, str: s.textContent } = this.#w));
    }
    if ((t.append(e), this.#l)) {
      const s = document.createElement("time");
      ((s.className = "popupDate"),
        s.setAttribute("data-l10n-id", "pdfjs-annotation-date-time-string"),
        s.setAttribute("data-l10n-args", JSON.stringify({ dateObj: this.#l.valueOf() })),
        (s.dateTime = this.#l.toISOString()),
        e.append(s));
    }
    (Vi({ html: this.#O || this.#o.str, dir: this.#o?.dir, className: "popupContent" }, t),
      this.#r.append(t));
  }
  get #O() {
    const t = this.#v,
      e = this.#o;
    return (t?.str && (!e?.str || e.str === t.str) && this.#v.html) || null;
  }
  get #R() {
    return this.#O?.attributes?.style?.fontSize || 0;
  }
  get #D() {
    return this.#O?.attributes?.style?.color || null;
  }
  #N(t) {
    const e = [],
      s = {
        str: t,
        html: { name: "div", attributes: { dir: "auto" }, children: [{ name: "p", children: e }] },
      },
      i = {
        style: { color: this.#D, fontSize: this.#R ? `calc(${this.#R}px * var(--total-scale-factor))` : "" },
      };
    for (const n of t.split(`
`))
      e.push({ name: "span", value: n, attributes: i });
    return s;
  }
  #j(t) {
    t.altKey ||
      t.shiftKey ||
      t.ctrlKey ||
      t.metaKey ||
      ((t.key === "Enter" || (t.key === "Escape" && this.#f)) && this.#G());
  }
  updateEdited({ rect: t, popup: e, deleted: s }) {
    if (this.#t) {
      (s
        ? (this.remove(), (this.#M = null))
        : e && (e.deleted ? this.remove() : (this.#I(), (this.#M = e.text))),
        t && ((this.#b = null), this.#T(), this.#F()));
      return;
    }
    if (s || e?.deleted) {
      this.remove();
      return;
    }
    (this.#k(),
      (this.#x ||= { contentsObj: this.#o, richText: this.#v }),
      t && (this.#c = null),
      e && e.text && ((this.#v = this.#N(e.text)), (this.#l = ks.toDateObject(e.date)), (this.#o = null)),
      this.#g?.remove(),
      (this.#g = null));
  }
  resetEdited() {
    this.#x &&
      (({ contentsObj: this.#o, richText: this.#v } = this.#x),
      (this.#x = null),
      this.#g?.remove(),
      (this.#g = null),
      (this.#c = null));
  }
  remove() {
    if (
      (this.#m?.abort(),
      (this.#m = null),
      this.#g?.remove(),
      (this.#g = null),
      (this.#_ = !1),
      (this.#f = !1),
      this.#p?.remove(),
      (this.#p = null),
      this.trigger)
    )
      for (const t of this.trigger) t.classList.remove("popupTriggerArea");
  }
  #B() {
    if (this.#c !== null) return;
    const {
      page: { view: t },
      viewport: {
        rawDims: { pageWidth: e, pageHeight: s, pageX: i, pageY: n },
      },
    } = this.#u;
    let r = !!this.#d,
      a = r ? this.#d : this.#A;
    for (const p of this.#h)
      if (!a || T.intersect(p.data.rect, a) !== null) {
        ((a = p.data.rect), (r = !0));
        break;
      }
    const o = T.normalizeRect([a[0], t[3] - a[1] + t[1], a[2], t[3] - a[3] + t[1]]),
      h = r ? a[2] - a[0] + 5 : 0,
      d = o[0] + h,
      u = o[1];
    this.#c = [(100 * (d - i)) / e, (100 * (u - n)) / s];
    const { style: f } = this.#r;
    ((f.left = `${this.#c[0]}%`), (f.top = `${this.#c[1]}%`));
  }
  #G() {
    if (this.#t) {
      this.#t.toggleCommentPopup(this, !1);
      return;
    }
    ((this.#f = !this.#f),
      this.#f
        ? (this.#C(),
          this.#r.addEventListener("click", this.#n),
          this.#r.addEventListener("keydown", this.#e))
        : (this.#S(),
          this.#r.removeEventListener("click", this.#n),
          this.#r.removeEventListener("keydown", this.#e)));
  }
  #C() {
    (this.#g || this.render(),
      this.isVisible
        ? this.#f && this.#r.classList.add("focused")
        : (this.#B(),
          (this.#r.hidden = !1),
          (this.#r.style.zIndex = parseInt(this.#r.style.zIndex, 10) + 1e3)));
  }
  #S() {
    (this.#r.classList.remove("focused"),
      !(this.#f || !this.isVisible) &&
        ((this.#r.hidden = !0), (this.#r.style.zIndex = parseInt(this.#r.style.zIndex, 10) - 1e3)));
  }
  forceHide() {
    ((this.#_ = this.isVisible), this.#_ && (this.#r.hidden = !0));
  }
  maybeShow() {
    this.#t || (this.#k(), this.#_ && (this.#g || this.#C(), (this.#_ = !1), (this.#r.hidden = !1)));
  }
  get isVisible() {
    return !this.#t && this.#r.hidden === !1;
  }
}