
var jX = ne(() => {
  au();
  tvt();
  Ql();
  Gt();
  tvt();
  jX();
  ((Gva = Es(
    VN,
    ft(function* () {
      let e = yield* cx(() => K8i);
      return VN.of({
        list: () => V1(e, (t) => t.list()),
        get: (t) => V1(e, (r) => r.get(t)),
        start: (t) => V1(e, (r) => r.start(t)),
        extend: (t) => V1(e, (r) => r.extend(t)),
        wait: (t) => V1(e, (r) => r.wait(t)),
        waitForPromotion: (t) => V1(e, (r) => r.waitForPromotion(t)),
        promote: (t) => V1(e, (r) => r.promote(t)),
        cancel: (t) => V1(e, (r) => r.cancel(t)),
      });
    }),
  )),
    (sXe = Ll({ service: VN, layer: Gva, deps: [] })));
});