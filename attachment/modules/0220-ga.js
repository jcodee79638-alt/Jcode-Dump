
class ga {
  _internalRenderTask = null;
  onContinue = null;
  onError = null;
  constructor(t) {
    this._internalRenderTask = t;
  }
  get promise() {
    return this._internalRenderTask.capability.promise;
  }
  cancel(t = 0) {
    this._internalRenderTask.cancel(null, t);
  }
  get separateAnnots() {
    const { separateAnnots: t } = this._internalRenderTask.operatorList;
    if (!t) return !1;
    const { annotationCanvasMap: e } = this._internalRenderTask;
    return t.form || (t.canvas && e?.size > 0);
  }
  get imageCoordinates() {
    return this._internalRenderTask.imageCoordinates || null;
  }
}