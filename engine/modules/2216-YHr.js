
var YHr = Ie(function (sOn) {
  Object.defineProperty(sOn, "__esModule", { value: !0 });
  sOn.AbstractAsyncHooksContextManager = void 0;
  var nOn = cr("events"),
    $Lo = ["addListener", "on", "once", "prependListener", "prependOnceListener"];
  class iOn {
    bind(e, t) {
      if (t instanceof nOn.EventEmitter) return this._bindEventEmitter(e, t);
      if (typeof t === "function") return this._bindFunction(e, t);
      return t;
    }
    _bindFunction(e, t) {
      let r = this,
        s = function (...a) {
          return r.with(e, () => t.apply(this, a));
        };
      return (
        Object.defineProperty(s, "length", {
          enumerable: !1,
          configurable: !0,
          writable: !1,
          value: t.length,
        }),
        s
      );
    }
    _bindEventEmitter(e, t) {
      if (this._getPatchMap(t) !== void 0) return t;
      if (
        (this._createPatchMap(t),
        $Lo.forEach((s) => {
          if (t[s] === void 0) return;
          t[s] = this._patchAddListener(t, t[s], e);
        }),
        typeof t.removeListener === "function")
      )
        t.removeListener = this._patchRemoveListener(t, t.removeListener);
      if (typeof t.off === "function") t.off = this._patchRemoveListener(t, t.off);
      if (typeof t.removeAllListeners === "function")
        t.removeAllListeners = this._patchRemoveAllListeners(t, t.removeAllListeners);
      return t;
    }
    _patchRemoveListener(e, t) {
      let r = this;
      return function (s, a) {
        let H = r._getPatchMap(e)?.[s];
        if (H === void 0) return t.call(this, s, a);
        let u = H.get(a);
        return t.call(this, s, u || a);
      };
    }
    _patchRemoveAllListeners(e, t) {
      let r = this;
      return function (s) {
        let a = r._getPatchMap(e);
        if (a !== void 0) {
          if (arguments.length === 0) r._createPatchMap(e);
          else if (a[s] !== void 0) delete a[s];
        }
        return t.apply(this, arguments);
      };
    }
    _patchAddListener(e, t, r) {
      let s = this;
      return function (a, H) {
        if (s._wrapped) return t.call(this, a, H);
        let u = s._getPatchMap(e);
        if (u === void 0) u = s._createPatchMap(e);
        let f = u[a];
        if (f === void 0) ((f = new WeakMap()), (u[a] = f));
        let d = s.bind(r, H);
        (f.set(H, d), (s._wrapped = !0));
        try {
          return t.call(this, a, d);
        } finally {
          s._wrapped = !1;
        }
      };
    }
    _createPatchMap(e) {
      let t = Object.create(null);
      return ((e[this._kOtListeners] = t), t);
    }
    _getPatchMap(e) {
      return e[this._kOtListeners];
    }
    _kOtListeners = Symbol("OtListeners");
    _wrapped = !1;
  }
  sOn.AbstractAsyncHooksContextManager = iOn;
});