
class ti {
  #t = null;
  #e = null;
  #s = null;
  #i = new Map();
  #n = null;
  #a = null;
  #r = [];
  #o = !1;
  zIndex = 0;
  constructor({
    div: t,
    accessibilityManager: e,
    annotationCanvasMap: s,
    annotationEditorUIManager: i,
    page: n,
    viewport: r,
    structTreeLayer: a,
    commentManager: o,
    linkService: l,
    annotationStorage: h,
  }) {
    ((this.div = t),
      (this.#t = e),
      (this.#e = s),
      (this.#n = a || null),
      (this.#a = l || null),
      (this.#s = h || new Xs()),
      (this.page = n),
      (this.viewport = r),
      (this._annotationEditorUIManager = i),
      (this._commentManager = o || null));
  }
  hasEditableAnnotations() {
    return this.#i.size > 0;
  }
  async render(t) {
    const { annotations: e, optionalContentConfig: s } = t,
      i = this.div;
    Qt(i, this.viewport);
    const n = new Map(),
      r = [],
      a = {
        data: null,
        layer: i,
        linkService: this.#a,
        downloadManager: t.downloadManager,
        imageResourcesPath: t.imageResourcesPath || "",
        renderForms: t.renderForms !== !1,
        svgFactory: new qe(),
        annotationStorage: this.#s,
        enableComment: t.enableComment === !0,
        enableScripting: t.enableScripting === !0,
        hasJSActions: t.hasJSActions,
        fieldObjects: t.fieldObjects,
        parent: this,
        elements: null,
      };
    for (const o of e) {
      if (o.noHTML) continue;
      const l = o.annotationType === Z.POPUP;
      if (l) {
        const u = n.get(o.id);
        if (!u) continue;
        if (!this._commentManager) {
          r.push(o);
          continue;
        }
        a.elements = u;
      } else if (o.rect[2] === o.rect[0] || o.rect[3] === o.rect[1]) continue;
      a.data = o;
      const h = As.create(a);
      if (!h.isRenderable) continue;
      l || (this.#r.push(h), o.popupRef && n.getOrInsertComputed(o.popupRef, pe).push(h));
      const d = h.render();
      (o.hidden && (d.style.visibility = "hidden"),
        h.updateOC(s),
        h._isEditable &&
          (this.#i.set(h.data.id, h), this._annotationEditorUIManager?.renderAnnotationElement(h)));
    }
    await this.#l();
    for (const o of r) {
      const l = (a.elements = n.get(o.id));
      a.data = o;
      const h = As.create(a);
      if (!h.isRenderable) continue;
      const d = h.render();
      ((h.contentElement.id = `${le}${o.id}`),
        o.hidden && (d.style.visibility = "hidden"),
        l.at(-1).container.after(d));
    }
    this.#h();
  }
  async #l() {
    if (this.#r.length === 0) return;
    this.div.replaceChildren();
    const t = [];
    if (!this.#o) {
      this.#o = !0;
      for (const {
        contentElement: s,
        data: { hidden: i, id: n, oc: r },
      } of this.#r) {
        const a = (s.id = `${le}${n}`),
          o = s.localName === "a" && !i && !r;
        t.push(
          this.#n?.getAriaAttributes(a, { enableLinkOwnership: o }).then((l) => {
            if (l) for (const [h, d] of l) s.setAttribute(h, d);
          }),
        );
      }
    }
    this.#r.sort(
      (
        {
          data: {
            rect: [s, i, n, r],
          },
        },
        {
          data: {
            rect: [a, o, l, h],
          },
        },
      ) => {
        if (s === n && i === r) return 1;
        if (a === l && o === h) return -1;
        const d = r,
          u = i,
          f = (i + r) / 2,
          p = h,
          g = o,
          m = (o + h) / 2;
        if (f >= p && m <= u) return -1;
        if (m >= d && f <= g) return 1;
        const b = (s + n) / 2,
          y = (a + l) / 2;
        return b - y;
      },
    );
    const e = document.createDocumentFragment();
    for (const s of this.#r)
      (e.append(s.container),
        this._commentManager
          ? (s.extraPopupElement?.popup || s.popup)?.renderCommentButton()
          : s.extraPopupElement && e.append(s.extraPopupElement.render()));
    if ((this.div.append(e), await Promise.all(t), this.#t)) {
      const s = await this.#n?.getAnnotationIds();
      for (const { contentElement: i } of this.#r) s?.has(i.id) || this.#t.addPointerInTextLayer(i, !1);
    }
  }
  async addLinkAnnotations(t) {
    const e = { data: null, layer: this.div, linkService: this.#a, svgFactory: new qe(), parent: this };
    for (const s of t) {
      ((s.borderStyle ||= ti._defaultBorderStyle), (e.data = s));
      const i = As.create(e);
      i.isRenderable && (i.render(), (i.contentElement.id = `${le}${s.id}`), this.#r.push(i));
    }
    await this.#l();
  }
  update({ viewport: t, optionalContentConfig: e }) {
    const s = this.div;
    ((this.viewport = t), Qt(s, { rotation: t.rotation }));
    for (const i of this.#r) i.updateOC(e);
    (this.#h(), (s.hidden = !1));
  }
  destroy() {
    for (const t of this.#r) (t.destroy?.(), this.#t?.removePointerInTextLayer(t.contentElement));
    ((this.#r.length = 0), this.#i.clear(), this.div.replaceChildren());
  }
  #h() {
    if (!this.#e) return;
    const t = this.div;
    for (const [e, s] of this.#e) {
      const i = t.querySelector(`[data-annotation-id="${e}"]`);
      if (!i) continue;
      if (Array.isArray(s)) for (const l of s) ((l.className = "annotationContent"), (l.ariaHidden = !0));
      else ((s.className = "annotationContent"), (s.ariaHidden = !0));
      const n = [];
      for (const l of i.children) l.nodeName === "CANVAS" && n.push(l);
      for (const l of n) l.remove();
      const r = Array.isArray(s) ? s[0] : s,
        { firstChild: a } = i;
      if (
        (a ? (a.classList.contains("annotationContent") ? a.after(r) : a.before(r)) : i.append(r),
        Array.isArray(s))
      ) {
        let l = r;
        for (let h = 1, d = s.length; h < d; h++) (l.after(s[h]), (l = s[h]));
      }
      this.#e.delete(e);
      const o = this.#i.get(e);
      o &&
        (o._hasNoCanvas
          ? (this._annotationEditorUIManager?.setMissingCanvas(e, i.id, s), (o._hasNoCanvas = !1))
          : (o.canvas = s));
    }
  }
  refreshCanvases() {
    this.#h();
  }
  getEditableAnnotations() {
    return this.#i.values();
  }
  getEditableAnnotation(t) {
    return this.#i.get(t);
  }
  addFakeAnnotation(t) {
    const { div: e } = this,
      { id: s, rotation: i } = t,
      n = new wa({
        data: { id: s, rect: t.getPDFRect(), rotation: i },
        editor: t,
        layer: e,
        parent: this,
        enableComment: !!this._commentManager,
        linkService: this.#a,
        annotationStorage: this.#s,
      });
    return (n.render(), (n.contentElement.id = `${le}${s}`), n.createOrUpdatePopup(), this.#r.push(n), n);
  }
  removeAnnotation(t) {
    const e = this.#r.findIndex((i) => i.data.id === t);
    if (e < 0) return;
    const [s] = this.#r.splice(e, 1);
    this.#t?.removePointerInTextLayer(s.contentElement);
  }
  updateFakeAnnotations(t) {
    if (t.length !== 0) {
      for (const e of t) e.updateFakeAnnotationElement(this);
      this.#l();
    }
  }
  togglePointerEvents(t = !1) {
    this.div.classList.toggle("disabled", !t);
  }
  static get _defaultBorderStyle() {
    return k(
      this,
      "_defaultBorderStyle",
      Object.freeze({
        width: 1,
        rawWidth: 1,
        style: re.SOLID,
        dashArray: [3],
        horizontalCornerRadius: 0,
        verticalCornerRadius: 0,
      }),
    );
  }
}