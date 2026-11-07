
var Vzs = (e, t) => {
    let r = e.provider ?? ("provider" in t ? t.provider : void 0);
    if (!r) throw Error(`Route.model(${e.id}) requires a provider`);
    if (!qzs(e.endpoint))
      throw Error(`Route.model(${e.id}) requires an endpoint baseURL \u2014 configure it on the route first`);
    return wde.make({ ...t, provider: r, route: e });
  },
  QIn = (e, t) => {
    let r = Gzs(e?.headers, t.headers);
    return {
      ...e,
      ...t,
      headers: r,
      limits: t.limits === void 0 ? e?.limits : hY.make(t.limits),
      generation: Pnr(YIn(e?.generation), YIn(t.generation)),
      providerOptions: bnr(e?.providerOptions, t.providerOptions),
      http: jnr(e?.http, Xzs(t.http), r === void 0 ? void 0 : new dw({ headers: r })),
    };
  },
  qzs = (e) => (typeof e.baseURL === "string" ? e.baseURL : void 0),
  Gzs = (...e) => {
    let t = e.flatMap((r) => (r === void 0 ? [] : Object.entries(r).filter((s) => s[1] !== void 0)));
    if (t.length === 0) return;
    return Object.fromEntries(t);
  },
  YIn = (e) => (e === void 0 ? void 0 : mw.make(e)),
  Xzs = (e) => {
    if (e === void 0) return e;
    return dw.make(e);
  },
  NMe,
  Jzs = (e) => {
    let t = e.model.route.defaults,
      r = e.model.defaults,
      s = Pnr(t.generation, r?.generation, e.generation);
    return mV.update(e, {
      generation: s ?? new mw({}),
      providerOptions: bnr(t.providerOptions, r?.providerOptions, e.providerOptions),
      http: jnr(t.http, r?.http, e.http),
    });
  },
  Kzs = (e, t, r) => {
    let s = r.reasons.find(Pin)?.error;
    if (s instanceof MD) return s;
    return NG(e, t, BC(r));
  },
  eDn,
  tDn,
  Qzs = (e) => (t) =>
    hh(
      ft(function* () {
        let r = yield* eDn(t);
        return r.route.streamPrepared(r.prepared, r.request, e);
      }),
    ),
  Yzs = (e) =>
    Ge("LLM.generate")(function* (t) {
      let r = yield* e(t).pipe($cn(jse.empty, jse.reduce)),
        s = jse.complete(r);
      if (s) return s;
      return yield* NG(
        `${t.model.provider}/${t.model.route.id}`,
        "Provider stream ended without a terminal finish event",
      );
    }),
  Zzs = (e) => tDn(e),
  rQs,
  RG,
  JU;