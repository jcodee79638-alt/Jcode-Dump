
var kse = ne(() => {
  Gt();
  Hf();
  UG();
  gY();
  P_t();
  Bde();
  Bde();
  zIn();
  FG();
  GS();
  NMe = class NMe extends _i()("@opencode/LLMClient") {};
  ((eDn = Ge("LLM.compile")(function* (e) {
    let t = KIn(Jzs(e)),
      r = t.model.route,
      s = yield* r.body.from(t).pipe(Hi(Xnr(G_(r.body.schema)))),
      a = yield* r.prepareTransport(s, t);
    return { request: t, route: r, body: s, prepared: a };
  })),
    (tDn = Ge("LLMClient.prepare")(function* (e) {
      let t = yield* eDn(e);
      return new knr({
        id: t.request.id ?? "request",
        route: t.route.id,
        protocol: t.route.protocol,
        model: t.request.model,
        body: t.body,
        metadata: { transport: t.route.transport.id },
      });
    })));
  ((rQs = Es(
    NMe,
    ft(function* () {
      let e = Qzs({ http: yield* AWe, webSocket: OL(yield* x6(w_t.Service)) });
      return NMe.of({ prepare: tDn, stream: e, generate: Yzs(e) });
    }),
  )),
    (RG = { make: zzs }),
    (JU = { Service: NMe, layer: rQs, prepare: Zzs, stream: eQs, generate: tQs }));
});