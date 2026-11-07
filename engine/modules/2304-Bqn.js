
var Bqn = Ie(function (Nqn) {
  Object.defineProperty(Nqn, "__esModule", { value: !0 });
  Nqn.ConsoleSpanExporter = void 0;
  var uSe = bD();
  class Uqn {
    export(e, t) {
      return this._sendSpans(e, t);
    }
    shutdown() {
      return (this._sendSpans([]), this.forceFlush());
    }
    forceFlush() {
      return Promise.resolve();
    }
    _exportInfo(e) {
      return {
        resource: { attributes: e.resource.attributes },
        instrumentationScope: e.instrumentationScope,
        traceId: e.spanContext().traceId,
        parentSpanContext: e.parentSpanContext,
        traceState: e.spanContext().traceState?.serialize(),
        name: e.name,
        id: e.spanContext().spanId,
        kind: e.kind,
        timestamp: uSe.hrTimeToMicroseconds(e.startTime),
        duration: uSe.hrTimeToMicroseconds(e.duration),
        attributes: e.attributes,
        status: e.status,
        events: e.events,
        links: e.links,
      };
    }
    _sendSpans(e, t) {
      for (let r of e) console.dir(this._exportInfo(r), { depth: 3 });
      if (t) return t({ code: uSe.ExportResultCode.SUCCESS });
    }
  }
  Nqn.ConsoleSpanExporter = Uqn;
});