
class U extends D {
  #t = null;
  #e;
  _clipPathId = null;
  _colorPicker = null;
  _drawId = null;
  _drawOutlines = null;
  _focusDrawId = null;
  static _currentDrawId = -1;
  static _currentParent = null;
  static #s = null;
  static #i = null;
  static #n = null;
  static #a = null;
  static _INNER_MARGIN = 3;
  constructor(t) {
    (super(t), (this.#e = t.mustBeCommitted || !1), this._addOutlines(t));
  }
  onUpdatedColor() {
    (this._colorPicker?.update(this.color), super.onUpdatedColor());
  }
  onUpdatedOpacity() {
    this._colorPicker?.updateOpacity?.(this.opacity);
  }
  _addOutlines(t) {
    t.drawOutlines && (this.#r(t), this.#m());
  }
  #r({ drawOutlines: t, drawId: e, drawingOptions: s, clipPathId: i }) {
    ((this._drawOutlines = t),
      (this._drawingOptions ||= s),
      this.annotationElementId || this._uiManager.a11yAlert(D._l10nAlert[this.editorType]),
      e >= 0
        ? ((this._drawId = e),
          (this._clipPathId = i ?? null),
          this.parent.drawLayer.finalizeDraw(e, t.defaultProperties),
          this.#l(this.parent))
        : (this._drawId = this.#o(t, this.parent)),
      this.#b(t.box));
  }
  #o(t, e) {
    const { id: s, clipPathId: i } = e.drawLayer.draw(
      U._mergeSVGProperties(this._drawingOptions.toSVGProperties(), t.defaultSVGProperties),
      !1,
      this.constructor._hasClipPath,
    );
    return (this.constructor._hasClipPath && (this._clipPathId = i), this.#l(e), s);
  }
  #l(t) {
    const e = this._drawOutlines.getFocusSVGProperties(this.#f);
    e &&
      (this._focusDrawId = t.drawLayer.drawOutline(e, this._drawOutlines.focusMustRemoveSelfIntersections));
  }
  #h(t = this.#f) {
    this._focusDrawId !== null &&
      this.parent?.drawLayer.updateProperties(this._focusDrawId, this._drawOutlines.getFocusSVGProperties(t));
  }
  #u(t) {
    this._focusDrawId !== null &&
      this.parent?.drawLayer.updateProperties(this._focusDrawId, { rootClass: t });
  }
  #d() {
    const { parent: t, _drawId: e, _focusDrawId: s, _isVisible: i } = this;
    if (!t || e === null) return;
    const n = { hidden: !i };
    (t.drawLayer.updateProperties(e, { rootClass: n }),
      s !== null && t.drawLayer.updateProperties(s, { rootClass: n }));
  }
  static _mergeSVGProperties(t, e) {
    const s = new Set(Object.keys(t));
    for (const [i, n] of Object.entries(e)) s.has(i) ? Object.assign(t[i], n) : (t[i] = n);
    return t;
  }
  static getDefaultDrawingOptions(t) {
    $("Not implemented");
  }
  static get typesMap() {
    $("Not implemented");
  }
  static get isDrawer() {
    return !0;
  }
  static get _hasClipPath() {
    return !1;
  }
  static get _hasDrawClass() {
    return !0;
  }
  static get supportMultipleDrawings() {
    return !1;
  }
  get _drawRotation() {
    return this.rotation;
  }
  get _opacityName() {
    return this.constructor.typesMap.get(this.opacityType);
  }
  get #f() {
    return (this.parentRotation - this._drawRotation + 360) % 360;
  }
  static updateDefaultParams(t, e) {
    const s = this.typesMap.get(t);
    (s && this._defaultDrawingOptions.updateProperty(s, e),
      this._currentParent &&
        (U.#s.updateProperty(s, e),
        this._currentParent.drawLayer.updateProperties(
          this._currentDrawId,
          this._defaultDrawingOptions.toSVGProperties(),
        )));
  }
  updateParams(t, e) {
    const s = this.constructor.typesMap.get(t);
    s && this._updateProperty(t, s, e);
  }
  static get defaultPropertiesToUpdate() {
    const t = [],
      e = this._defaultDrawingOptions;
    for (const [s, i] of this.typesMap) t.push([s, e[i]]);
    return t;
  }
  get propertiesToUpdate() {
    const t = [],
      { _drawingOptions: e } = this;
    for (const [s, i] of this.constructor.typesMap) t.push([s, e[i]]);
    return t;
  }
  _updateProperty(t, e, s) {
    const i = this._drawingOptions,
      n = i[e],
      r = (a) => {
        i.updateProperty(e, a);
        const o = this._drawOutlines.updateProperty(e, a);
        (o && this.#b(o),
          this.parent?.drawLayer.updateProperties(this._drawId, i.toSVGProperties()),
          t === this.colorType ? this.onUpdatedColor() : t === this.opacityType && this.onUpdatedOpacity());
      };
    this.addCommands({
      cmd: r.bind(this, s),
      undo: r.bind(this, n),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: t,
      overwriteIfSameType: !0,
      keepUndo: !0,
    });
  }
  _updateColorAndOpacity(t, e, s = this.colorAndOpacityType) {
    const i = this.constructor.typesMap.get(this.colorType),
      n = this._opacityName,
      r = this._drawingOptions,
      a = r[i],
      o = r[n],
      l = (h, d) => {
        (r.updateProperty(i, h),
          r.updateProperty(n, d),
          this._drawOutlines.updateProperty(i, h),
          this._drawOutlines.updateProperty(n, d),
          this.parent?.drawLayer.updateProperties(this._drawId, r.toSVGProperties()),
          this.onUpdatedColor(),
          this.onUpdatedOpacity());
      };
    this.addCommands({
      cmd: l.bind(this, t, e),
      undo: l.bind(this, a, o),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: s,
      overwriteIfSameType: !0,
      keepUndo: !0,
    });
  }
  _onResizing() {
    this.parent?.drawLayer.updateProperties(
      this._drawId,
      U._mergeSVGProperties(this._drawOutlines.getPathResizingSVGProperties(this.#p()), { bbox: this.#y() }),
    );
  }
  _onResized() {
    (this.parent?.drawLayer.updateProperties(
      this._drawId,
      U._mergeSVGProperties(this._drawOutlines.getPathResizedSVGProperties(this.#p()), { bbox: this.#y() }),
    ),
      this.#h());
  }
  _onTranslating(t, e) {
    this.parent?.drawLayer.updateProperties(this._drawId, { bbox: this.#y() });
  }
  _onTranslated() {
    this.parent?.drawLayer.updateProperties(
      this._drawId,
      U._mergeSVGProperties(
        this._drawOutlines.getPathTranslatedSVGProperties(this.#p(), this.parentDimensions),
        { bbox: this.#y() },
      ),
    );
  }
  _onStartDragging() {
    this.parent?.drawLayer.updateProperties(this._drawId, { rootClass: { moving: !0 } });
  }
  _onStopDragging() {
    this.parent?.drawLayer.updateProperties(this._drawId, { rootClass: { moving: !1 } });
  }
  get _mustBeDisabledOnCommit() {
    return !0;
  }
  commit() {
    (super.commit(), this._mustBeDisabledOnCommit && (this.disableEditMode(), this.disableEditing()));
  }
  disableEditing() {
    (super.disableEditing(), this.div.classList.toggle("disabled", !0));
  }
  enableEditing() {
    (super.enableEditing(), this.div.classList.toggle("disabled", !1));
  }
  getBaseTranslation() {
    return [0, 0];
  }
  get isResizable() {
    return !0;
  }
  onceAdded(t) {
    (this.annotationElementId || this.parent.addUndoableEditor(this),
      (this._isDraggable = !0),
      this.#e &&
        ((this.#e = !1),
        this.commit(),
        this.parent.setSelected(this),
        t && this.isOnScreen && this.div.focus()));
  }
  remove() {
    (this._uiManager.removeShouldRescale(this), this.#g(), super.remove());
  }
  rebuild() {
    this.parent &&
      (super.rebuild(),
      this.div !== null &&
        (this.#m(), this.#b(this._drawOutlines.box), this.isAttachedToDOM || this.parent.add(this)));
  }
  setParent(t) {
    let e = !1;
    (this.parent && !t
      ? (this._uiManager.removeShouldRescale(this), this.#g())
      : t &&
        (this._uiManager.addShouldRescale(this),
        this.#m(t),
        (e = !this.parent && this.div?.classList.contains("selectedEditor"))),
      super.setParent(t),
      this.#d(),
      e && this.select());
  }
  #g() {
    if (this._drawId === null || !this.parent) return;
    const { drawLayer: t } = this.parent;
    (t.remove(this._drawId),
      (this._drawId = null),
      this._focusDrawId !== null && (t.remove(this._focusDrawId), (this._focusDrawId = null)),
      this._drawingOptions.reset());
  }
  #m(t = this.parent) {
    if (!(this._drawId !== null && this.parent === t)) {
      if (this._drawId !== null) {
        const { drawLayer: e } = this.parent;
        (e.updateParent(this._drawId, t.drawLayer),
          this._focusDrawId !== null && e.updateParent(this._focusDrawId, t.drawLayer));
        return;
      }
      (this._drawingOptions.updateAll(),
        (this._drawId = this.#o(this._drawOutlines, t)),
        this._clipPathId && this.#t && (this.#t.style.clipPath = this._clipPathId));
    }
  }
  #c([t, e, s, i]) {
    const {
      parentDimensions: [n, r],
      _drawRotation: a,
    } = this;
    switch (a) {
      case 90:
        return [e, 1 - t, s * (r / n), i * (n / r)];
      case 180:
        return [1 - t, 1 - e, s, i];
      case 270:
        return [1 - e, t, s * (r / n), i * (n / r)];
      default:
        return [t, e, s, i];
    }
  }
  #p() {
    const {
      x: t,
      y: e,
      width: s,
      height: i,
      parentDimensions: [n, r],
      _drawRotation: a,
    } = this;
    switch (a) {
      case 90:
        return [1 - e, t, s * (n / r), i * (r / n)];
      case 180:
        return [1 - t, 1 - e, s, i];
      case 270:
        return [e, 1 - t, s * (n / r), i * (r / n)];
      default:
        return [t, e, s, i];
    }
  }
  #b(t) {
    (([this.x, this.y, this.width, this.height] = this.#c(t)),
      this.div && (this.fixAndSetPosition(), this.setDims()),
      this._onResized());
  }
  #y(t = this.parentRotation) {
    const {
      x: e,
      y: s,
      width: i,
      height: n,
      _drawRotation: r,
      parentDimensions: [a, o],
    } = this;
    switch ((r * 4 + t) / 90) {
      case 1:
        return [1 - s - n, e, n, i];
      case 2:
        return [1 - e - i, 1 - s - n, i, n];
      case 3:
        return [s, 1 - e - i, n, i];
      case 4:
        return [e, s - i * (a / o), n * (o / a), i * (a / o)];
      case 5:
        return [1 - s, e, i * (a / o), n * (o / a)];
      case 6:
        return [1 - e - n * (o / a), 1 - s, n * (o / a), i * (a / o)];
      case 7:
        return [s - i * (a / o), 1 - e - n * (o / a), i * (a / o), n * (o / a)];
      case 8:
        return [e - i, s - n, i, n];
      case 9:
        return [1 - s, e - i, n, i];
      case 10:
        return [1 - e, 1 - s, i, n];
      case 11:
        return [s - n, 1 - e, n, i];
      case 12:
        return [e - n * (o / a), s, n * (o / a), i * (a / o)];
      case 13:
        return [1 - s - i * (a / o), e - n * (o / a), i * (a / o), n * (o / a)];
      case 14:
        return [1 - e, 1 - s - i * (a / o), n * (o / a), i * (a / o)];
      case 15:
        return [s, 1 - e, i * (a / o), n * (o / a)];
      default:
        return [e, s, i, n];
    }
  }
  rotate(t = this.parentRotation) {
    if (!this.parent || this._drawId === null) return;
    const e = (t - this._drawRotation + 360) % 360;
    (this.parent.drawLayer.updateProperties(
      this._drawId,
      U._mergeSVGProperties({ bbox: this.#y(t) }, this._drawOutlines.updateRotation(e)),
    ),
      this.#h(e));
  }
  show(t = this._isVisible) {
    (super.show(t), this.#d());
  }
  select() {
    (super.select(), this.#u({ hovered: !1, selected: !0 }));
  }
  unselect() {
    (super.unselect(), this.#u({ selected: !1 }));
  }
  pointerover() {
    this.isSelected || this.#u({ hovered: !0 });
  }
  pointerleave() {
    this.isSelected || this.#u({ hovered: !1 });
  }
  onScaleChanging() {
    if (!this.parent) return;
    const t = this._drawOutlines.updateParentDimensions(this.parentDimensions, this.parent.scale);
    t && this.#b(t);
  }
  static onScaleChangingWhenDrawing() {}
  render() {
    if (this.div) return this.div;
    let t, e;
    this._isCopy && ((t = this.x), (e = this.y));
    const s = super.render();
    this.constructor._hasDrawClass && s.classList.add("draw");
    const i = (this.#t = document.createElement("div"));
    return (
      s.append(i),
      i.setAttribute("aria-hidden", "true"),
      (i.className = "internal"),
      this._clipPathId && (i.style.clipPath = this._clipPathId),
      Xi(this, i, ["pointerover", "pointerleave"]),
      this.setDims(),
      this._uiManager.addShouldRescale(this),
      this.disableEditing(),
      this._isCopy && this._moveAfterPaste(t, e),
      s
    );
  }
  static createDrawerInstance(t) {
    $("Not implemented");
  }
  static _getDrawingTarget(t, { target: e }) {
    return e;
  }
  static _getPointerCoords({ offsetX: t, offsetY: e, clientX: s, clientY: i }, n = null) {
    if (!n) return [t, e];
    let r = s - n.clientX,
      a = i - n.clientY;
    switch (this._currentParent.viewport.rotation) {
      case 90:
        [r, a] = [a, -r];
        break;
      case 180:
        [r, a] = [-r, -a];
        break;
      case 270:
        [r, a] = [-a, r];
        break;
    }
    return [n.offsetX + r, n.offsetY + a];
  }
  static _addDrawingListeners(t, e) {}
  static _endDrawingSession(t = !1) {
    return this._currentParent.endDrawingSession(t);
  }
  static startDrawing(t, e, s, i) {
    const { pointerId: n, pointerType: r } = i;
    if (z.isInitializedAndDifferentPointerType(r)) return;
    const a = this._getDrawingTarget(t, i),
      [o, l] = this._getPointerCoords(i),
      {
        viewport: { rotation: h },
      } = t,
      { x: d, y: u, width: f, height: p } = a.getBoundingClientRect(),
      g = (U.#i = new AbortController()),
      m = t.combinedSignal(g);
    if (
      (z.setPointer(r, n),
      window.addEventListener(
        "pointerup",
        (A) => {
          z.isSamePointerIdOrRemove(A.pointerId) && this._endDraw(A);
        },
        { signal: m },
      ),
      window.addEventListener(
        "pointercancel",
        (A) => {
          z.isSamePointerIdOrRemove(A.pointerId) && this._endDrawingSession();
        },
        { signal: m },
      ),
      window.addEventListener(
        "pointerdown",
        (A) => {
          z.isSamePointerType(A.pointerType) &&
            (z.initializeAndAddPointerId(A.pointerId),
            U.#s.isCancellable() &&
              (U.#s.removeLastElement(), U.#s.isEmpty() ? this._endDrawingSession(!0) : this._endDraw(null)));
        },
        { capture: !0, passive: !1, signal: m },
      ),
      window.addEventListener("contextmenu", kt, { signal: m }),
      a.addEventListener("pointermove", this._drawMove.bind(this), { signal: m }),
      a.addEventListener(
        "touchmove",
        (A) => {
          z.isSameTimeStamp(A.timeStamp) && rt(A);
        },
        { signal: m },
      ),
      this._addDrawingListeners(a, m),
      t.toggleDrawing(),
      e._editorUndoBar?.hide(),
      U.#s)
    ) {
      t.drawLayer.updateProperties(this._currentDrawId, U.#s.startNew(o, l, f, p, h));
      return;
    }
    (e.updateUIForDefaultProperties(this),
      (U.#s = this.createDrawerInstance({ x: o, y: l, box: [d, u, f, p], rotation: h, parent: t, isLTR: s })),
      (U.#n = this.getDefaultDrawingOptions()),
      (this._currentParent = t));
    const { id: b, clipPathId: y } = t.drawLayer.draw(
      this._mergeSVGProperties(U.#n.toSVGProperties(), U.#s.defaultSVGProperties),
      !0,
      this._hasClipPath,
    );
    ((this._currentDrawId = b), (U.#a = this._hasClipPath ? y : null));
  }
  static _drawMove(t) {
    if ((z.isSameTimeStamp(t.timeStamp), !U.#s || !z.isSamePointerId(t.pointerId))) return;
    if (z.isUsingMultiplePointers()) {
      this._endDraw(t);
      return;
    }
    let e;
    const s = t.getCoalescedEvents?.();
    if (s?.length) {
      const i = [];
      for (const n of s) i.push(...this._getPointerCoords(n, t));
      e = U.#s.addPoints(i);
    } else e = U.#s.add(...this._getPointerCoords(t));
    (this._currentParent.drawLayer.updateProperties(this._currentDrawId, e),
      z.setTimeStamp(t.timeStamp),
      rt(t));
  }
  static _cleanup(t) {
    (t &&
      ((this._currentDrawId = -1),
      (this._currentParent = null),
      (U.#s = null),
      (U.#n = null),
      (U.#a = null),
      z.clearTimeStamp()),
      U.#i && (U.#i.abort(), (U.#i = null), z.clearPointerIds()));
  }
  static _endDraw(t) {
    const e = this._currentParent;
    if (e) {
      if (
        (e.toggleDrawing(!0),
        this._cleanup(!1),
        e.drawLayer.updateProperties(
          this._currentDrawId,
          t?.target === e.div ? U.#s.end(...this._getPointerCoords(t)) : U.#s.end(),
        ),
        this.supportMultipleDrawings)
      ) {
        const s = U.#s,
          i = this._currentDrawId,
          n = s.getLastElement();
        e.addCommands({
          cmd: () => {
            e.drawLayer.updateProperties(i, s.setLastElement(n));
          },
          undo: () => {
            e.drawLayer.updateProperties(i, s.removeLastElement());
          },
          mustExec: !1,
          type: G.DRAW_STEP,
        });
        return;
      }
      this.endDrawing(!1);
    }
  }
  static endDrawing(t) {
    const e = this._currentParent;
    if (!e) return null;
    if ((e.toggleDrawing(!0), e.cleanUndoStack(G.DRAW_STEP), !U.#s.isEmpty())) {
      const {
          pageDimensions: [s, i],
          scale: n,
        } = e,
        r = e.createAndAddNewEditor({ offsetX: 0, offsetY: 0 }, !1, {
          drawId: this._currentDrawId,
          clipPathId: U.#a,
          drawOutlines: U.#s.getOutlines(s * n, i * n, n, this._INNER_MARGIN),
          drawingOptions: U.#n,
          mustBeCommitted: !t,
        });
      return (this._cleanup(!0), r);
    }
    return (e.drawLayer.remove(this._currentDrawId), this._cleanup(!0), null);
  }
  createDrawingOptions(t) {}
  static deserializeDraw(t, e, s, i, n, r, a) {
    $("Not implemented");
  }
  static async deserialize(t, e, s) {
    const {
        rawDims: { pageWidth: i, pageHeight: n, pageX: r, pageY: a },
      } = e.viewport,
      o = this.deserializeDraw(r, a, i, n, this._INNER_MARGIN, t, s),
      l = await super.deserialize(t, e, s);
    return (l.createDrawingOptions(t), l.#r({ drawOutlines: o }), l.#m(), l.onScaleChanging(), l.rotate(), l);
  }
  serializeDraw(t) {
    const [e, s] = this.pageTranslation,
      [i, n] = this.pageDimensions;
    return this._drawOutlines.serialize([e, s, i, n], t);
  }
  renderAnnotationElement(t) {
    return (t.updateEdited({ rect: this.getPDFRect() }), null);
  }
  static canCreateNewEmptyEditor() {
    return !1;
  }
}