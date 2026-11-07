
var fOn = Ie(function (uOn) {
  Object.defineProperty(uOn, "__esModule", { value: !0 });
  uOn.AsyncHooksContextManager = void 0;
  var aOn = kf(),
    HOn = cr("async_hooks"),
    cOn = YHr();
  class AOn extends cOn.AbstractAsyncHooksContextManager {
    _asyncHook;
    _contexts = new Map();
    _stack = [];
    constructor() {
      super();
      this._asyncHook = HOn.createHook({
        init: this._init.bind(this),
        before: this._before.bind(this),
        after: this._after.bind(this),
        destroy: this._destroy.bind(this),
        promiseResolve: this._destroy.bind(this),
      });
    }
    active() {
      return this._stack[this._stack.length - 1] ?? aOn.ROOT_CONTEXT;
    }
    with(e, t, r, ...s) {
      this._enterContext(e);
      try {
        return t.call(r, ...s);
      } finally {
        this._exitContext();
      }
    }
    enable() {
      return (this._asyncHook.enable(), this);
    }
    disable() {
      return (this._asyncHook.disable(), this._contexts.clear(), (this._stack = []), this);
    }
    _init(e, t) {
      if (t === "TIMERWRAP") return;
      let r = this._stack[this._stack.length - 1];
      if (r !== void 0) this._contexts.set(e, r);
    }
    _destroy(e) {
      this._contexts.delete(e);
    }
    _before(e) {
      let t = this._contexts.get(e);
      if (t !== void 0) this._enterContext(t);
    }
    _after() {
      this._exitContext();
    }
    _enterContext(e) {
      this._stack.push(e);
    }
    _exitContext() {
      this._stack.pop();
    }
  }
  uOn.AsyncHooksContextManager = AOn;
});