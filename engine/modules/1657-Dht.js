
var Dht = ne(() => {
  Dht();
  Gt();
  yy();
  zM();
  PWe = class PWe extends (
    Pa("ConfigV2.Provider.Request")({ headers: ks(re, re).pipe(be), body: ks(re, PH).pipe(be) })
  ) {};
  I1n = class I1n extends Pa("ConfigV2.Model.Cost.Cache")({ read: mo.pipe(be), write: mo.pipe(be) }) {};
  Qir = class Qir extends (
    Pa("ConfigV2.Model.Cost")({
      tier: nt({ type: ri("context"), size: DI }).pipe(be),
      input: mo,
      output: mo,
      cache: I1n.pipe(be),
    })
  ) {};
  D1n = class D1n extends (
    Pa("ConfigV2.Model.Limit")({ context: DI.pipe(be), input: DI.pipe(be), output: DI.pipe(be) })
  ) {};
  GYs = Io([nt({ id: WL.pipe(be), ...$Vs.fields }), nt({ id: WL.pipe(be), ...gVs.fields }), nt({ id: WL })]);
  y1n = class y1n extends (
    Pa("ConfigV2.Model")({
      family: yVs.pipe(be),
      name: re.pipe(be),
      api: GYs.pipe(be),
      capabilities: MVs.pipe(be),
      request: nt({ ...PWe.fields, variant: re.pipe(be) }).pipe(be),
      variants: nt({ id: H3e, ...PWe.fields }).pipe(On, be),
      cost: Io([Qir, Qir.pipe(On)]).pipe(be),
      disabled: Vi.pipe(be),
      limit: D1n.pipe(be),
    })
  ) {};
  M1n = class M1n extends (
    Pa("ConfigV2.Provider")({
      name: re.pipe(be),
      env: re.pipe(On, be),
      api: EVs.pipe(be),
      request: PWe.pipe(be),
      models: ks(re, y1n).pipe(be),
    })
  ) {};
});