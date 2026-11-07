
var lVn = Ie(function (AVn) {
  Object.defineProperty(AVn, "__esModule", { value: !0 });
  AVn.Deferred = void 0;
  class cVn {
    _promise;
    _resolve;
    _reject;
    constructor() {
      this._promise = new Promise((e, t) => {
        ((this._resolve = e), (this._reject = t));
      });
    }
    get promise() {
      return this._promise;
    }
    resolve(e) {
      this._resolve(e);
    }
    reject(e) {
      this._reject(e);
    }
  }
  AVn.Deferred = cVn;
});