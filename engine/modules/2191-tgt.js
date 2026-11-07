
var tgt = Ie(function (l6n) {
  Object.defineProperty(l6n, "__esModule", { value: !0 });
  l6n.NonRecordingSpan = void 0;
  var A6n = egt();
  class u6n {
    constructor(e = A6n.INVALID_SPAN_CONTEXT) {
      this._spanContext = e;
    }
    spanContext() {
      return this._spanContext;
    }
    setAttribute(e, t) {
      return this;
    }
    setAttributes(e) {
      return this;
    }
    addEvent(e, t) {
      return this;
    }
    addLink(e) {
      return this;
    }
    addLinks(e) {
      return this;
    }
    setStatus(e) {
      return this;
    }
    updateName(e) {
      return this;
    }
    end(e) {}
    isRecording() {
      return !1;
    }
    recordException(e, t) {}
  }
  l6n.NonRecordingSpan = u6n;
});