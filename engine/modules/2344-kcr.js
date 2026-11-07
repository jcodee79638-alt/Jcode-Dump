
class kcr {
  loggers = new Map();
  activeProcessor;
  registeredLogRecordProcessors = [];
  resource;
  forceFlushTimeoutMillis;
  logRecordLimits;
  processors;
  _loggerConfigurator;
  _loggerConfigs = new Map();
  constructor(e, t, r, s, a) {
    if (
      ((this.resource = e),
      (this.forceFlushTimeoutMillis = t),
      (this.logRecordLimits = r),
      (this.processors = s),
      s.length > 0)
    )
      ((this.registeredLogRecordProcessors = s),
        (this.activeProcessor = new Ccr(this.registeredLogRecordProcessors, this.forceFlushTimeoutMillis)));
    else this.activeProcessor = new Pcr();
    this._loggerConfigurator = a ?? wcr;
  }
  getLoggerConfig(e) {
    let t = gGn(e),
      r = this._loggerConfigs.get(t);
    if (r) return r;
    return ((r = this._loggerConfigurator(e)), this._loggerConfigs.set(t, r), r);
  }
}