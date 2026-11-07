
class jcr {
  instrumentationScope;
  _sharedState;
  _loggerConfig;
  constructor(e, t) {
    ((this.instrumentationScope = e),
      (this._sharedState = t),
      (this._loggerConfig = this._sharedState.getLoggerConfig(this.instrumentationScope)));
  }
  emit(e) {
    let t = this._loggerConfig,
      r = e.context || qY.context.active(),
      s = e.severityNumber ?? Yj.UNSPECIFIED;
    if (s !== Yj.UNSPECIFIED && s < t.minimumSeverity) return;
    if (t.traceBased) {
      let H = qY.trace.getSpanContext(r);
      if (H && qY.isSpanContextValid(H)) {
        if ((H.traceFlags & qY.TraceFlags.SAMPLED) !== qY.TraceFlags.SAMPLED) return;
      }
    }
    let a = new bcr(this._sharedState, this.instrumentationScope, { context: r, ...e });
    (this._sharedState.activeProcessor.onEmit(a, r), a._makeReadonly());
  }
}