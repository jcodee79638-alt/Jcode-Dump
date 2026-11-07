
var wHr = Ie(function (j6n) {
  Object.defineProperty(j6n, "__esModule", { value: !0 });
  j6n.ProxyTracer = void 0;
  var v6n = CHr(),
    Oho = new v6n.NoopTracer();
  class b6n {
    constructor(e, t, r, s) {
      ((this._provider = e), (this.name = t), (this.version = r), (this.options = s));
    }
    startSpan(e, t, r) {
      return this._getTracer().startSpan(e, t, r);
    }
    startActiveSpan(e, t, r, s) {
      let a = this._getTracer();
      return Reflect.apply(a.startActiveSpan, a, arguments);
    }
    _getTracer() {
      if (this._delegate) return this._delegate;
      let e = this._provider.getDelegateTracer(this.name, this.version, this.options);
      if (!e) return Oho;
      return ((this._delegate = e), this._delegate);
    }
  }
  j6n.ProxyTracer = b6n;
});