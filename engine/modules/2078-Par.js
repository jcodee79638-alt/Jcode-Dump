
var Par = ne(async () => {
  Gt();
  h2();
  a3e();
  zde();
  zM();
  yy();
  await Jn([Par(), KG(), vWe(), yV(), Fxe(), PV(), R2()]);
  $fo = Ge("PluginHost.make")(function* (e) {
    let t = yield* MG,
      r = yield* o3e,
      s = yield* MV,
      a = yield* Vse,
      H = yield* QS,
      u = yield* jV,
      f = yield* o5;
    return {
      options: {},
      agent: {
        reload: t.reload,
        transform: (d) =>
          t.transform((_) =>
            d({
              list: () => a5(_.list()),
              get: (L) => a5(_.get(US.make(L))),
              default: (L) => _.default(L === void 0 ? void 0 : US.make(L)),
              update: (L, I) => _.update(US.make(L), I),
              remove: (L) => _.remove(US.make(L)),
            }),
          ),
      },
      aisdk: {
        sdk: (d) =>
          r.hook.sdk((_) => {
            let L = { model: a5(_.model), package: _.package, options: _.options, sdk: _.sdk },
              I = d(L);
            return yH(() => (ug(I) ? I : ti)).pipe(DE(() => jn(() => (_.sdk = L.sdk))));
          }),
        language: (d) =>
          r.hook.language((_) => {
            let L = { model: a5(_.model), sdk: _.sdk, options: _.options, language: _.language },
              I = d(L);
            return yH(() => (ug(I) ? I : ti)).pipe(DE(() => jn(() => (_.language = L.language))));
          }),
      },
      catalog: {
        reload: s.reload,
        transform: (d) =>
          s.transform((_) =>
            d({
              provider: {
                list: () => a5(_.provider.list()),
                get: (L) => a5(_.provider.get(Kp.make(L))),
                update: (L, I) => _.provider.update(Kp.make(L), I),
                remove: (L) => _.provider.remove(Kp.make(L)),
              },
              model: {
                get: (L, I) => a5(_.model.get(Kp.make(L), WL.make(I))),
                update: (L, I, D) => _.model.update(Kp.make(L), WL.make(I), D),
                remove: (L, I) => _.model.remove(Kp.make(L), WL.make(I)),
                default: {
                  get: _.model.default.get,
                  set: (L, I) => _.model.default.set(Kp.make(L), WL.make(I)),
                },
              },
            }),
          ),
      },
      command: { reload: a.reload, transform: a.transform },
      integration: {
        reload: H.reload,
        connection: {
          active: (d) => H.connection.active(DV.make(d)),
          resolve: (d) => H.connection.resolve(d.type === "credential" ? { ...d, id: Bir.make(d.id) } : d),
        },
        transform: (d) =>
          H.transform((_) =>
            d({
              list: () => a5(_.list()),
              get: (L) => a5(_.get(DV.make(L))),
              update: (L, I) => _.update(DV.make(L), I),
              remove: (L) => _.remove(DV.make(L)),
              method: {
                list: (L) => a5(_.method.list(DV.make(L))),
                update: (L) => {
                  if ("authorize" in L) {
                    let I = hht.make(L.method.id),
                      D = L.refresh;
                    _.method.update({
                      integrationID: DV.make(L.integrationID),
                      method: { ...L.method, id: I },
                      authorize: (S) =>
                        L.authorize(S).pipe(
                          Vn((T) => {
                            if (T.mode === "auto")
                              return {
                                ...T,
                                callback: T.callback.pipe(
                                  Vn((C) => Rir.make({ ...C, methodID: hht.make(C.methodID) })),
                                ),
                              };
                            return {
                              ...T,
                              callback: (C) =>
                                T.callback(C).pipe(
                                  Vn((O) => Rir.make({ ...O, methodID: hht.make(O.methodID) })),
                                ),
                            };
                          }),
                        ),
                      ...(D
                        ? {
                            refresh: (S) =>
                              D(S).pipe(Vn((T) => Rir.make({ ...T, methodID: hht.make(T.methodID) }))),
                          }
                        : {}),
                      ...(L.label ? { label: L.label } : {}),
                    });
                    return;
                  }
                  if (L.method.type === "env") {
                    _.method.update({
                      integrationID: DV.make(L.integrationID),
                      method: { type: "env", names: L.method.names },
                    });
                    return;
                  }
                  _.method.update({
                    integrationID: DV.make(L.integrationID),
                    method: { type: "key", label: L.method.label },
                  });
                },
                remove: (L, I) => _.method.remove(DV.make(L), E1(a1n)(I)),
              },
            }),
          ),
      },
      plugin: { add: (d) => e.add(M$t.make(d.id), d.effect), remove: (d) => e.remove(M$t.make(d)) },
      reference: {
        reload: u.reload,
        transform: (d) =>
          u.transform((_) => d({ add: (L, I) => _.add(L, E1(oco)(I)), remove: _.remove, list: _.list })),
      },
      skill: {
        reload: f.reload,
        transform: (d) => f.transform((_) => d({ source: (L) => _.source(E1(y$t)(L)), list: _.list })),
      },
    };
  });
});