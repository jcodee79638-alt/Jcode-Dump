
var Ecr = Ie(function (v4n) {
  Object.defineProperty(v4n, "__esModule", { value: !0 });
  v4n.TraceIdRatioBasedSampler = void 0;
  var S4n = kf(),
    Ggt = oSe();
  class T4n {
    _ratio;
    _upperBound;
    constructor(e = 0) {
      ((this._ratio = this._normalize(e)), (this._upperBound = Math.floor(this._ratio * 4294967295)));
    }
    shouldSample(e, t) {
      return {
        decision:
          S4n.isValidTraceId(t) && this._accumulate(t) < this._upperBound
            ? Ggt.SamplingDecision.RECORD_AND_SAMPLED
            : Ggt.SamplingDecision.NOT_RECORD,
      };
    }
    toString() {
      return `TraceIdRatioBased{${this._ratio}}`;
    }
    _normalize(e) {
      if (typeof e !== "number" || isNaN(e)) return 0;
      return e >= 1 ? 1 : e <= 0 ? 0 : e;
    }
    _accumulate(e) {
      let t = 0;
      for (let r = 0; r < e.length / 8; r++) {
        let s = r * 8,
          a = parseInt(e.slice(s, s + 8), 16);
        t = (t ^ a) >>> 0;
      }
      return t;
    }
  }
  v4n.TraceIdRatioBasedSampler = T4n;
});