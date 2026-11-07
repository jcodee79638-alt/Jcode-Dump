
var Oqn = Ie(function (wqn) {
  Object.defineProperty(wqn, "__esModule", { value: !0 });
  wqn.BasicTracerProvider = wqn.ForceFlushState = void 0;
  var Sqn = bD(),
    Tqn = Rgt(),
    vqn = gqn(),
    bqn = Icr(),
    jqn = Mqn(),
    Pqn = Dcr(),
    ASe;
  (function (e) {
    ((e[(e.resolved = 0)] = "resolved"),
      (e[(e.timeout = 1)] = "timeout"),
      (e[(e.error = 2)] = "error"),
      (e[(e.unresolved = 3)] = "unresolved"));
  })((ASe = wqn.ForceFlushState || (wqn.ForceFlushState = {})));
  class Cqn {
    _config;
    _tracers = new Map();
    _resource;
    _activeSpanProcessor;
    constructor(e = {}) {
      let t = Sqn.merge({}, bqn.loadDefaultConfig(), Pqn.reconfigureLimits(e));
      ((this._resource = t.resource ?? Tqn.defaultResource()),
        (this._config = Object.assign({}, t, { resource: this._resource })));
      let r = [];
      if (e.spanProcessors?.length) r.push(...e.spanProcessors);
      this._activeSpanProcessor = new jqn.MultiSpanProcessor(r);
    }
    getTracer(e, t, r) {
      let s = `${e}@${t || ""}:${r?.schemaUrl || ""}`;
      if (!this._tracers.has(s))
        this._tracers.set(
          s,
          new vqn.Tracer(
            { name: e, version: t, schemaUrl: r?.schemaUrl },
            this._config,
            this._resource,
            this._activeSpanProcessor,
          ),
        );
      return this._tracers.get(s);
    }
    forceFlush() {
      let e = this._config.forceFlushTimeoutMillis,
        t = this._activeSpanProcessor._spanProcessors.map(
          (r) =>
            new Promise((s) => {
              let a,
                H = setTimeout(() => {
                  (s(Error(`Span processor did not completed within timeout period of ${e} ms`)),
                    (a = ASe.timeout));
                }, e);
              r.forceFlush()
                .then(() => {
                  if ((clearTimeout(H), a !== ASe.timeout)) ((a = ASe.resolved), s(a));
                })
                .catch((u) => {
                  (clearTimeout(H), (a = ASe.error), s(u));
                });
            }),
        );
      return new Promise((r, s) => {
        Promise.all(t)
          .then((a) => {
            let H = a.filter((u) => u !== ASe.resolved);
            if (H.length > 0) s(H);
            else r();
          })
          .catch((a) => s([a]));
      });
    }
    shutdown() {
      return this._activeSpanProcessor.shutdown();
    }
  }
  wqn.BasicTracerProvider = Cqn;
});