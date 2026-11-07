
var p4n = Ie(function (l4n) {
  Object.defineProperty(l4n, "__esModule", { value: !0 });
  l4n.SpanImpl = void 0;
  var I_ = kf(),
    D_ = bD(),
    n8 = foe(),
    A4n = c4n();
  class u4n {
    _spanContext;
    kind;
    parentSpanContext;
    attributes = {};
    links = [];
    events = [];
    startTime;
    resource;
    instrumentationScope;
    _droppedAttributesCount = 0;
    _droppedEventsCount = 0;
    _droppedLinksCount = 0;
    _attributesCount = 0;
    name;
    status = { code: I_.SpanStatusCode.UNSET };
    endTime = [0, 0];
    _ended = !1;
    _duration = [-1, -1];
    _spanProcessor;
    _spanLimits;
    _attributeValueLengthLimit;
    _recordEndMetrics;
    _performanceStartTime;
    _performanceOffset;
    _startTimeProvided;
    constructor(e) {
      let t = Date.now();
      if (
        ((this._spanContext = e.spanContext),
        (this._performanceStartTime = D_.otperformance.now()),
        (this._performanceOffset = t - (this._performanceStartTime + D_.otperformance.timeOrigin)),
        (this._startTimeProvided = e.startTime != null),
        (this._spanLimits = e.spanLimits),
        (this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit ?? 0),
        (this._spanProcessor = e.spanProcessor),
        (this.name = e.name),
        (this.parentSpanContext = e.parentSpanContext),
        (this.kind = e.kind),
        e.links)
      )
        for (let r of e.links) this.addLink(r);
      if (
        ((this.startTime = this._getTime(e.startTime ?? t)),
        (this.resource = e.resource),
        (this.instrumentationScope = e.scope),
        (this._recordEndMetrics = e.recordEndMetrics),
        e.attributes != null)
      )
        this.setAttributes(e.attributes);
      this._spanProcessor.onStart(this, e.context);
    }
    spanContext() {
      return this._spanContext;
    }
    setAttribute(e, t) {
      if (t == null || this._isSpanEnded()) return this;
      if (e.length === 0) return (I_.diag.warn(`Invalid attribute key: ${e}`), this);
      if (!D_.isAttributeValue(t)) return (I_.diag.warn(`Invalid attribute value set for key: ${e}`), this);
      let { attributeCountLimit: r } = this._spanLimits,
        s = !Object.prototype.hasOwnProperty.call(this.attributes, e);
      if (r !== void 0 && this._attributesCount >= r && s) return (this._droppedAttributesCount++, this);
      if (((this.attributes[e] = this._truncateToSize(t)), s)) this._attributesCount++;
      return this;
    }
    setAttributes(e) {
      for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t)) this.setAttribute(t, e[t]);
      return this;
    }
    addEvent(e, t, r) {
      if (this._isSpanEnded()) return this;
      let { eventCountLimit: s } = this._spanLimits;
      if (s === 0) return (I_.diag.warn("No events allowed."), this._droppedEventsCount++, this);
      if (s !== void 0 && this.events.length >= s) {
        if (this._droppedEventsCount === 0) I_.diag.debug("Dropping extra events.");
        (this.events.shift(), this._droppedEventsCount++);
      }
      if (D_.isTimeInput(t)) {
        if (!D_.isTimeInput(r)) r = t;
        t = void 0;
      }
      let a = D_.sanitizeAttributes(t),
        { attributePerEventCountLimit: H } = this._spanLimits,
        u = {},
        f = 0,
        d = 0;
      for (let _ in a) {
        if (!Object.prototype.hasOwnProperty.call(a, _)) continue;
        let L = a[_];
        if (H !== void 0 && d >= H) {
          f++;
          continue;
        }
        ((u[_] = this._truncateToSize(L)), d++);
      }
      return (
        this.events.push({ name: e, attributes: u, time: this._getTime(r), droppedAttributesCount: f }),
        this
      );
    }
    addLink(e) {
      if (this._isSpanEnded()) return this;
      let { linkCountLimit: t } = this._spanLimits;
      if (t === 0) return (this._droppedLinksCount++, this);
      if (t !== void 0 && this.links.length >= t) {
        if (this._droppedLinksCount === 0) I_.diag.debug("Dropping extra links.");
        (this.links.shift(), this._droppedLinksCount++);
      }
      let { attributePerLinkCountLimit: r } = this._spanLimits,
        s = D_.sanitizeAttributes(e.attributes),
        a = {},
        H = 0,
        u = 0;
      for (let d in s) {
        if (!Object.prototype.hasOwnProperty.call(s, d)) continue;
        let _ = s[d];
        if (r !== void 0 && u >= r) {
          H++;
          continue;
        }
        ((a[d] = this._truncateToSize(_)), u++);
      }
      let f = { context: e.context };
      if (u > 0) f.attributes = a;
      if (H > 0) f.droppedAttributesCount = H;
      return (this.links.push(f), this);
    }
    addLinks(e) {
      for (let t of e) this.addLink(t);
      return this;
    }
    setStatus(e) {
      if (this._isSpanEnded()) return this;
      if (e.code === I_.SpanStatusCode.UNSET) return this;
      if (this.status.code === I_.SpanStatusCode.OK) return this;
      let t = { code: e.code };
      if (e.code === I_.SpanStatusCode.ERROR) {
        if (typeof e.message === "string") t.message = e.message;
        else if (e.message != null)
          I_.diag.warn(`Dropping invalid status.message of type '${typeof e.message}', expected 'string'`);
      }
      return ((this.status = t), this);
    }
    updateName(e) {
      if (this._isSpanEnded()) return this;
      return ((this.name = e), this);
    }
    end(e) {
      if (this._isSpanEnded()) {
        I_.diag.error(
          `${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`,
        );
        return;
      }
      if (
        ((this.endTime = this._getTime(e)),
        (this._duration = D_.hrTimeDuration(this.startTime, this.endTime)),
        this._duration[0] < 0)
      )
        (I_.diag.warn(
          "Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.",
          this.startTime,
          this.endTime,
        ),
          (this.endTime = this.startTime.slice()),
          (this._duration = [0, 0]));
      if (this._droppedEventsCount > 0)
        I_.diag.warn(`Dropped ${this._droppedEventsCount} events because eventCountLimit reached`);
      if (this._droppedLinksCount > 0)
        I_.diag.warn(`Dropped ${this._droppedLinksCount} links because linkCountLimit reached`);
      if (this._spanProcessor.onEnding) this._spanProcessor.onEnding(this);
      (this._recordEndMetrics?.(), (this._ended = !0), this._spanProcessor.onEnd(this));
    }
    _getTime(e) {
      if (typeof e === "number" && e <= D_.otperformance.now()) return D_.hrTime(e + this._performanceOffset);
      if (typeof e === "number") return D_.millisToHrTime(e);
      if (e instanceof Date) return D_.millisToHrTime(e.getTime());
      if (D_.isTimeInputHrTime(e)) return e;
      if (this._startTimeProvided) return D_.millisToHrTime(Date.now());
      let t = D_.otperformance.now() - this._performanceStartTime;
      return D_.addHrTimes(this.startTime, D_.millisToHrTime(t));
    }
    isRecording() {
      return this._ended === !1;
    }
    recordException(e, t) {
      let r = {};
      if (typeof e === "string") r[n8.ATTR_EXCEPTION_MESSAGE] = e;
      else if (e) {
        if (e.code) r[n8.ATTR_EXCEPTION_TYPE] = e.code.toString();
        else if (e.name) r[n8.ATTR_EXCEPTION_TYPE] = e.name;
        if (e.message) r[n8.ATTR_EXCEPTION_MESSAGE] = e.message;
        if (e.stack) r[n8.ATTR_EXCEPTION_STACKTRACE] = e.stack;
      }
      if (r[n8.ATTR_EXCEPTION_TYPE] || r[n8.ATTR_EXCEPTION_MESSAGE])
        this.addEvent(A4n.ExceptionEventName, r, t);
      else I_.diag.warn(`Failed to record an exception ${e}`);
    }
    get duration() {
      return this._duration;
    }
    get ended() {
      return this._ended;
    }
    get droppedAttributesCount() {
      return this._droppedAttributesCount;
    }
    get droppedEventsCount() {
      return this._droppedEventsCount;
    }
    get droppedLinksCount() {
      return this._droppedLinksCount;
    }
    _isSpanEnded() {
      if (this._ended) {
        let e = Error(
          `Operation attempted on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`,
        );
        I_.diag.warn(
          `Cannot execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`,
          e,
        );
      }
      return this._ended;
    }
    _truncateToLimitUtil(e, t) {
      if (e.length <= t) return e;
      return e.substring(0, t);
    }
    _truncateToSize(e) {
      let t = this._attributeValueLengthLimit;
      if (t <= 0) return (I_.diag.warn(`Attribute value limit must be positive, got ${t}`), e);
      if (typeof e === "string") return this._truncateToLimitUtil(e, t);
      if (Array.isArray(e))
        return e.map((r) => (typeof r === "string" ? this._truncateToLimitUtil(r, t) : r));
      return e;
    }
  }
  l4n.SpanImpl = u4n;
});