
class Dt extends U {
  #t = !1;
  #e = null;
  #s = null;
  #i = null;
  static _type = "signature";
  static _editorType = B.SIGNATURE;
  static _defaultDrawingOptions = null;
  constructor(t) {
    (super({ ...t, mustBeCommitted: !0, name: "signatureEditor" }),
      (this._willKeepAspectRatio = !0),
      (this.#s = t.signatureData || null),
      (this.#e = null),
      (this.defaultL10nId = "pdfjs-editor-signature-editor1"));
  }
  static initialize(t, e) {
    (D.initialize(t, e),
      (this._defaultDrawingOptions = new ai()),
      (this._defaultDrawnSignatureOptions = new oi(e.viewParameters)));
  }
  static getDefaultDrawingOptions(t) {
    const e = this._defaultDrawingOptions.clone();
    return (e.updateProperties(t), e);
  }
  static get supportMultipleDrawings() {
    return !1;
  }
  static get typesMap() {
    return k(this, "typesMap", new Map());
  }
  static get isDrawer() {
    return !1;
  }
  get telemetryFinalData() {
    return { type: "signature", hasDescription: !!this.#e };
  }
  static computeTelemetryFinalData(t) {
    const e = t.get("hasDescription");
    return { hasAltText: e.get(!0) ?? 0, hasNoAltText: e.get(!1) ?? 0 };
  }
  get isResizable() {
    return !0;
  }
  onScaleChanging() {
    this._drawId !== null && super.onScaleChanging();
  }
  render() {
    if (this.div) return this.div;
    let t, e;
    const { _isCopy: s } = this;
    if ((s && ((this._isCopy = !1), (t = this.x), (e = this.y)), super.render(), this._drawId === null))
      if (this.#s) {
        const { lines: i, mustSmooth: n, areContours: r, description: a, uuid: o, heightInPage: l } = this.#s,
          {
            rawDims: { pageWidth: h, pageHeight: d },
            rotation: u,
          } = this.parent.viewport,
          f = oe.processDrawnLines({
            lines: i,
            pageWidth: h,
            pageHeight: d,
            rotation: u,
            innerMargin: Dt._INNER_MARGIN,
            mustSmooth: n,
            areContours: r,
          });
        this.addSignature(f, l, a, o);
      } else
        (this.div.setAttribute("data-l10n-args", JSON.stringify({ description: "" })),
          (this.div.hidden = !0),
          this._uiManager.getSignature(this));
    else this.div.setAttribute("data-l10n-args", JSON.stringify({ description: this.#e || "" }));
    return (s && ((this._isCopy = !0), this._moveAfterPaste(t, e)), this.div);
  }
  setUuid(t) {
    ((this.#i = t), this.addEditToolbar());
  }
  getUuid() {
    return this.#i;
  }
  get description() {
    return this.#e;
  }
  set description(t) {
    ((this.#e = t),
      this.div &&
        (this.div.setAttribute("data-l10n-args", JSON.stringify({ description: t })),
        super.addEditToolbar().then((e) => {
          e?.updateEditSignatureButton(t);
        })));
  }
  getSignaturePreview() {
    const { newCurves: t, areContours: e, thickness: s, width: i, height: n } = this.#s,
      r = Math.max(i, n),
      a = oe.processDrawnLines({
        lines: { curves: t.map((o) => ({ points: o })), thickness: s, width: i, height: n },
        pageWidth: r,
        pageHeight: r,
        rotation: 0,
        innerMargin: 0,
        mustSmooth: !1,
        areContours: e,
      });
    return { areContours: e, outline: a.outline };
  }
  get toolbarButtons() {
    return this._uiManager.signatureManager
      ? [["editSignature", this._uiManager.signatureManager]]
      : super.toolbarButtons;
  }
  addSignature(t, e, s, i) {
    const { x: n, y: r } = this,
      { outline: a } = (this.#s = t);
    ((this.#t = a instanceof Bs), (this.description = s));
    let o;
    (this.#t
      ? (o = Dt.getDefaultDrawingOptions())
      : ((o = Dt._defaultDrawnSignatureOptions.clone()), o.updateProperties({ "stroke-width": a.thickness })),
      this._addOutlines({ drawOutlines: a, drawingOptions: o }));
    const [, l] = this.pageDimensions;
    let h = e / l;
    ((h = h >= 1 ? 0.5 : h),
      (this.width *= h / this.height),
      this.width >= 1 && ((h *= 0.9 / this.width), (this.width = 0.9)),
      (this.height = h),
      this.setDims(),
      (this.x = n),
      (this.y = r),
      this.center(),
      this._onResized(),
      this.onScaleChanging(),
      this.rotate(),
      this._uiManager.addToAnnotationStorage(this),
      this.setUuid(i),
      this._reportTelemetry({
        action: "pdfjs.signature.inserted",
        data: { hasBeenSaved: !!i, hasDescription: !!s },
      }),
      (this.div.hidden = !1));
  }
  getFromImage(t) {
    const {
      rawDims: { pageWidth: e, pageHeight: s },
      rotation: i,
    } = this.parent.viewport;
    return oe.process(t, e, s, i, Dt._INNER_MARGIN);
  }
  getFromText(t, e) {
    const {
      rawDims: { pageWidth: s, pageHeight: i },
      rotation: n,
    } = this.parent.viewport;
    return oe.extractContoursFromText(t, e, s, i, n, Dt._INNER_MARGIN);
  }
  getDrawnSignature(t) {
    const {
      rawDims: { pageWidth: e, pageHeight: s },
      rotation: i,
    } = this.parent.viewport;
    return oe.processDrawnLines({
      lines: t,
      pageWidth: e,
      pageHeight: s,
      rotation: i,
      innerMargin: Dt._INNER_MARGIN,
      mustSmooth: !1,
      areContours: !1,
    });
  }
  createDrawingOptions({ areContours: t, thickness: e }) {
    t
      ? (this._drawingOptions = Dt.getDefaultDrawingOptions())
      : ((this._drawingOptions = Dt._defaultDrawnSignatureOptions.clone()),
        this._drawingOptions.updateProperties({ "stroke-width": e }));
  }
  serialize(t = !1) {
    if (this.isEmpty()) return null;
    const { lines: e, points: s } = this.serializeDraw(t),
      {
        _drawingOptions: { "stroke-width": i },
      } = this,
      n = Object.assign(super.serialize(t), {
        isSignature: !0,
        areContours: this.#t,
        color: [0, 0, 0],
        thickness: this.#t ? 0 : i,
      });
    return (
      this.addComment(n),
      t ? ((n.paths = { lines: e, points: s }), (n.uuid = this.#i), (n.isCopy = !0)) : (n.lines = e),
      this.#e && (n.accessibilityData = { type: "Figure", alt: this.#e }),
      n
    );
  }
  static deserializeDraw(t, e, s, i, n, r) {
    return r.areContours ? Bs.deserialize(t, e, s, i, n, r) : De.deserialize(t, e, s, i, n, r);
  }
  static async deserialize(t, e, s) {
    const i = await super.deserialize(t, e, s);
    return ((i.#t = t.areContours), (i.description = t.accessibilityData?.alt || ""), (i.#i = t.uuid), i);
  }
}