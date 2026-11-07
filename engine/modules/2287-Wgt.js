
var Wgt = Ie(function (h4n) {
  Object.defineProperty(h4n, "__esModule", { value: !0 });
  h4n.AlwaysOffSampler = void 0;
  var m4n = oSe();
  class _4n {
    shouldSample() {
      return { decision: m4n.SamplingDecision.NOT_RECORD };
    }
    toString() {
      return "AlwaysOffSampler";
    }
  }
  h4n.AlwaysOffSampler = _4n;
});