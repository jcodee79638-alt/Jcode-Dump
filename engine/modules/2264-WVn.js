
var WVn = Ie(function (BVn) {
  Object.defineProperty(BVn, "__esModule", { value: !0 });
  BVn.detectResources = void 0;
  var jgt = kf(),
    rSe = mcr(),
    Yvo = (e = {}) =>
      (e.detectors || [])
        .map((r) => {
          try {
            let s = rSe.resourceFromDetectedResource(r.detect(e));
            return (jgt.diag.debug(`${r.constructor.name} found resource.`, s), s);
          } catch (s) {
            return (jgt.diag.debug(`${r.constructor.name} failed: ${s.message}`), rSe.emptyResource());
          }
        })
        .reduce((r, s) => r.merge(s), rSe.emptyResource());
  BVn.detectResources = Yvo;
});