
var Vgt = Ie(function (E4n) {
  Object.defineProperty(E4n, "__esModule", { value: !0 });
  E4n.AlwaysOnSampler = void 0;
  var $4n = oSe();
  class g4n {
    shouldSample() {
      return { decision: $4n.SamplingDecision.RECORD_AND_SAMPLED };
    }
    toString() {
      return "AlwaysOnSampler";
    }
  }
  E4n.AlwaysOnSampler = g4n;
});