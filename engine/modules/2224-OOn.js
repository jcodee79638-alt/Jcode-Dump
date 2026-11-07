
var OOn = Ie(function (wOn) {
  Object.defineProperty(wOn, "__esModule", { value: !0 });
  wOn.AnchoredClock = void 0;
  class COn {
    _monotonicClock;
    _epochMillis;
    _performanceMillis;
    constructor(e, t) {
      ((this._monotonicClock = t), (this._epochMillis = e.now()), (this._performanceMillis = t.now()));
    }
    now() {
      let e = this._monotonicClock.now() - this._performanceMillis;
      return this._epochMillis + e;
    }
  }
  wOn.AnchoredClock = COn;
});