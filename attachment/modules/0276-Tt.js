
class Tt extends U {
  #t = null;
  #e = 0;
  #s = null;
  #i = 0;
  #n = "";
  #a = "";
  static _DEFAULT_OPACITY = 1;
  static _DEFAULT_THICKNESS = 12;
  static _defaultDrawingOptions = null;
  static _type = "highlight";
  static _editorType = B.HIGHLIGHT;
  static get _keyboardManager() {
    const t = Tt.prototype;
    return k(
      this,
      "_keyboardManager",
      new bt([
        [["ArrowLeft"], t._moveCaret, { args: [0] }],
        [["ArrowRight"], t._moveCaret, { args: [1] }],
        [["ArrowUp"], t._moveCaret, { args: [2] }],
        [["ArrowDown"], t._moveCaret, { args: [3] }],
      ]),
    );
  }
  constructor(t) {
    (super({ ...t, name: "highlightEditor" }),
      (this.#t = t.anchorNode || null),
      (this.#e = t.anchorOffset || 0),
      (this.#s = t.focusNode || null),
      (this.#i = t.focusOffset || 0),
      (this.#n = t.methodOfCreation || (this._drawOutlines?.isFree ? "main_toolbar" : "")),
      (this.#a = t.text || ""),
      (this._isDraggable = !1),
      (this.defaultL10nId = "pdfjs-editor-highlight-editor"),
      this.rotate());
  }
  static initialize(t, e) {
    (D.initialize(t, e),
      (this._defaultDrawingOptions ||= new ni({
        fill: e.highlightColors?.values().next().value || "#fff066",
        "fill-opacity": Tt._DEFAULT_OPACITY,
        thickness: Tt._DEFAULT_THICKNESS,
      })));
  }
  static getDefaultDrawingOptions(t) {
    const e = this._defaultDrawingOptions.clone();
    return (e.updateProperties(t), e);
  }
  static get typesMap() {
    return k(
      this,
      "typesMap",
      new Map([
        [G.HIGHLIGHT_COLOR, "fill"],
        [G.HIGHLIGHT_THICKNESS, "thickness"],
      ]),
    );
  }
  static get isDrawer() {
    return !1;
  }
  static get _hasClipPath() {
    return !0;
  }
  static get _hasDrawClass() {
    return !1;
  }
  _addOutlines(t) {
    const { boxes: e, drawOutlines: s } = t;
    (!e && !s) ||
      ((this._drawingOptions ||= t.drawingOptions || Tt.getDefaultDrawingOptions()),
      e && (t = { ...t, drawOutlines: Ns.build(e, this._uiManager.direction === "ltr") }),
      super._addOutlines(t));
  }
  get colorType() {
    return G.HIGHLIGHT_COLOR;
  }
  get color() {
    return this._drawingOptions.fill;
  }
  get opacity() {
    return this._drawingOptions["fill-opacity"];
  }
  get _opacityName() {
    return "fill-opacity";
  }
  get _drawRotation() {
    return this._drawOutlines?.isFree ? this.rotation : 0;
  }
  get isResizable() {
    return !1;
  }
  get _mustBeDisabledOnCommit() {
    return !1;
  }
  get _mustFixPosition() {
    return !this._drawOutlines?.isFree;
  }
  get telemetryInitialData() {
    return {
      action: "added",
      type: this._drawOutlines.isFree ? "free_highlight" : "highlight",
      color: this._uiManager.getNonHCMColorName(this.color),
      thickness: this._drawingOptions.thickness,
      methodOfCreation: this.#n,
    };
  }
  get telemetryFinalData() {
    return { type: "highlight", color: this._uiManager.getNonHCMColorName(this.color) };
  }
  static computeTelemetryFinalData(t) {
    return { numberOfColors: t.get("color").size };
  }
  translateInPage(t, e) {}
  get toolbarPosition() {
    return this.#r(this._drawOutlines.focusOutline.lastPoint);
  }
  get commentButtonPosition() {
    return this.#r(this._drawOutlines.firstPoint);
  }
  #r([t, e]) {
    const [s, i, n, r] = this._drawOutlines.box;
    return [(t - s) / n, (e - i) / r];
  }
  updateParams(t, e) {
    switch (t) {
      case G.HIGHLIGHT_COLOR:
        (this._updateColorAndOpacity(e, Tt._DEFAULT_OPACITY, t),
          this._reportTelemetry(
            { action: "color_changed", color: this._uiManager.getNonHCMColorName(e) },
            !0,
          ));
        break;
      case G.HIGHLIGHT_THICKNESS:
        (super.updateParams(t, e), this._reportTelemetry({ action: "thickness_changed", thickness: e }, !0));
        break;
    }
  }
  get propertiesToUpdate() {
    const t = super.propertiesToUpdate;
    return (t.push([G.HIGHLIGHT_FREE, this._drawOutlines.isFree]), t);
  }
  get toolbarButtons() {
    return this._uiManager.highlightColors
      ? ((this._colorPicker = new St({ editor: this })), [["colorPicker", this._colorPicker]])
      : super.toolbarButtons;
  }
  fixAndSetPosition() {
    return super.fixAndSetPosition(this._drawRotation);
  }
  getRect(t, e) {
    return super.getRect(t, e, this._drawRotation);
  }
  onceAdded(t) {
    (this.annotationElementId || this.parent.addUndoableEditor(this), t && this.div.focus());
  }
  remove() {
    (this._reportTelemetry({ action: "deleted" }), super.remove());
  }
  render() {
    if (this.div) return this.div;
    const t = super.render();
    return (
      this.#a && (t.setAttribute("aria-label", this.#a), t.setAttribute("role", "mark")),
      this._drawOutlines.isFree
        ? t.classList.add("free")
        : t.addEventListener("keydown", this.#o.bind(this), { signal: this._uiManager._signal }),
      this.enableEditing(),
      t
    );
  }
  #o(t) {
    Tt._keyboardManager.exec(this, t);
  }
  _moveCaret(t) {
    switch ((this.parent.unselect(this), t)) {
      case 0:
      case 2:
        this.#l(!0);
        break;
      case 1:
      case 3:
        this.#l(!1);
        break;
    }
  }
  #l(t) {
    if (!this.#t) return;
    const e = window.getSelection();
    t ? e.setPosition(this.#t, this.#e) : e.setPosition(this.#s, this.#i);
  }
  unselect() {
    (super.unselect(), this._drawOutlines.isFree || this.#l(!1));
  }
  static createDrawerInstance({ x: t, y: e, box: s, parent: i, isLTR: n }) {
    return new Ha(t, e, s, i.scale, this._defaultDrawingOptions.thickness / 2, n, 0.001);
  }
  static _getDrawingTarget(t, { target: e }) {
    return e.closest(".textLayer");
  }
  static _getPointerCoords({ x: t, y: e }) {
    return [t, e];
  }
  static _addDrawingListeners(t, e) {
    (t.classList.add("free"),
      e.addEventListener("abort", () => t.classList.remove("free"), { once: !0 }),
      window.addEventListener("blur", () => this._endDraw(null), { signal: e }),
      window.addEventListener("pointerdown", rt, { capture: !0, passive: !1, signal: e }));
  }
  static _endDrawingSession(t = !1) {
    return this.endDrawing(t);
  }
  createDrawingOptions({ color: t, opacity: e, thickness: s }) {
    const { _defaultDrawingOptions: i, _DEFAULT_OPACITY: n } = Tt;
    this._drawingOptions = Tt.getDefaultDrawingOptions({
      fill: T.makeHexColor(...t),
      "fill-opacity": e || n,
      thickness: s || i.thickness,
    });
  }
  static deserializeDraw(t, e, s, i, n, r, a) {
    const { quadPoints: o } = r;
    if (o) {
      const f = [];
      for (let p = 0, g = o.length; p < g; p += 8)
        f.push({
          x: (o[p] - t) / s,
          y: 1 - (o[p + 1] - e) / i,
          width: (o[p + 2] - o[p]) / s,
          height: (o[p + 1] - o[p + 5]) / i,
        });
      return Ns.build(f, a.direction === "ltr");
    }
    const l = r.thickness || this._defaultDrawingOptions.thickness,
      h = (r.inkLists || r.outlines.points)[0],
      d = new si(h[0] - t, i - (h[1] - e), [0, 0, s, i], 1, l / 2, !0, 0.001);
    for (let f = 0, p = h.length; f < p; f += 2) d.add(h[f] - t, i - (h[f + 1] - e));
    const u = d.getOutlines();
    return (u.buildFocusOutline(l), u);
  }
  static async deserialize(t, e, s) {
    let i = null;
    if (t instanceof fn) {
      const {
        data: {
          quadPoints: r,
          rect: a,
          rotation: o,
          id: l,
          color: h,
          opacity: d,
          popupRef: u,
          richText: f,
          contentsObj: p,
          creationDate: g,
          modificationDate: m,
        },
        parent: {
          page: { pageNumber: b },
        },
      } = t;
      i = t = {
        annotationType: B.HIGHLIGHT,
        color: Array.from(h),
        opacity: d,
        quadPoints: r,
        pageIndex: b - 1,
        rect: a.slice(0),
        rotation: o,
        annotationElementId: l,
        id: l,
        deleted: !1,
        popupRef: u,
        richText: f,
        comment: p?.str || null,
        creationDate: g,
        modificationDate: m,
      };
    } else if (t instanceof Zs) {
      const {
        data: {
          inkLists: r,
          rect: a,
          rotation: o,
          id: l,
          color: h,
          borderStyle: { rawWidth: d },
          popupRef: u,
          richText: f,
          contentsObj: p,
          creationDate: g,
          modificationDate: m,
        },
        parent: {
          page: { pageNumber: b },
        },
      } = t;
      i = t = {
        annotationType: B.HIGHLIGHT,
        color: Array.from(h),
        thickness: d,
        inkLists: r,
        pageIndex: b - 1,
        rect: a.slice(0),
        rotation: o,
        annotationElementId: l,
        id: l,
        deleted: !1,
        popupRef: u,
        richText: f,
        comment: p?.str || null,
        creationDate: g,
        modificationDate: m,
      };
    }
    const n = await super.deserialize(t, e, s);
    return ((n._initialData = i), t.comment && n.setCommentData(t), n);
  }
  serialize(t = !1) {
    if (this.isEmpty() || t) return null;
    if (this.deleted) return this.serializeDeleted();
    const e = super.serialize(t);
    return (
      Object.assign(e, {
        color: D._colorManager.convert(this._uiManager.getNonHCMColor(this.color)),
        opacity: this.opacity,
        thickness: this._drawingOptions.thickness,
        quadPoints: this._drawOutlines.serializeQuadPoints(this.pageTranslation, this.pageDimensions),
        outlines: this._drawOutlines.serialize(e.rect, this._drawRotation),
      }),
      this.addComment(e),
      this.annotationElementId && !this.#h(e) ? null : ((e.id = this.annotationElementId), e)
    );
  }
  #h(t) {
    const { color: e } = this._initialData;
    return this.hasEditedComment || t.color.some((s, i) => s !== e[i]);
  }
  renderAnnotationElement(t) {
    return this.deleted
      ? (t.hide(), null)
      : (t.updateEdited({ rect: this.getPDFRect(), popup: this.comment }), null);
  }
}