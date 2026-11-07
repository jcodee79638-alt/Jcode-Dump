
var gcr = Ie(function (M4n) {
  Object.defineProperty(M4n, "__esModule", { value: !0 });
  M4n.ParentBasedSampler = void 0;
  var $oe = kf(),
    D4n = bD(),
    qgt = Wgt(),
    aSe = Vgt();
  class y4n {
    _root;
    _remoteParentSampled;
    _remoteParentNotSampled;
    _localParentSampled;
    _localParentNotSampled;
    constructor(e) {
      if (((this._root = e.root), !this._root))
        (D4n.globalErrorHandler(Error("ParentBasedSampler must have a root sampler configured")),
          (this._root = new aSe.AlwaysOnSampler()));
      ((this._remoteParentSampled = e.remoteParentSampled ?? new aSe.AlwaysOnSampler()),
        (this._remoteParentNotSampled = e.remoteParentNotSampled ?? new qgt.AlwaysOffSampler()),
        (this._localParentSampled = e.localParentSampled ?? new aSe.AlwaysOnSampler()),
        (this._localParentNotSampled = e.localParentNotSampled ?? new qgt.AlwaysOffSampler()));
    }
    shouldSample(e, t, r, s, a, H) {
      let u = $oe.trace.getSpanContext(e);
      if (!u || !$oe.isSpanContextValid(u)) return this._root.shouldSample(e, t, r, s, a, H);
      if (u.isRemote) {
        if (u.traceFlags & $oe.TraceFlags.SAMPLED)
          return this._remoteParentSampled.shouldSample(e, t, r, s, a, H);
        return this._remoteParentNotSampled.shouldSample(e, t, r, s, a, H);
      }
      if (u.traceFlags & $oe.TraceFlags.SAMPLED)
        return this._localParentSampled.shouldSample(e, t, r, s, a, H);
      return this._localParentNotSampled.shouldSample(e, t, r, s, a, H);
    }
    toString() {
      return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
    }
  }
  M4n.ParentBasedSampler = y4n;
});