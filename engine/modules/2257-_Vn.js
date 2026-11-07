
var _Vn = Ie(function (dVn) {
  Object.defineProperty(dVn, "__esModule", { value: !0 });
  dVn.BindOnceFuture = void 0;
  var fVn = lVn();
  class pVn {
    _isCalled = !1;
    _deferred = new fVn.Deferred();
    _callback;
    _that;
    constructor(e, t) {
      ((this._callback = e), (this._that = t));
    }
    get isCalled() {
      return this._isCalled;
    }
    get promise() {
      return this._deferred.promise;
    }
    call(...e) {
      if (!this._isCalled) {
        this._isCalled = !0;
        try {
          Promise.resolve(this._callback.call(this._that, ...e)).then(
            (t) => this._deferred.resolve(t),
            (t) => this._deferred.reject(t),
          );
        } catch (t) {
          this._deferred.reject(t);
        }
      }
      return this._deferred.promise;
    }
  }
  dVn.BindOnceFuture = pVn;
});