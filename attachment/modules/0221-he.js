
class he {
  #t = null;
  static #e = new WeakSet();
  constructor({
    callback: t,
    params: e,
    objs: s,
    commonObjs: i,
    annotationCanvasMap: n,
    operatorList: r,
    pageIndex: a,
    canvasFactory: o,
    filterFactory: l,
    useRequestAnimationFrame: h = !1,
    pdfBug: d = !1,
    pageColors: u = null,
    enableHWA: f = !1,
    operationsFilter: p = null,
  }) {
    ((this.callback = t),
      (this.params = e),
      (this.objs = s),
      (this.commonObjs = i),
      (this.annotationCanvasMap = n),
      (this.operatorListIdx = null),
      (this.operatorList = r),
      (this._pageIndex = a),
      (this.canvasFactory = o),
      (this.filterFactory = l),
      (this._pdfBug = d),
      (this.pageColors = u),
      (this.running = !1),
      (this.graphicsReadyCallback = null),
      (this.graphicsReady = !1),
      (this._useRequestAnimationFrame = h === !0 && typeof window < "u"),
      (this.cancelled = !1),
      (this.capability = Promise.withResolvers()),
      (this.task = new ga(this)),
      (this._cancelBound = this.cancel.bind(this)),
      (this._continueBound = this._continue.bind(this)),
      (this._scheduleNextBound = this._scheduleNext.bind(this)),
      (this._nextBound = this._next.bind(this)),
      (this._canvas = e.canvas),
      (this._canvasContext = e.canvas ? null : e.canvasContext),
      (this._enableHWA = f),
      (this._dependencyTracker = e.dependencyTracker),
      (this._imagesTracker = e.imagesTracker),
      (this._operationsFilter = p));
  }
  get completed() {
    return this.capability.promise.catch(() => {});
  }
  initializeGraphics({ transparency: t = !1, optionalContentConfig: e }) {
    if (this.cancelled) return;
    if (this._canvas) {
      if (he.#e.has(this._canvas))
        throw new Error(
          "Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.",
        );
      he.#e.add(this._canvas);
    }
    this._pdfBug &&
      globalThis.StepperManager?.enabled &&
      ((this.stepper = globalThis.StepperManager.create(this._pageIndex)),
      this.stepper.init(this.operatorList),
      (this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint()));
    const { viewport: s, transform: i, background: n, dependencyTracker: r, imagesTracker: a } = this.params,
      o =
        this._canvasContext ||
        this._canvas.getContext("2d", { alpha: !1, willReadFrequently: !this._enableHWA });
    ((this.gfx = new qt(
      o,
      this.commonObjs,
      this.objs,
      this.canvasFactory,
      this.filterFactory,
      { optionalContentConfig: e },
      this.annotationCanvasMap,
      this.pageColors,
      r,
      a,
    )),
      this.gfx.beginDrawing({ transform: i, viewport: s, transparency: t, background: n }),
      (this.operatorListIdx = 0),
      (this.graphicsReady = !0),
      this.graphicsReadyCallback?.());
  }
  cancel(t = null, e = 0) {
    ((this.running = !1),
      (this.cancelled = !0),
      this.gfx?.endDrawing(),
      this.#t && (window.cancelAnimationFrame(this.#t), (this.#t = null)),
      he.#e.delete(this._canvas),
      (t ||= new zs(`Rendering cancelled, page ${this._pageIndex + 1}`, e)),
      this.callback(t),
      this.task.onError?.(t));
  }
  operatorListChanged() {
    if (!this.graphicsReady) {
      this.graphicsReadyCallback ||= this._continueBound;
      return;
    }
    (this.gfx.dependencyTracker?.growOperationsCount(this.operatorList.fnArray.length),
      this.stepper?.updateOperatorList(this.operatorList),
      !this.running && this._continue());
  }
  _continue() {
    ((this.running = !0),
      !this.cancelled &&
        (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext()));
  }
  _scheduleNext() {
    this._useRequestAnimationFrame
      ? (this.#t = window.requestAnimationFrame(() => {
          ((this.#t = null), this._nextBound().catch(this._cancelBound));
        }))
      : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
  }
  async _next() {
    this.cancelled ||
      ((this.operatorListIdx = this.gfx.executeOperatorList(
        this.operatorList,
        this.operatorListIdx,
        this._continueBound,
        this.stepper,
        this._operationsFilter,
      )),
      this.operatorListIdx === this.operatorList.argsArray.length &&
        ((this.running = !1),
        this.operatorList.lastChunk && (this.gfx.endDrawing(), he.#e.delete(this._canvas), this.callback())));
  }
}