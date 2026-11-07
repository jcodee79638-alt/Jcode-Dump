
class Bt {
  #t;
  #e = !1;
  #s = null;
  #i = null;
  #n = null;
  #a = new Map();
  #r = !1;
  #o = !1;
  #l = !1;
  #h = null;
  #u = null;
  #d = null;
  #f = null;
  #g = null;
  #m = -1;
  #c;
  static _initialized = !1;
  static #p = new Map([at, ri, Ga, Tt, Dt].map((t) => [t._editorType, t]));
  constructor({
    uiManager: t,
    pageIndex: e,
    div: s,
    structTreeLayer: i,
    accessibilityManager: n,
    annotationLayer: r,
    drawLayer: a,
    textLayer: o,
    viewport: l,
    l10n: h,
  }) {
    const d = [...Bt.#p.values()];
    if (!Bt._initialized) {
      Bt._initialized = !0;
      for (const u of d) u.initialize(h, t);
    }
    (t.registerEditorTypes(d),
      (this.#c = t),
      (this.pageIndex = e),
      (this.div = s),
      (this.#t = n),
      (this.#s = r),
      (this.viewport = l),
      (this.#d = o),
      (this.drawLayer = a),
      (this._structTree = i),
      this.#c.addLayer(this));
  }
  get isEmpty() {
    return this.#a.size === 0;
  }
  get isInvisible() {
    return this.isEmpty && this.#c.getMode() === B.NONE;
  }
  updateToolbar(t) {
    this.#c.updateToolbar(t);
  }
  updateMode(t = this.#c.getMode()) {
    switch ((this.#x(), t)) {
      case B.NONE:
        (this.div.classList.toggle("nonEditing", !0),
          this.disableTextSelection(),
          this.togglePointerEvents(!1),
          this.toggleAnnotationLayerPointerEvents(!0),
          this.disableClick());
        return;
      case B.INK:
        (this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick());
        break;
      case B.HIGHLIGHT:
        (this.enableTextSelection(), this.togglePointerEvents(!1), this.disableClick());
        break;
      default:
        (this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick());
    }
    this.toggleAnnotationLayerPointerEvents(!1);
    const { classList: e } = this.div;
    if ((e.toggle("nonEditing", !1), t === B.POPUP)) e.toggle("commentEditing", !0);
    else {
      e.toggle("commentEditing", !1);
      for (const s of Bt.#p.values()) e.toggle(`${s._type}Editing`, t === s._editorType);
    }
    this.div.hidden = !1;
  }
  hasTextLayer(t) {
    return t === this.#d?.div;
  }
  setEditingState(t) {
    this.#c.setEditingState(t);
  }
  addCommands(t) {
    this.#c.addCommands(t);
  }
  cleanUndoStack(t) {
    this.#c.cleanUndoStack(t);
  }
  toggleDrawing(t = !1) {
    this.div.classList.toggle("drawing", !t);
  }
  togglePointerEvents(t = !1) {
    this.div.classList.toggle("disabled", !t);
  }
  toggleAnnotationLayerPointerEvents(t = !1) {
    this.#s?.togglePointerEvents(t);
  }
  get #b() {
    return this.#a.size !== 0 ? this.#a.values() : this.#c.getEditors(this.pageIndex);
  }
  async enable() {
    ((this.#l = !0),
      (this.div.tabIndex = 0),
      this.togglePointerEvents(!0),
      this.div.classList.toggle("nonEditing", !1),
      this.#g?.abort(),
      (this.#g = null));
    const t = new Set();
    for (const s of this.#b)
      (s.enableEditing(),
        s.show(!0),
        s.annotationElementId && (this.#c.removeChangedExistingAnnotation(s), t.add(s.annotationElementId)));
    const e = this.#s;
    if (e)
      for (const s of e.getEditableAnnotations()) {
        if ((s.hide(), this.#c.isDeletedAnnotationElement(s.data.id) || t.has(s.data.id))) continue;
        const i = await this.deserialize(s);
        i && (this.addOrRebuild(i), i.enableEditing());
      }
    ((this.#l = !1),
      this.#c._eventBus.dispatch("editorsrendered", { source: this, pageNumber: this.pageIndex + 1 }));
  }
  disable() {
    if (
      ((this.#o = !0),
      (this.div.tabIndex = -1),
      this.togglePointerEvents(!1),
      this.div.classList.toggle("nonEditing", !0),
      this.#d && !this.#g)
    ) {
      this.#g = new AbortController();
      const i = this.#c.combinedSignal(this.#g);
      this.#d.div.addEventListener(
        "pointerdown",
        (n) => {
          const { clientX: a, clientY: o, timeStamp: l } = n,
            h = this.#m;
          if (l - h > 500) {
            this.#m = l;
            return;
          }
          this.#m = -1;
          const { classList: d } = this.div;
          d.toggle("getElements", !0);
          const u = document.elementsFromPoint(a, o);
          if ((d.toggle("getElements", !1), !this.div.contains(u[0]))) return;
          let f;
          const p = new RegExp(`^${ue}[0-9]+$`);
          for (const m of u)
            if (p.test(m.id)) {
              f = m.id;
              break;
            }
          if (!f) return;
          const g = this.#a.get(f);
          g?.annotationElementId === null && (rt(n), g.dblclick(n));
        },
        { signal: i, capture: !0 },
      );
    }
    const t = this.#s,
      e = [];
    if (t) {
      const i = new Map(),
        n = new Map();
      for (const r of this.#b) {
        if ((r.disableEditing(), !r.annotationElementId)) {
          e.push(r);
          continue;
        }
        if (r.serialize() !== null) {
          i.set(r.annotationElementId, r);
          continue;
        } else n.set(r.annotationElementId, r);
        (this.getEditableAnnotation(r.annotationElementId)?.show(), r.remove());
      }
      for (const r of t.getEditableAnnotations()) {
        const { id: a } = r.data;
        if (this.#c.isDeletedAnnotationElement(a)) {
          r.updateEdited({ deleted: !0 });
          continue;
        }
        let o = n.get(a);
        if (o) {
          (o.resetAnnotationElement(r), o.show(!1), r.show());
          continue;
        }
        ((o = i.get(a)),
          o && (this.#c.addChangedExistingAnnotation(o), o.renderAnnotationElement(r) && o.show(!1)),
          r.show());
      }
    }
    (this.#x(), this.isEmpty && (this.div.hidden = !0));
    const { classList: s } = this.div;
    for (const i of Bt.#p.values()) s.remove(`${i._type}Editing`);
    (this.disableTextSelection(),
      this.toggleAnnotationLayerPointerEvents(!0),
      t?.updateFakeAnnotations(e),
      (this.#o = !1));
  }
  getEditableAnnotation(t) {
    return this.#s?.getEditableAnnotation(t) || null;
  }
  setActiveEditor(t) {
    this.#c.getActive() !== t && this.#c.setActiveEditor(t);
  }
  enableTextSelection() {
    if (((this.div.tabIndex = -1), this.#d?.div && !this.#f)) {
      this.#f = new AbortController();
      const t = this.#c.combinedSignal(this.#f);
      (this.#d.div.addEventListener("pointerdown", this.#y.bind(this), { signal: t }),
        this.#d.div.classList.add("highlighting"));
    }
  }
  disableTextSelection() {
    ((this.div.tabIndex = 0),
      this.#d?.div &&
        this.#f &&
        (this.#f.abort(), (this.#f = null), this.#d.div.classList.remove("highlighting")));
  }
  #y(t) {
    this.#c.unselectAll();
    const { target: e } = t;
    if (
      e === this.#d.div ||
      ((e.getAttribute("role") === "img" ||
        e.classList.contains("endOfContent") ||
        e.classList.contains("textLayerImages") ||
        e.classList.contains("textLayerImagePlaceholder")) &&
        this.#d.div.contains(e))
    ) {
      const { isMac: s } = j.platform;
      if (t.button !== 0 || (t.ctrlKey && s)) return;
      (this.#c.showAllEditors("highlight", !0, !0),
        Tt.startDrawing(this, this.#c, this.#c.direction === "ltr", t),
        t.preventDefault());
    }
  }
  enableClick() {
    if (this.#i) return;
    this.#i = new AbortController();
    const t = this.#c.combinedSignal(this.#i);
    this.div.addEventListener("pointerdown", this.pointerdown.bind(this), { signal: t });
    const e = this.pointerup.bind(this);
    (this.div.addEventListener("pointerup", e, { signal: t }),
      this.div.addEventListener("pointercancel", e, { signal: t }));
  }
  disableClick() {
    (this.#i?.abort(), (this.#i = null));
  }
  attach(t) {
    this.#a.set(t.id, t);
    const { annotationElementId: e } = t;
    e && this.#c.isDeletedAnnotationElement(e) && this.#c.removeDeletedAnnotationElement(t);
  }
  detach(t) {
    (this.#a.delete(t.id),
      this.#t?.removePointerInTextLayer(t.contentDiv),
      !this.#o && t.annotationElementId && this.#c.addDeletedAnnotationElement(t));
  }
  remove(t) {
    (this.detach(t), this.#c.removeEditor(t), t.div.remove(), (t.isAttachedToDOM = !1));
  }
  changeParent(t) {
    t.parent !== this &&
      (t.parent &&
        t.annotationElementId &&
        (this.#c.addDeletedAnnotationElement(t),
        D.deleteAnnotationElement(t),
        (t.annotationElementId = null)),
      this.attach(t),
      t.parent?.detach(t),
      t.setParent(this),
      t.div && t.isAttachedToDOM && (t.div.remove(), this.div.append(t.div)));
  }
  add(t) {
    if (!(t.parent === this && t.isAttachedToDOM)) {
      if ((this.changeParent(t), this.#c.addEditor(t), this.attach(t), !t.isAttachedToDOM)) {
        const e = t.render();
        (this.div.append(e), (t.isAttachedToDOM = !0));
      }
      (t.fixAndSetPosition(),
        t.onceAdded(!this.#l),
        this.#c.addToAnnotationStorage(t),
        t._reportTelemetry(t.telemetryInitialData));
    }
  }
  moveEditorInDOM(t) {
    if (!t.isAttachedToDOM) return;
    const { activeElement: e } = document;
    (t.div.contains(e) &&
      !this.#n &&
      ((t._focusEventsAllowed = !1),
      (this.#n = setTimeout(() => {
        ((this.#n = null),
          t.div.contains(document.activeElement)
            ? (t._focusEventsAllowed = !0)
            : (t.div.addEventListener(
                "focusin",
                () => {
                  t._focusEventsAllowed = !0;
                },
                { once: !0, signal: this.#c._signal },
              ),
              e.focus()));
      }, 0))),
      (t._structTreeParentId = this.#t?.moveElementInDOM(this.div, t.div, t.contentDiv, !0)));
  }
  addOrRebuild(t) {
    t.needsToBeRebuilt() ? ((t.parent ||= this), t.rebuild(), t.show()) : this.add(t);
  }
  addUndoableEditor(t) {
    const e = () => t._uiManager.rebuild(t),
      s = () => {
        t.remove();
      };
    this.addCommands({ cmd: e, undo: s, mustExec: !1 });
  }
  getEditorByUID(t) {
    for (const e of this.#a.values()) if (e.uid === t) return e;
    return null;
  }
  get #A() {
    return Bt.#p.get(this.#c.getMode());
  }
  combinedSignal(t) {
    return this.#c.combinedSignal(t);
  }
  #v(t) {
    const e = this.#A;
    return e ? new e.prototype.constructor(t) : null;
  }
  canCreateNewEmptyEditor() {
    return this.#A?.canCreateNewEmptyEditor();
  }
  async pasteEditor(t, e) {
    (this.updateToolbar(t), await this.#c.updateMode(t.mode));
    const { offsetX: s, offsetY: i } = this.#w(),
      n = this.#c.getId(),
      r = this.#v({ parent: this, id: n, x: s, y: i, uiManager: this.#c, isCentered: !0, ...e });
    r && this.add(r);
  }
  async deserialize(t) {
    return (
      (await Bt.#p.get(t.annotationType ?? t.annotationEditorType)?.deserialize(t, this, this.#c)) || null
    );
  }
  createAndAddNewEditor(t, e, s = {}) {
    const i = this.#c.getId(),
      n = this.#v({
        parent: this,
        id: i,
        x: t.offsetX,
        y: t.offsetY,
        uiManager: this.#c,
        isCentered: e,
        ...s,
      });
    return (n && this.add(n), n);
  }
  get boundingClientRect() {
    return this.div.getBoundingClientRect();
  }
  #w() {
    const { x: t, y: e, width: s, height: i } = this.boundingClientRect,
      n = Math.max(0, t),
      r = Math.max(0, e),
      a = Math.min(window.innerWidth, t + s),
      o = Math.min(window.innerHeight, e + i),
      l = (n + a) / 2 - t,
      h = (r + o) / 2 - e,
      [d, u] = this.viewport.rotation % 180 === 0 ? [l, h] : [h, l];
    return { offsetX: d, offsetY: u };
  }
  addNewEditor(t = {}) {
    this.createAndAddNewEditor(this.#w(), !0, t);
  }
  setSelected(t) {
    this.#c.setSelected(t);
  }
  toggleSelected(t) {
    this.#c.toggleSelected(t);
  }
  unselect(t) {
    this.#c.unselect(t);
  }
  pointerup(t) {
    const { isMac: e } = j.platform;
    if (
      t.button !== 0 ||
      (t.ctrlKey && e) ||
      t.target !== this.div ||
      !this.#r ||
      ((this.#r = !1), this.#A?.isDrawer && this.#A.supportMultipleDrawings)
    )
      return;
    if (!this.#e) {
      this.#e = !0;
      return;
    }
    const s = this.#c.getMode();
    if (s === B.STAMP || s === B.POPUP || s === B.SIGNATURE) {
      this.#c.unselectAll();
      return;
    }
    this.createAndAddNewEditor(t, !1);
  }
  pointerdown(t) {
    if ((this.#c.getMode() === B.HIGHLIGHT && this.enableTextSelection(), this.#r)) {
      this.#r = !1;
      return;
    }
    const { isMac: e } = j.platform;
    if (t.button !== 0 || (t.ctrlKey && e) || t.target !== this.div) return;
    if (((this.#r = !0), this.#A?.isDrawer)) {
      this.startDrawingSession(t);
      return;
    }
    const s = this.#c.getActive();
    this.#e = !s || s.isEmpty();
  }
  startDrawingSession(t) {
    if ((this.div.focus({ preventScroll: !0 }), this.#h)) {
      this.#A.startDrawing(this, this.#c, !1, t);
      return;
    }
    (this.#c.setCurrentDrawingSession(this), (this.#h = new AbortController()));
    const e = this.#c.combinedSignal(this.#h);
    (this.div.addEventListener(
      "blur",
      ({ relatedTarget: s }) => {
        s && !this.div.contains(s) && ((this.#u = null), this.commitOrRemove());
      },
      { signal: e },
    ),
      this.#A.startDrawing(this, this.#c, !1, t));
  }
  pause(t) {
    if (t) {
      const { activeElement: e } = document;
      this.div.contains(e) && (this.#u = e);
      return;
    }
    this.#u &&
      setTimeout(() => {
        (this.#u?.focus(), (this.#u = null));
      }, 0);
  }
  endDrawingSession(t = !1) {
    return this.#h
      ? (this.#c.setCurrentDrawingSession(null),
        this.#h.abort(),
        (this.#h = null),
        (this.#u = null),
        this.#A.endDrawing(t))
      : null;
  }
  findNewParent(t, e, s) {
    const i = this.#c.findParent(e, s);
    return i === null || i === this ? !1 : (i.changeParent(t), !0);
  }
  commitOrRemove() {
    return this.#h ? (this.endDrawingSession(), !0) : !1;
  }
  onScaleChanging() {
    this.#h && this.#A.onScaleChangingWhenDrawing(this);
  }
  destroy() {
    (this.commitOrRemove(),
      this.#c.getActive()?.parent === this && (this.#c.commitOrRemove(), this.#c.setActiveEditor(null)),
      this.#n && (clearTimeout(this.#n), (this.#n = null)));
    for (const t of this.#a.values())
      (this.#t?.removePointerInTextLayer(t.contentDiv),
        t.setParent(null),
        (t.isAttachedToDOM = !1),
        t.div.remove());
    ((this.div = null), this.#a.clear(), this.#c.removeLayer(this));
  }
  #x() {
    for (const t of this.#a.values()) t.isEmpty() && t.remove();
  }
  async render({ viewport: t }) {
    ((this.viewport = t), Qt(this.div, t));
    for (const e of this.#c.getEditors(this.pageIndex)) (this.add(e), e.rebuild());
    (await this.#c.findClonesForPage(this), (this.div.hidden = this.isEmpty), this.updateMode());
  }
  update({ viewport: t }) {
    (this.#c.commitOrRemove(), this.#x());
    const e = this.viewport.rotation,
      s = t.rotation;
    if (((this.viewport = t), Qt(this.div, { rotation: s }), e !== s))
      for (const i of this.#a.values()) i.rotate(s);
  }
  get pageDimensions() {
    const { pageWidth: t, pageHeight: e } = this.viewport.rawDims;
    return [t, e];
  }
  get scale() {
    return this.#c.viewParameters.realScale;
  }
}