
var sCt = Ie(function (AGi) {
  Object.defineProperty(AGi, "__esModule", { value: !0 });
  AGi.CancellationTokenSource = AGi.CancellationToken = void 0;
  var vqa = Fce(),
    HGi = UCe(),
    FCe = NCe(),
    iCt;
  (function (e) {
    ((e.None = Object.freeze({ isCancellationRequested: !1, onCancellationRequested: FCe.Event.None })),
      (e.Cancelled = Object.freeze({
        isCancellationRequested: !0,
        onCancellationRequested: FCe.Event.None,
      })));
    function t(r) {
      let s = r;
      return (
        s &&
        (s === e.None ||
          s === e.Cancelled ||
          (HGi.boolean(s.isCancellationRequested) && !!s.onCancellationRequested))
      );
    }
    e.is = t;
  })(iCt || (AGi.CancellationToken = iCt = {}));
  var bqa = Object.freeze(function (e, t) {
    let r = (0, vqa.default)().timer.setTimeout(e.bind(t), 0);
    return {
      dispose() {
        r.dispose();
      },
    };
  });
  class sjr {
    constructor() {
      this._isCancelled = !1;
    }
    cancel() {
      if (!this._isCancelled) {
        if (((this._isCancelled = !0), this._emitter)) (this._emitter.fire(void 0), this.dispose());
      }
    }
    get isCancellationRequested() {
      return this._isCancelled;
    }
    get onCancellationRequested() {
      if (this._isCancelled) return bqa;
      if (!this._emitter) this._emitter = new FCe.Emitter();
      return this._emitter.event;
    }
    dispose() {
      if (this._emitter) (this._emitter.dispose(), (this._emitter = void 0));
    }
  }
  class cGi {
    get token() {
      if (!this._token) this._token = new sjr();
      return this._token;
    }
    cancel() {
      if (!this._token) this._token = iCt.Cancelled;
      else this._token.cancel();
    }
    dispose() {
      if (!this._token) this._token = iCt.None;
      else if (this._token instanceof sjr) this._token.dispose();
    }
  }
  AGi.CancellationTokenSource = cGi;
});