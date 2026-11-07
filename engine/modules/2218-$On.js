
var $On = Ie(function (hOn) {
  Object.defineProperty(hOn, "__esModule", { value: !0 });
  hOn.AsyncLocalStorageContextManager = void 0;
  var pOn = kf(),
    dOn = cr("async_hooks"),
    mOn = YHr();
  class _On extends mOn.AbstractAsyncHooksContextManager {
    _asyncLocalStorage;
    constructor() {
      super();
      this._asyncLocalStorage = new dOn.AsyncLocalStorage();
    }
    active() {
      return this._asyncLocalStorage.getStore() ?? pOn.ROOT_CONTEXT;
    }
    with(e, t, r, ...s) {
      let a = r == null ? t : t.bind(r);
      return this._asyncLocalStorage.run(e, a, ...s);
    }
    enable() {
      return this;
    }
    disable() {
      return (this._asyncLocalStorage.disable(), this);
    }
  }
  hOn.AsyncLocalStorageContextManager = _On;
});