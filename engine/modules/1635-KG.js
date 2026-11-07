
var KG = ne(async () => {
  OH();
  Gt();
  fdt();
  zM();
  yy();
  rV();
  await Jn([KG(), fL(), oxe(), yV()]);
  ((jYs = Jo(["provider.use"])), (PYs = Idn));
  MV = class MV extends _i()("@opencode/v2/Catalog") {};
  ((A1n = Es(
    MV,
    ft(function* () {
      let e = yield* lL,
        t = yield* sxe,
        r = yield* QS,
        s = (d, _) => {
          if (d.disabled) return !1;
          if (typeof d.request.body.apiKey === "string") return !0;
          if (_?.connections.length) return !0;
          return d.integrationID === void 0 && !_;
        },
        a = (d, _) => {
          let L =
              d.api.type === "native" && !d.api.url && Object.keys(d.api.settings).length === 0
                ? { ..._.api, id: d.api.id }
                : d.api.type === "aisdk" && _.api.type === "aisdk" && !d.api.url
                  ? { ...d.api, url: _.api.url, settings: { ..._.api.settings, ...d.api.settings } }
                  : d.api.type === "aisdk" && _.api.type === "aisdk"
                    ? { ...d.api, settings: { ..._.api.settings, ...d.api.settings } }
                    : d.api,
            I = {
              headers: { ..._.request.headers, ...d.request.headers },
              body: { ..._.request.body, ...d.request.body },
              variant: d.request.variant,
            };
          return Ddn.make({ ...d, api: L, request: I });
        },
        H = (d) => {
          if (typeof d.request.body.baseURL !== "string") return;
          ((d.api.url = d.request.body.baseURL), delete d.request.body.baseURL);
        },
        u = lde({
          initial: () => ({ providers: new Map() }),
          draft: (d) => ({
            provider: {
              list: () => Xg(d.providers.values()),
              get: (L) => d.providers.get(L),
              update: (L, I) => {
                let D = d.providers.get(L);
                if (!D) ((D = { provider: Ldn.empty(L), models: new Map() }), d.providers.set(L, D));
                (I(D.provider), H(D.provider));
              },
              remove: (L) => {
                d.providers.delete(L);
              },
            },
            model: {
              get: (L, I) => d.providers.get(L)?.models.get(I),
              update: (L, I, D) => {
                let S = d.providers.get(L);
                if (!S) ((S = { provider: Ldn.empty(L), models: new Map() }), d.providers.set(L, S));
                let T = S.models.get(I) ?? Ddn.empty(L, I);
                if (!S.models.has(I)) S.models.set(I, T);
                (D(T), (T.id = I), (T.providerID = L), H(T));
              },
              remove: (L, I) => {
                d.providers.get(L)?.models.delete(I);
              },
              default: {
                get: () => d.defaultModel,
                set: (L, I) => {
                  d.defaultModel = { providerID: L, modelID: I };
                },
              },
            },
          }),
          finalize: Ge("CatalogV2.finalize")(function* (d) {
            if (t.hasStatements()) {
              for (let _ of [...d.provider.list()])
                if ((yield* t.evaluate("provider.use", _.provider.id, "allow")) === "deny")
                  d.provider.remove(_.provider.id);
            }
            yield* e.publish(PYs.Updated, {});
          }),
        }),
        f = {
          transform: u.transform,
          reload: u.reload,
          provider: {
            get: Ge("CatalogV2.provider.get")(function* (d) {
              return u.get().providers.get(d)?.provider;
            }),
            all: Ge("CatalogV2.provider.all")(function* () {
              return Xg(u.get().providers.values()).map((d) => d.provider);
            }),
            available: Ge("CatalogV2.provider.available")(function* () {
              let d = new Map((yield* r.list()).map((_) => [_.id, _]));
              return (yield* f.provider.all()).filter((_) => s(_, d.get(_.integrationID ?? DV.make(_.id))));
            }),
          },
          model: {
            get: Ge("CatalogV2.model.get")(function* (d, _) {
              let L = u.get().providers.get(d);
              if (!L) return;
              let I = L.models.get(_);
              return I && a(I, L.provider);
            }),
            all: Ge("CatalogV2.model.all")(function* () {
              return Ev(
                Xg(u.get().providers.values()),
                WOs((d) => Xg(d.models.values()).map((_) => a(_, d.provider))),
                NKt((d) => d.time.released, Qtn($W)),
              );
            }),
            available: Ge("CatalogV2.model.available")(function* () {
              let d = new Set((yield* f.provider.available()).map((_) => _.id));
              return (yield* f.model.all()).filter((_) => d.has(_.providerID) && _.enabled);
            }),
            default: Ge("CatalogV2.model.default")(function* () {
              let d = u.get().defaultModel;
              if (d) {
                let _ = yield* f.provider.get(d.providerID);
                if (_ && (yield* f.provider.available()).some((L) => L.id === _.id)) {
                  let L = yield* f.model.get(d.providerID, d.modelID);
                  if (L?.enabled) return L;
                }
              }
              return OL(
                Ev(
                  yield* f.model.available(),
                  NKt((_) => _.time.released, Qtn($W)),
                  lrn,
                ),
              );
            }),
            small: Ge("CatalogV2.model.small")(function* (d) {
              let _ = u.get().providers.get(d);
              if (!_) return;
              let L = _.provider;
              if (d === Kp.azure || d === Kp.make("azure-cognitive-services")) return;
              if (d === Kp.opencode) {
                let S = _.models.get(WL.make("gpt-5-nano"));
                if (S?.enabled && S.status === "active") return a(S, L);
              }
              let I = Ev(
                  Xg(_.models.values()),
                  g2e(
                    (S) =>
                      S.providerID === d &&
                      S.enabled &&
                      S.status === "active" &&
                      S.capabilities.input.some((T) => T.startsWith("text")) &&
                      S.capabilities.output.some((T) => T.startsWith("text")),
                  ),
                  jv((S) => ({
                    model: S,
                    cost: S.cost[0] ? S.cost[0].input + S.cost[0].output : 999,
                    age: (Date.now() - S.time.released) / 2592000000,
                    small: CYs.test(`${S.id} ${S.family ?? ""} ${S.name}`.toLowerCase()),
                  })),
                  g2e((S) => S.cost > 0 && S.age <= 18),
                ),
                D = (S) => {
                  let T = Math.max(...S.map((O) => O.cost), 0.01),
                    C = Math.max(...S.map((O) => O.age), 0.01);
                  return Ev(
                    S,
                    NKt((O) => (O.cost / T) * 0.8 + (O.age / C) * 0.2, $W),
                    jv((O) => a(O.model, L)),
                    lrn,
                  );
                };
              return OL(
                Ev(
                  I,
                  g2e((S) => S.small),
                  (S) => (S.length > 0 ? D(S) : D(I)),
                ),
              );
            }),
          },
        };
      return MV.of(f);
    }),
  )),
    (CYs = /\b(nano|flash|lite|mini|haiku|small|fast)\b/),
    (wYs = A1n.pipe(Jm(qir), Jm(n1n))),
    (Lht = Ua({ service: MV, layer: A1n, deps: [zS, Nir, bWe] })));
});