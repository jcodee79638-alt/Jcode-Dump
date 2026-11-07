
class a0t {
  _shutdownOnce;
  _sharedState;
  constructor(e = {}) {
    let t = {
      resource: e.resource ?? IGn.defaultResource(),
      forceFlushTimeoutMillis: e.forceFlushTimeoutMillis ?? 30000,
      logRecordLimits: {
        attributeCountLimit: e.logRecordLimits?.attributeCountLimit ?? 128,
        attributeValueLengthLimit: e.logRecordLimits?.attributeValueLengthLimit ?? 1 / 0,
      },
      loggerConfigurator: e.loggerConfigurator ?? wcr,
      processors: e.processors ?? [],
    };
    ((this._sharedState = new kcr(
      t.resource,
      t.forceFlushTimeoutMillis,
      t.logRecordLimits,
      t.processors,
      t.loggerConfigurator,
    )),
      (this._shutdownOnce = new DGn.BindOnceFuture(this._shutdown, this)));
  }
  getLogger(e, t, r) {
    if (this._shutdownOnce.isCalled)
      return (a7e.diag.warn("A shutdown LoggerProvider cannot provide a Logger"), i7e);
    if (!e) a7e.diag.warn("Logger requested without instrumentation scope name.");
    let s = e || Pjo,
      a = `${s}@${t || ""}:${r?.schemaUrl || ""}`;
    if (!this._sharedState.loggers.has(a))
      this._sharedState.loggers.set(
        a,
        new jcr({ name: s, version: t, schemaUrl: r?.schemaUrl }, this._sharedState),
      );
    return this._sharedState.loggers.get(a);
  }
  forceFlush() {
    if (this._shutdownOnce.isCalled)
      return (
        a7e.diag.warn("invalid attempt to force flush after LoggerProvider shutdown"),
        this._shutdownOnce.promise
      );
    return this._sharedState.activeProcessor.forceFlush();
  }
  shutdown() {
    if (this._shutdownOnce.isCalled)
      return (
        a7e.diag.warn("shutdown may only be called once per LoggerProvider"),
        this._shutdownOnce.promise
      );
    return this._shutdownOnce.call();
  }
  _shutdown() {
    return this._sharedState.activeProcessor.shutdown();
  }
}