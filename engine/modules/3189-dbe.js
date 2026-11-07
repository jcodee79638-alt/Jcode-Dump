
var dbe = Ie(function (gvc, Fyi) {
  Fyi.exports = ihe;
  ihe.CAPTURING_PHASE = 1;
  ihe.AT_TARGET = 2;
  ihe.BUBBLING_PHASE = 3;
  function ihe(e, t) {
    if (
      ((this.type = ""),
      (this.target = null),
      (this.currentTarget = null),
      (this.eventPhase = ihe.AT_TARGET),
      (this.bubbles = !1),
      (this.cancelable = !1),
      (this.isTrusted = !1),
      (this.defaultPrevented = !1),
      (this.timeStamp = Date.now()),
      (this._propagationStopped = !1),
      (this._immediatePropagationStopped = !1),
      (this._initialized = !0),
      (this._dispatching = !1),
      e)
    )
      this.type = e;
    if (t) for (var r in t) this[r] = t[r];
  }
  ihe.prototype = Object.create(Object.prototype, {
    constructor: { value: ihe },
    stopPropagation: {
      value: function () {
        this._propagationStopped = !0;
      },
    },
    stopImmediatePropagation: {
      value: function () {
        ((this._propagationStopped = !0), (this._immediatePropagationStopped = !0));
      },
    },
    preventDefault: {
      value: function () {
        if (this.cancelable) this.defaultPrevented = !0;
      },
    },
    initEvent: {
      value: function (t, r, s) {
        if (((this._initialized = !0), this._dispatching)) return;
        ((this._propagationStopped = !1),
          (this._immediatePropagationStopped = !1),
          (this.defaultPrevented = !1),
          (this.isTrusted = !1),
          (this.target = null),
          (this.type = t),
          (this.bubbles = r),
          (this.cancelable = s));
      },
    },
  });
});