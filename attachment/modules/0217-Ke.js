
class Ke {
  #t = !1;
  #e = null;
  static #s = 0;
  constructor(t, e, s, i, n = !1) {
    ((this._pageIndex = t),
      (this._id = Ke.#s++),
      (this._pageInfo = e),
      (this._transport = s),
      (this._stats = n ? new ui() : null),
      (this._pdfBug = n),
      (this.commonObjs = s.commonObjs),
      (this.objs = new ln()),
      (this._intentStates = new Map()),
      (this.destroyed = !1),
      (this.recordedBBoxes = null),
      (this.#e = i),
      (this.imageCoordinates = null));
  }
  clone(t) {
    const e = new Ke(t, this._pageInfo, this._transport, this.#e, this._pdfBug);
    return ((e.clonedFromIndex = this.clonedFromIndex ?? this._pageIndex), this._transport.updatePage(e), e);
  }
  get pageNumber() {
    return this._pageIndex + 1;
  }
  set pageNumber(t) {
    ((this._pageIndex = t - 1), this._transport.updatePage(this));
  }
  get rotate() {
    return this._pageInfo.rotate;
  }
  get ref() {
    return this._pageInfo.ref;
  }
  get userUnit() {
    return this._pageInfo.userUnit;
  }
  get view() {
    return this._pageInfo.view;
  }
  getViewport({
    scale: t,
    rotation: e = this.rotate,
    offsetX: s = 0,
    offsetY: i = 0,
    dontFlip: n = !1,
  } = {}) {
    return new Me({
      viewBox: this.view,
      userUnit: this.userUnit,
      scale: t,
      rotation: e,
      offsetX: s,
      offsetY: i,
      dontFlip: n,
    });
  }
  getAnnotations({ intent: t = "display" } = {}) {
    const { renderingIntent: e } = this._transport.getRenderingIntent(t);
    return this._transport.getAnnotations(this._pageIndex, e);
  }
  getJSActions() {
    return this._transport.getPageJSActions(this._pageIndex);
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get isPureXfa() {
    return k(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  async getXfa() {
    return this._transport._htmlForXfa?.children[this._pageIndex] || null;
  }
  render({
    canvasContext: t,
    canvas: e = t.canvas,
    viewport: s,
    intent: i = "display",
    annotationMode: n = $t.ENABLE,
    transform: r = null,
    background: a = null,
    optionalContentConfigPromise: o = null,
    annotationCanvasMap: l = null,
    pageColors: h = null,
    printAnnotationStorage: d = null,
    isEditing: u = !1,
    recordImages: f = !1,
    recordOperations: p = !1,
    operationsFilter: g = null,
  }) {
    this._stats?.time("Overall");
    const m = this._transport.getRenderingIntent(i, n, d, u),
      { renderingIntent: b, cacheKey: y } = m;
    ((this.#t = !1), (o ||= this._transport.getOptionalContentConfig(b)));
    const A = this._intentStates.getOrInsertComputed(y, Ts);
    A.streamReaderCancelTimeout &&
      (clearTimeout(A.streamReaderCancelTimeout), (A.streamReaderCancelTimeout = null));
    const w = !!(b & pt.PRINT);
    A.displayReadyCapability ||
      ((A.displayReadyCapability = Promise.withResolvers()),
      (A.operatorList = { fnArray: [], argsArray: [], lastChunk: !1, separateAnnots: null }),
      this._stats?.time("Page Request"),
      this._pumpOperatorList(m));
    const v = !!(this._pdfBug && globalThis.StepperManager?.enabled),
      S = !!e && !this.recordedBBoxes && (p || v),
      x = !!e && !this.imageCoordinates && f,
      _ = (L) => {
        if ((A.renderTasks.delete(C), S)) {
          const O = C.gfx?.dependencyTracker.take();
          O &&
            (C.stepper?.setOperatorBBoxes(O, C.gfx.dependencyTracker.takeDebugMetadata()),
            p && (this.recordedBBoxes = O));
        }
        (x && !L && (this.imageCoordinates = C.gfx?.imagesTracker.take()),
          w && (this.#t = !0),
          this.#i(),
          L
            ? (C.capability.reject(L),
              this._abortOperatorList({ intentState: A, reason: L instanceof Error ? L : new Error(L) }))
            : C.capability.resolve(),
          this._stats &&
            (this._stats.timeEnd("Rendering"),
            this._stats.timeEnd("Overall"),
            globalThis.Stats?.enabled && globalThis.Stats.add(this.pageNumber, this._stats)));
      };
    let E = null,
      P = null;
    ((S || x) && (P = new ir(e, A.operatorList.length)), S && (E = new nr(P, v)));
    const C = new he({
      callback: _,
      params: {
        canvas: e,
        canvasContext: t,
        dependencyTracker: E ?? P,
        imagesTracker: x ? new Ye(e) : null,
        viewport: s,
        transform: r,
        background: a,
      },
      objs: this.objs,
      commonObjs: this.commonObjs,
      annotationCanvasMap: l,
      operatorList: A.operatorList,
      pageIndex: this._pageIndex,
      canvasFactory: this._transport.canvasFactory,
      filterFactory: this._transport.filterFactory,
      useRequestAnimationFrame: !w,
      pdfBug: this._pdfBug,
      pageColors: h,
      enableHWA: this._transport.enableHWA,
      operationsFilter: g,
    });
    (A.renderTasks ||= new Set()).add(C);
    const R = C.task;
    return (
      Promise.all([A.displayReadyCapability.promise, o])
        .then(([L, O]) => {
          if (this.destroyed) {
            _();
            return;
          }
          if ((this._stats?.time("Rendering"), !(O.renderingIntent & b)))
            throw new Error(
              "Must use the same `intent`-argument when calling the `PDFPageProxy.render` and `PDFDocumentProxy.getOptionalContentConfig` methods.",
            );
          (C.initializeGraphics({ transparency: L, optionalContentConfig: O }), C.operatorListChanged());
        })
        .catch(_),
      R
    );
  }
  getOperatorList({
    intent: t = "display",
    annotationMode: e = $t.ENABLE,
    printAnnotationStorage: s = null,
    isEditing: i = !1,
  } = {}) {
    function n() {
      a.operatorList.lastChunk && (a.opListReadCapability.resolve(a.operatorList), a.renderTasks.delete(o));
    }
    const r = this._transport.getRenderingIntent(t, e, s, i, !0),
      a = this._intentStates.getOrInsertComputed(r.cacheKey, Ts);
    let o;
    return (
      a.opListReadCapability ||
        ((o = Object.create(null)),
        (o.operatorListChanged = n),
        (a.opListReadCapability = Promise.withResolvers()),
        (a.renderTasks ||= new Set()).add(o),
        (a.operatorList = { fnArray: [], argsArray: [], lastChunk: !1, separateAnnots: null }),
        this._stats?.time("Page Request"),
        this._pumpOperatorList(r)),
      a.opListReadCapability.promise
    );
  }
  streamTextContent({ includeMarkedContent: t = !1, disableNormalization: e = !1 } = {}) {
    return this._transport.messageHandler.sendWithStream(
      "GetTextContent",
      {
        pageId: this.#e.getPageId(this._pageIndex + 1) - 1,
        pageIndex: this._pageIndex,
        includeMarkedContent: t === !0,
        disableNormalization: e === !0,
      },
      { highWaterMark: 100, size: (i) => i.items.length },
    );
  }
  async getTextContent(t = {}) {
    if (this._transport._htmlForXfa) return this.getXfa().then((i) => Ce.textContent(i));
    const e = this.streamTextContent(t),
      s = { items: [], styles: Object.create(null), lang: null };
    for await (const i of e)
      ((s.lang ??= i.lang), Object.assign(s.styles, i.styles), s.items.push(...i.items));
    return s;
  }
  getStructTree() {
    return this._transport.getStructTree(this._pageIndex);
  }
  _destroy() {
    this.destroyed = !0;
    const t = [];
    for (const e of this._intentStates.values())
      if (
        (this._abortOperatorList({ intentState: e, reason: new Error("Page was destroyed."), force: !0 }),
        !e.opListReadCapability)
      )
        for (const s of e.renderTasks) (t.push(s.completed), s.cancel());
    return (this.objs.clear(), (this.#t = !1), Promise.all(t));
  }
  cleanup(t = !1) {
    this.#t = !0;
    const e = this.#i();
    return (t && e && (this._stats &&= new ui()), e);
  }
  #i() {
    if (!this.#t || this.destroyed) return !1;
    for (const { renderTasks: t, operatorList: e } of this._intentStates.values())
      if (t.size > 0 || !e.lastChunk) return !1;
    return (this._intentStates.clear(), this.objs.clear(), (this.#t = !1), !0);
  }
  _startRenderPage(t, e) {
    const s = this._intentStates.get(e);
    s && (this._stats?.timeEnd("Page Request"), s.displayReadyCapability?.resolve(t));
  }
  _renderPageChunk(t, e) {
    for (let s = 0, i = t.length; s < i; s++)
      (e.operatorList.fnArray.push(t.fnArray[s]), e.operatorList.argsArray.push(t.argsArray[s]));
    ((e.operatorList.lastChunk = t.lastChunk), (e.operatorList.separateAnnots = t.separateAnnots));
    for (const s of e.renderTasks) s.operatorListChanged();
    t.lastChunk && this.#i();
  }
  _pumpOperatorList({ renderingIntent: t, cacheKey: e, annotationStorageSerializable: s, modifiedIds: i }) {
    const { map: n, transfer: r } = s,
      o = this._transport.messageHandler
        .sendWithStream(
          "GetOperatorList",
          {
            pageId: this.#e.getPageId(this._pageIndex + 1) - 1,
            pageIndex: this._pageIndex,
            pageProxyId: this._id,
            intent: t,
            cacheKey: e,
            annotationStorage: n,
            modifiedIds: i,
          },
          void 0,
          r,
        )
        .getReader(),
      l = this._intentStates.get(e);
    l.streamReader = o;
    const h = () => {
      o.read().then(
        ({ value: d, done: u }) => {
          if (u) {
            l.streamReader = null;
            return;
          }
          this._transport.destroyed || (this._renderPageChunk(d, l), h());
        },
        (d) => {
          if (((l.streamReader = null), !this._transport.destroyed)) {
            if (l.operatorList) {
              l.operatorList.lastChunk = !0;
              for (const u of l.renderTasks) u.operatorListChanged();
              this.#i();
            }
            if (l.displayReadyCapability) l.displayReadyCapability.reject(d);
            else if (l.opListReadCapability) l.opListReadCapability.reject(d);
            else throw d;
          }
        },
      );
    };
    h();
  }
  _abortOperatorList({ intentState: t, reason: e, force: s = !1 }) {
    if (t.streamReader) {
      if (
        (t.streamReaderCancelTimeout &&
          (clearTimeout(t.streamReaderCancelTimeout), (t.streamReaderCancelTimeout = null)),
        !s)
      ) {
        if (t.renderTasks.size > 0) return;
        if (e instanceof zs) {
          let i = ua;
          (e.extraDelay > 0 && e.extraDelay < 1e3 && (i += e.extraDelay),
            (t.streamReaderCancelTimeout = setTimeout(() => {
              ((t.streamReaderCancelTimeout = null),
                this._abortOperatorList({ intentState: t, reason: e, force: !0 }));
            }, i)));
          return;
        }
      }
      if (
        (t.streamReader.cancel(new zt(e.message)).catch(() => {}),
        (t.streamReader = null),
        !this._transport.destroyed)
      ) {
        for (const [i, n] of this._intentStates)
          if (n === t) {
            this._intentStates.delete(i);
            break;
          }
        this.cleanup();
      }
    }
  }
  get stats() {
    return this._stats;
  }
}