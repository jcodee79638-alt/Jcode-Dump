
var oxe = ne(async () => {
  OH();
  Gt();
  ixe();
  await Jn([oxe(), qd()]);
  IYs = Jo(["allow", "deny"]).annotate({ identifier: "Policy.Effect" });
  t1n = class t1n extends Pa("Policy.Info")({ action: re, effect: IYs, resource: re }) {};
  sxe = class sxe extends _i()("@opencode/v2/Policy") {};
  ((r1n = Es(
    sxe,
    ft(function* () {
      let e = [];
      return (
        yield* bm,
        sxe.of({
          load: Ge("Policy.load")(function* (t) {
            e = t;
          }),
          hasStatements: () => e.length > 0,
          evaluate: Ge("Policy.evaluate")(function* (t, r, s) {
            return e.findLast((a) => XG(t, a.action) && XG(r, a.resource))?.effect ?? s;
          }),
        })
      );
    }),
  )),
    (n1n = r1n),
    (Nir = Ua({ service: sxe, layer: r1n, deps: [KS] })));
});