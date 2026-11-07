
class Q {
  #t = null;
  #e = !1;
  #s = null;
  constructor(t, { isRenderable: e = !1, ignoreBorder: s = !1, createQuadrilaterals: i = !1 } = {}) {
    ((this.isRenderable = e),
      (this.data = t.data),
      (this.layer = t.layer),
      (this.linkService = t.linkService),
      (this.downloadManager = t.downloadManager),
      (this.imageResourcesPath = t.imageResourcesPath),
      (this.renderForms = t.renderForms),
      (this.svgFactory = t.svgFactory),
      (this.annotationStorage = t.annotationStorage),
      (this.enableComment = t.enableComment),
      (this.enableScripting = t.enableScripting),
      (this.hasJSActions = t.hasJSActions),
      (this._fieldObjects = t.fieldObjects),
      (this.parent = t.parent),
      (this.hasOwnCommentButton = !1),
      e && (this.contentElement = this.container = this._createContainer(s)),
      i && this._createQuadrilaterals());
  }
  static _hasPopupData({ contentsObj: t, richText: e }) {
    return !!(t?.str || e?.str);
  }
  get _isEditable() {
    return this.data.isEditable;
  }
  get hasPopupData() {
    return Q._hasPopupData(this.data) || (this.enableComment && !!this.commentText);
  }
  get commentData() {
    const { data: t } = this,
      e = this.annotationStorage?.getEditor(t.id);
    return e ? e.getData() : t;
  }
  get hasCommentButton() {
    return this.enableComment && this.hasPopupElement;
  }
  get commentButtonPosition() {
    const t = this.annotationStorage?.getEditor(this.data.id);
    if (t) return t.commentButtonPositionInPage;
    const { quadPoints: e, inkLists: s, rect: i } = this.data;
    let n = -1 / 0,
      r = -1 / 0;
    if (e?.length >= 8) {
      for (let a = 0; a < e.length; a += 8)
        e[a + 1] > r ? ((r = e[a + 1]), (n = e[a + 2])) : e[a + 1] === r && (n = Math.max(n, e[a + 2]));
      return [n, r];
    }
    if (s?.length >= 1) {
      for (const a of s)
        for (let o = 0, l = a.length; o < l; o += 2)
          a[o + 1] > r ? ((r = a[o + 1]), (n = a[o])) : a[o + 1] === r && (n = Math.max(n, a[o]));
      if (n !== 1 / 0) return [n, r];
    }
    return i ? [i[2], i[3]] : null;
  }
  _normalizePoint(t) {
    const {
      page: { view: e },
      viewport: {
        rawDims: { pageWidth: s, pageHeight: i, pageX: n, pageY: r },
      },
    } = this.parent;
    return ((t[1] = e[3] - t[1] + e[1]), (t[0] = (100 * (t[0] - n)) / s), (t[1] = (100 * (t[1] - r)) / i), t);
  }
  get commentText() {
    const { data: t } = this;
    return this.annotationStorage.getRawValue(`${ue}${t.id}`)?.popup?.contents || t.contentsObj?.str || "";
  }
  set commentText(t) {
    const { data: e } = this,
      s = { deleted: !t, contents: t || "" };
    (this.annotationStorage.updateEditor(e.id, { popup: s }) ||
      this.annotationStorage.setValue(`${ue}${e.id}`, {
        id: e.id,
        annotationType: e.annotationType,
        page: this.parent.page,
        popup: s,
        popupRef: e.popupRef,
        modificationDate: new Date(),
      }),
      t || this.removePopup());
  }
  removePopup() {
    ((this.#s?.popup || this.popup)?.remove(), (this.#s = this.popup = null));
  }
  updateEdited(t) {
    if (!this.container) return;
    t.rect && (this.#t ||= { rect: this.data.rect.slice(0) });
    const { rect: e, popup: s } = t;
    e && this.#i(e);
    let i = this.#s?.popup || this.popup;
    (!i && s?.text && (this._createPopup(s), (i = this.#s.popup)),
      i && (i.updateEdited(t), s?.deleted && (i.remove(), (this.#s = null), (this.popup = null))));
  }
  resetEdited() {
    this.#t && (this.#i(this.#t.rect), this.#s?.popup.resetEdited(), (this.#t = null));
  }
  #i(t) {
    const {
      container: { style: e },
      data: { rect: s, rotation: i },
      parent: {
        viewport: {
          rawDims: { pageWidth: n, pageHeight: r, pageX: a, pageY: o },
        },
      },
    } = this;
    (s?.splice(0, 4, ...t),
      (e.left = `${(100 * (t[0] - a)) / n}%`),
      (e.top = `${(100 * (r - t[3] + o)) / r}%`),
      i === 0
        ? ((e.width = `${(100 * (t[2] - t[0])) / n}%`), (e.height = `${(100 * (t[3] - t[1])) / r}%`))
        : this.setRotation(i));
  }
  _createContainer(t) {
    const {
        data: e,
        parent: { page: s, viewport: i },
      } = this,
      n = document.createElement("section");
    (n.setAttribute("data-annotation-id", e.id),
      !(this instanceof te) && !(this instanceof Js) && !(this instanceof gn) && (n.tabIndex = 0));
    const { style: r } = n;
    if (
      ((r.zIndex = this.parent.zIndex),
      (this.parent.zIndex += 2),
      e.alternativeText && (n.title = e.alternativeText),
      e.noRotate && n.classList.add("norotate"),
      !e.rect || this instanceof Rs)
    ) {
      const { rotation: g } = e;
      return (!e.hasOwnCanvas && g !== 0 && this.setRotation(g, n), n);
    }
    const { width: a, height: o } = this;
    if (!t && e.borderStyle.width > 0) {
      r.borderWidth = `${e.borderStyle.width}px`;
      const g = e.borderStyle.horizontalCornerRadius,
        m = e.borderStyle.verticalCornerRadius;
      if (g > 0 || m > 0) {
        const y = `calc(${g}px * var(--total-scale-factor)) / calc(${m}px * var(--total-scale-factor))`;
        r.borderRadius = y;
      }
      switch (e.borderStyle.style) {
        case re.SOLID:
          r.borderStyle = "solid";
          break;
        case re.DASHED:
          r.borderStyle = "dashed";
          break;
        case re.BEVELED:
          H("Unimplemented border style: beveled");
          break;
        case re.INSET:
          H("Unimplemented border style: inset");
          break;
        case re.UNDERLINE:
          r.borderBottomStyle = "solid";
          break;
      }
      const b = e.borderColor || null;
      b ? ((this.#e = !0), (r.borderColor = T.makeHexColor(...b))) : (r.borderWidth = 0);
    }
    const l = T.normalizeRect([
        e.rect[0],
        s.view[3] - e.rect[1] + s.view[1],
        e.rect[2],
        s.view[3] - e.rect[3] + s.view[1],
      ]),
      { pageWidth: h, pageHeight: d, pageX: u, pageY: f } = i.rawDims;
    ((r.left = `${(100 * (l[0] - u)) / h}%`), (r.top = `${(100 * (l[1] - f)) / d}%`));
    const { rotation: p } = e;
    return (
      e.hasOwnCanvas || p === 0
        ? ((r.width = `${(100 * a) / h}%`), (r.height = `${(100 * o) / d}%`))
        : this.setRotation(p, n),
      n
    );
  }
  setRotation(t, e = this.container) {
    if (!this.data.rect) return;
    const { pageWidth: s, pageHeight: i } = this.parent.viewport.rawDims;
    let { width: n, height: r } = this;
    (t % 180 !== 0 && ([n, r] = [r, n]),
      (e.style.width = `${(100 * n) / s}%`),
      (e.style.height = `${(100 * r) / i}%`),
      e.setAttribute("data-main-rotation", (360 - t) % 360));
  }
  get _commonActions() {
    const t = (e, s, i) => {
      const n = i.detail[e],
        r = n[0],
        a = n.slice(1);
      ((i.target.style[s] = Hi[`${r}_HTML`](a)),
        this.annotationStorage.setValue(this.data.id, { [s]: Hi[`${r}_rgb`](a) }));
    };
    return k(this, "_commonActions", {
      display: (e) => {
        const { display: s } = e.detail,
          i = s % 2 === 1;
        ((this.container.style.visibility = i ? "hidden" : "visible"),
          this.annotationStorage.setValue(this.data.id, { noView: i, noPrint: s === 1 || s === 2 }));
      },
      print: (e) => {
        this.annotationStorage.setValue(this.data.id, { noPrint: !e.detail.print });
      },
      hidden: (e) => {
        const { hidden: s } = e.detail;
        ((this.container.style.visibility = s ? "hidden" : "visible"),
          this.annotationStorage.setValue(this.data.id, { noPrint: s, noView: s }));
      },
      focus: (e) => {
        setTimeout(() => e.target.focus({ preventScroll: !1 }), 0);
      },
      userName: (e) => {
        e.target.title = e.detail.userName;
      },
      readonly: (e) => {
        e.target.disabled = e.detail.readonly;
      },
      required: (e) => {
        this._setRequired(e.target, e.detail.required);
      },
      bgColor: (e) => {
        t("bgColor", "backgroundColor", e);
      },
      fillColor: (e) => {
        t("fillColor", "backgroundColor", e);
      },
      fgColor: (e) => {
        t("fgColor", "color", e);
      },
      textColor: (e) => {
        t("textColor", "color", e);
      },
      borderColor: (e) => {
        t("borderColor", "borderColor", e);
      },
      strokeColor: (e) => {
        t("strokeColor", "borderColor", e);
      },
      rotation: (e) => {
        const s = e.detail.rotation;
        (this.setRotation(s), this.annotationStorage.setValue(this.data.id, { rotation: s }));
      },
    });
  }
  _dispatchEventFromSandbox(t, e) {
    const s = this._commonActions;
    for (const i of Object.keys(e.detail)) (t[i] || s[i])?.(e);
  }
  _setDefaultPropertiesFromJS(t) {
    if (!this.enableScripting) return;
    const e = this.annotationStorage.getRawValue(this.data.id);
    if (!e) return;
    const s = this._commonActions;
    for (const [i, n] of Object.entries(e)) {
      const r = s[i];
      if (r) {
        const a = { detail: { [i]: n }, target: t };
        (r(a), delete e[i]);
      }
    }
  }
  _createQuadrilaterals() {
    if (!this.container) return;
    const { quadPoints: t } = this.data;
    if (!t) return;
    const [e, s, i, n] = this.data.rect.map(Math.fround);
    if (t.length === 8) {
      const [g, m, b, y] = t.subarray(2, 6);
      if (i === g && n === m && e === b && s === y) return;
    }
    const { style: r } = this.container;
    let a;
    if (this.#e) {
      const { borderColor: g, borderWidth: m } = r;
      ((r.borderWidth = 0),
        (a = [
          "url('data:image/svg+xml;utf8,",
          `<svg xmlns="${ct}" preserveAspectRatio="none" viewBox="0 0 1 1">`,
          `<g fill="transparent" stroke="${g}" stroke-width="${m}">`,
        ]),
        this.container.classList.add("hasBorder"));
    }
    const o = i - e,
      l = n - s,
      { svgFactory: h } = this,
      d = h.createElement("svg");
    (d.classList.add("quadrilateralsContainer"),
      d.setAttribute("width", 0),
      d.setAttribute("height", 0),
      (d.role = "none"));
    const u = h.createElement("defs");
    d.append(u);
    const f = h.createElement("clipPath"),
      p = `clippath_${this.data.id}`;
    (f.setAttribute("id", p), f.setAttribute("clipPathUnits", "objectBoundingBox"), u.append(f));
    for (let g = 2, m = t.length; g < m; g += 8) {
      const b = t[g],
        y = t[g + 1],
        A = t[g + 2],
        w = t[g + 3],
        v = h.createElement("rect"),
        S = (A - e) / o,
        x = (n - y) / l,
        _ = (b - A) / o,
        E = (y - w) / l;
      (v.setAttribute("x", S),
        v.setAttribute("y", x),
        v.setAttribute("width", _),
        v.setAttribute("height", E),
        f.append(v),
        a?.push(`<rect vector-effect="non-scaling-stroke" x="${S}" y="${x}" width="${_}" height="${E}"/>`));
    }
    (this.#e && (a.push("</g></svg>')"), (r.backgroundImage = a.join(""))),
      this.container.append(d),
      (this.container.style.clipPath = `url(#${p})`));
  }
  _createPopup(t = null) {
    const { data: e } = this;
    let s, i;
    (t ? ((s = { str: t.text }), (i = t.date)) : ((s = e.contentsObj), (i = e.modificationDate)),
      (this.#s = new Rs({
        data: {
          color: e.color,
          titleObj: e.titleObj,
          modificationDate: i,
          contentsObj: s,
          richText: e.richText,
          parentRect: e.rect,
          borderStyle: 0,
          id: `popup_${e.id}`,
          rotation: e.rotation,
          noRotate: !0,
        },
        linkService: this.linkService,
        parent: this.parent,
        elements: [this],
      })));
  }
  get hasPopupElement() {
    return !!(this.#s || this.popup || this.data.popupRef);
  }
  get extraPopupElement() {
    return this.#s;
  }
  render() {
    $("Abstract method `AnnotationElement.render` called");
  }
  _getElementsByName(t, e = null) {
    const s = [];
    if (this._fieldObjects) {
      const i = this._fieldObjects.get(t) || [];
      for (const { page: n, id: r, exportValues: a } of i) {
        if (n === -1 || r === e) continue;
        const o = typeof a == "string" ? a : null,
          l = document.querySelector(`[data-element-id="${r}"]`);
        if (l && !Jt.has(l)) {
          H(`_getElementsByName - element not allowed: ${r}`);
          continue;
        }
        s.push({ id: r, exportValue: o, domElement: l });
      }
      return s;
    }
    for (const i of document.getElementsByName(t)) {
      const { exportValue: n } = i,
        r = i.getAttribute("data-element-id");
      r === e || !Jt.has(i) || s.push({ id: r, exportValue: n, domElement: i });
    }
    return s;
  }
  show() {
    (this.container && (this.container.hidden = !1), this.popup?.maybeShow());
  }
  hide() {
    (this.container && (this.container.hidden = !0), this.popup?.forceHide());
  }
  getElementsToTriggerPopup() {
    return this.container;
  }
  addHighlightArea() {
    const t = this.getElementsToTriggerPopup();
    if (Array.isArray(t)) for (const e of t) e.classList.add("highlightArea");
    else t.classList.add("highlightArea");
  }
  _editOnDoubleClick() {
    if (!this._isEditable) return;
    const {
      annotationEditorType: t,
      data: { id: e },
    } = this;
    this.container.addEventListener("dblclick", () => {
      this.linkService.eventBus?.dispatch("switchannotationeditormode", {
        source: this,
        mode: t,
        editId: e,
        mustEnterInEditMode: !0,
      });
    });
  }
  updateOC(t) {
    if (!this.data.oc || !t) return;
    t.isVisible(this.data.oc) ? this.show() : this.hide();
  }
  get width() {
    return this.data.rect[2] - this.data.rect[0];
  }
  get height() {
    return this.data.rect[3] - this.data.rect[1];
  }
  _setBackgroundColor(t) {
    const e = this.data.backgroundColor || null;
    t.style.backgroundColor = e === null ? "transparent" : T.makeHexColor(...e);
  }
}