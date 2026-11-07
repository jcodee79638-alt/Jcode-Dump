
class ri extends U {
  static _type = "ink";
  static _editorType = B.INK;
  static _defaultDrawingOptions = null;
  constructor(t) {
    (super({ ...t, name: "inkEditor" }),
      (this._willKeepAspectRatio = !0),
      (this.defaultL10nId = "pdfjs-editor-ink-editor"));
  }
  static initialize(t, e) {
    (D.initialize(t, e), (this._defaultDrawingOptions = new ds(e.viewParameters)));
  }
  static getDefaultDrawingOptions(t) {
    const e = this._defaultDrawingOptions.clone();
    return (e.updateProperties(t), e);
  }
  static get supportMultipleDrawings() {
    return !0;
  }
  static get typesMap() {
    return k(
      this,
      "typesMap",
      new Map([
        [G.INK_THICKNESS, "stroke-width"],
        [G.INK_COLOR, "stroke"],
        [G.INK_OPACITY, "stroke-opacity"],
      ]),
    );
  }
  static createDrawerInstance({ x: t, y: e, box: [, , s, i], rotation: n }) {
    return new Ua(t, e, s, i, n, this._defaultDrawingOptions["stroke-width"]);
  }
  static deserializeDraw(t, e, s, i, n, r) {
    return De.deserialize(t, e, s, i, n, r);
  }
  static async deserialize(t, e, s) {
    let i = null;
    if (t instanceof Zs) {
      const {
        data: {
          inkLists: r,
          rect: a,
          rotation: o,
          id: l,
          color: h,
          opacity: d,
          borderStyle: { rawWidth: u },
          popupRef: f,
          richText: p,
          contentsObj: g,
          creationDate: m,
          modificationDate: b,
        },
        parent: {
          page: { pageNumber: y },
        },
      } = t;
      i = t = {
        annotationType: B.INK,
        color: Array.from(h),
        thickness: u,
        opacity: d,
        paths: { points: r },
        boxes: null,
        pageIndex: y - 1,
        rect: a.slice(0),
        rotation: o,
        annotationElementId: l,
        id: l,
        deleted: !1,
        popupRef: f,
        richText: p,
        comment: g?.str || null,
        creationDate: m,
        modificationDate: b,
      };
    }
    const n = await super.deserialize(t, e, s);
    return ((n._initialData = i), t.comment && n.setCommentData(t), n);
  }
  get toolbarButtons() {
    return ((this._colorPicker ||= new Pe(this)), [["colorPicker", this._colorPicker]]);
  }
  get colorType() {
    return G.INK_COLOR;
  }
  get colorAndOpacityType() {
    return G.INK_COLOR_AND_OPACITY;
  }
  get opacityType() {
    return G.INK_OPACITY;
  }
  updateParams(t, e) {
    if (t === G.INK_COLOR_AND_OPACITY) {
      this._updateColorAndOpacity(e.color, e.opacity);
      return;
    }
    super.updateParams(t, e);
  }
  static updateDefaultParams(t, e) {
    if (t === G.INK_COLOR_AND_OPACITY) {
      (super.updateDefaultParams(G.INK_COLOR, e.color), super.updateDefaultParams(G.INK_OPACITY, e.opacity));
      return;
    }
    super.updateDefaultParams(t, e);
  }
  get color() {
    return this._drawingOptions.stroke;
  }
  get opacity() {
    return this._drawingOptions["stroke-opacity"];
  }
  onScaleChanging() {
    if (!this.parent) return;
    super.onScaleChanging();
    const { _drawId: t, _drawingOptions: e, parent: s } = this;
    (e.updateSVGProperty("stroke-width"), s.drawLayer.updateProperties(t, e.toSVGProperties()));
  }
  static onScaleChangingWhenDrawing() {
    const t = this._currentParent;
    t &&
      (super.onScaleChangingWhenDrawing(),
      this._defaultDrawingOptions.updateSVGProperty("stroke-width"),
      t.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties()));
  }
  createDrawingOptions({ color: t, thickness: e, opacity: s }) {
    this._drawingOptions = ri.getDefaultDrawingOptions({
      stroke: T.makeHexColor(...t),
      "stroke-width": e,
      "stroke-opacity": s,
    });
  }
  serialize(t = !1) {
    if (this.isEmpty()) return null;
    if (this.deleted) return this.serializeDeleted();
    const { lines: e, points: s } = this.serializeDraw(t),
      {
        _drawingOptions: { stroke: i, "stroke-opacity": n, "stroke-width": r },
      } = this,
      a = Object.assign(super.serialize(t), {
        color: D._colorManager.convert(i),
        opacity: n,
        thickness: r,
        paths: { lines: e, points: s },
      });
    return (
      this.addComment(a),
      t
        ? ((a.isCopy = !0), a)
        : this.annotationElementId && !this.#t(a)
          ? null
          : ((a.id = this.annotationElementId), a)
    );
  }
  #t(t) {
    const { color: e, thickness: s, opacity: i, pageIndex: n } = this._initialData;
    return (
      this.hasEditedComment ||
      this._hasBeenMoved ||
      this._hasBeenResized ||
      t.color.some((r, a) => r !== e[a]) ||
      t.thickness !== s ||
      t.opacity !== i ||
      t.pageIndex !== n
    );
  }
  renderAnnotationElement(t) {
    if (this.deleted) return (t.hide(), null);
    const { points: e, rect: s } = this.serializeDraw(!1);
    return (
      t.updateEdited({
        rect: s,
        thickness: this._drawingOptions["stroke-width"],
        points: e,
        popup: this.comment,
      }),
      null
    );
  }
}