
class bcr {
  hrTime;
  hrTimeObserved;
  spanContext;
  resource;
  instrumentationScope;
  attributes = {};
  _severityText;
  _severityNumber;
  _body;
  _eventName;
  _attributesCount = 0;
  _droppedAttributesCount = 0;
  _isReadonly = !1;
  _logRecordLimits;
  set severityText(e) {
    if (this._isLogRecordReadonly()) return;
    this._severityText = e;
  }
  get severityText() {
    return this._severityText;
  }
  set severityNumber(e) {
    if (this._isLogRecordReadonly()) return;
    this._severityNumber = e;
  }
  get severityNumber() {
    return this._severityNumber;
  }
  set body(e) {
    if (this._isLogRecordReadonly()) return;
    this._body = e;
  }
  get body() {
    return this._body;
  }
  get eventName() {
    return this._eventName;
  }
  set eventName(e) {
    if (this._isLogRecordReadonly()) return;
    this._eventName = e;
  }
  get droppedAttributesCount() {
    return this._droppedAttributesCount;
  }
  constructor(e, t, r) {
    let {
        timestamp: s,
        observedTimestamp: a,
        eventName: H,
        severityNumber: u,
        severityText: f,
        body: d,
        attributes: _ = {},
        exception: L,
        context: I,
      } = r,
      D = Date.now();
    if (
      ((this.hrTime = vcr.timeInputToHrTime(s ?? D)),
      (this.hrTimeObserved = vcr.timeInputToHrTime(a ?? D)),
      I)
    ) {
      let S = OV.trace.getSpanContext(I);
      if (S && OV.isSpanContextValid(S)) this.spanContext = S;
    }
    if (
      ((this.severityNumber = u),
      (this.severityText = f),
      (this.body = d),
      (this.resource = e.resource),
      (this.instrumentationScope = t),
      (this._logRecordLimits = e.logRecordLimits),
      (this._eventName = H),
      this.setAttributes(_),
      L != null)
    )
      this._setException(L);
  }
  setAttribute(e, t) {
    if (this._isLogRecordReadonly()) return this;
    if (e.length === 0) return (OV.diag.warn(`Invalid attribute key: ${e}`), this);
    if (!mGn(t)) return (OV.diag.warn(`Invalid attribute value set for key: ${e}`), this);
    let r = !Object.prototype.hasOwnProperty.call(this.attributes, e);
    if (r && this._attributesCount >= this._logRecordLimits.attributeCountLimit) {
      if ((this._droppedAttributesCount++, this._droppedAttributesCount === 1))
        OV.diag.warn("Dropping extra attributes.");
      return this;
    }
    if (((this.attributes[e] = this._truncateToSize(t)), r)) this._attributesCount++;
    return this;
  }
  setAttributes(e) {
    for (let [t, r] of Object.entries(e)) this.setAttribute(t, r);
    return this;
  }
  setBody(e) {
    return ((this.body = e), this);
  }
  setEventName(e) {
    return ((this.eventName = e), this);
  }
  setSeverityNumber(e) {
    return ((this.severityNumber = e), this);
  }
  setSeverityText(e) {
    return ((this.severityText = e), this);
  }
  _makeReadonly() {
    this._isReadonly = !0;
  }
  _truncateToSize(e) {
    let t = this._logRecordLimits.attributeValueLengthLimit;
    if (t <= 0) return (OV.diag.warn(`Attribute value limit must be positive, got ${t}`), e);
    if (e == null) return e;
    if (typeof e === "string") return this._truncateToLimitUtil(e, t);
    if (e instanceof Uint8Array) return e;
    if (Array.isArray(e)) return e.map((r) => this._truncateToSize(r));
    if (typeof e === "object") {
      let r = {};
      for (let [s, a] of Object.entries(e)) r[s] = this._truncateToSize(a);
      return r;
    }
    return e;
  }
  _setException(e) {
    let t = !1;
    if (typeof e === "string" || typeof e === "number") {
      if (!Object.hasOwn(this.attributes, AN.ATTR_EXCEPTION_MESSAGE))
        this.setAttribute(AN.ATTR_EXCEPTION_MESSAGE, String(e));
      t = !0;
    } else if (e && typeof e === "object") {
      let r = e;
      if (r.code) {
        if (!Object.hasOwn(this.attributes, AN.ATTR_EXCEPTION_TYPE))
          this.setAttribute(AN.ATTR_EXCEPTION_TYPE, r.code.toString());
        t = !0;
      } else if (r.name) {
        if (!Object.hasOwn(this.attributes, AN.ATTR_EXCEPTION_TYPE))
          this.setAttribute(AN.ATTR_EXCEPTION_TYPE, r.name);
        t = !0;
      }
      if (r.message) {
        if (!Object.hasOwn(this.attributes, AN.ATTR_EXCEPTION_MESSAGE))
          this.setAttribute(AN.ATTR_EXCEPTION_MESSAGE, r.message);
        t = !0;
      }
      if (r.stack) {
        if (!Object.hasOwn(this.attributes, AN.ATTR_EXCEPTION_STACKTRACE))
          this.setAttribute(AN.ATTR_EXCEPTION_STACKTRACE, r.stack);
        t = !0;
      }
    }
    if (!t) OV.diag.warn(`Failed to record an exception ${e}`);
  }
  _truncateToLimitUtil(e, t) {
    if (e.length <= t) return e;
    return e.substring(0, t);
  }
  _isLogRecordReadonly() {
    if (this._isReadonly) OV.diag.warn("Can not execute the operation on emitted log record");
    return this._isReadonly;
  }
}