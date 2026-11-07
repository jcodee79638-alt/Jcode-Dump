
var yV = ne(async () => {
  OH();
  Gt();
  ade();
  rV();
  await Jn([yV(), vWe(), fL()]);
  ((DV = rY),
    (hht = otr),
    (o1n = r3e),
    (K7H = atr),
    (z7H = Jpn),
    (Q7H = Kpn),
    (Y7H = zpn),
    (Z7H = Qpn),
    (e4H = Ypn),
    (t4H = Zpn),
    (a1n = edn),
    (MYs = adt),
    (xYs = mVs),
    (SYs = Htr),
    (r4H = rdn));
  H1n = class H1n extends ki()("Integration.CodeRequired", { attemptID: o1n }) {};
  c1n = class c1n extends ki()("Integration.Authorization", { cause: yd() }) {};
  ((bY = tdn), (TYs = _Vs));
  QS = class QS extends _i()("@opencode/v2/Integration") {};
  ((vYs = $E(Hie(10))),
    (Vir = $E(Hie(1))),
    (bYs = Pv(30)),
    (qir = Es(
      QS,
      ft(function* () {
        let e = yield* TWe,
          t = yield* lL,
          r = yield* $f,
          s = Ker(new Map()),
          a = lde({
            initial: () => ({ integrations: new Map() }),
            draft: (D) => ({
              list: () => Array.from(D.integrations.values(), (S) => S.ref),
              get: (S) => D.integrations.get(S)?.ref,
              update: (S, T) => {
                let C = D.integrations.get(S) ?? {
                  ref: { id: S, name: S },
                  methods: [],
                  implementations: new Map(),
                };
                if (!D.integrations.has(S)) D.integrations.set(S, C);
                (T(C.ref), (C.ref.id = S));
              },
              remove: (S) => D.integrations.delete(S),
              method: {
                list: (S) => D.integrations.get(S)?.methods ?? [],
                update: (S) => {
                  let T = D.integrations.get(S.integrationID) ?? {
                    ref: { id: S.integrationID, name: S.integrationID },
                    methods: [],
                    implementations: new Map(),
                  };
                  if (!D.integrations.has(S.integrationID)) D.integrations.set(S.integrationID, T);
                  let C = T.methods.findIndex((O) => {
                    if (O.type !== S.method.type) return !1;
                    if (O.type !== "oauth" || S.method.type !== "oauth") return !0;
                    return O.id === S.method.id;
                  });
                  if (C === -1) T.methods.push(S.method);
                  else T.methods[C] = S.method;
                  if (S.method.type === "oauth") T.implementations.set(S.method.id, S);
                },
                remove: (S, T) => {
                  let C = D.integrations.get(S);
                  if (!C) return;
                  let O = C.methods.findIndex((B) => {
                    if (B.type !== T.type) return !1;
                    if (B.type !== "oauth" || T.type !== "oauth") return !0;
                    return B.id === T.id;
                  });
                  if (O !== -1) C.methods.splice(O, 1);
                  if (T.type === "oauth") C.implementations.delete(T.id);
                },
              },
            }),
            finalize: () => t.publish(bY.Updated, {}).pipe(Qf),
          }),
          H = (D, S) => {
            let T = S.map((O) => ({ type: "credential", id: O.id, label: O.label })).toReversed(),
              C = (D?.methods ?? [])
                .filter((O) => O.type === "env")
                .flatMap((O) => O.names.filter((B) => process.env[B]))
                .map((O) => ({ type: "env", name: O }));
            return [...T, ...C];
          },
          u = (D, S) => new MYs({ id: D.ref.id, name: D.ref.name, methods: D.methods, connections: S }),
          f = (D) => D.pipe(Zo((S) => new c1n({ cause: S }))),
          d = (D) => cl(D, M$).pipe(zm(r, { startImmediately: !0 }), Qf),
          _ = (D) => {
            let S = hI(D);
            return S instanceof Error ? S.message : String(S);
          },
          L = ni(function* (D, S) {
            let T = yield* qC,
              C = yield* $G(s, (O) => {
                let B = O.get(D);
                if (!B || B.status !== "pending") return [void 0, O];
                let V = mh(S)
                  ? { status: "complete", time: B.time, removeAt: T + Vir }
                  : { status: "failed", message: _(S.cause), time: B.time, removeAt: T + Vir };
                return [B, new Map(O).set(D, V)];
              });
            if (!C) return;
            if (mh(S)) {
              let O = a.get().integrations.get(C.integrationID)?.implementations.get(C.methodID);
              (yield* e.create({
                integrationID: C.integrationID,
                label: C.label ?? O?.label?.(S.value),
                value: S.value,
              }),
                yield* t.publish(bY.ConnectionUpdated, { integrationID: C.integrationID }),
                yield* t.publish(bY.Updated, {}));
            }
            yield* d(C.scope);
          });
        return (
          yield* ni(function* () {
            let D = yield* qC,
              S = yield* $G(s, (T) => {
                let C = new Map(T),
                  O = [];
                for (let [B, V] of T) {
                  if (V.status === "pending" && V.time.expires <= D) {
                    (O.push(V.scope), C.set(B, { status: "expired", time: V.time, removeAt: D + Vir }));
                    continue;
                  }
                  if (V.status !== "pending" && V.removeAt <= D) C.delete(B);
                }
                return [O, C];
              });
            yield* ja(S, d, { discard: !0 });
          })().pipe(xie(Die(bYs)), zm(r)),
          QS.of({
            transform: a.transform,
            reload: a.reload,
            get: Ge("Integration.get")(function* (D) {
              let S = a.get().integrations.get(D);
              if (!S) return;
              return u(S, H(S, yield* e.list(D)));
            }),
            list: Ge("Integration.list")(function* () {
              let D = Map.groupBy(yield* e.all(), (S) => S.integrationID);
              return Array.from(a.get().integrations.values(), (S) =>
                u(S, H(S, D.get(S.ref.id) ?? [])),
              ).toSorted((S, T) => S.name.localeCompare(T.name));
            }),
            connection: {
              active: Ge("Integration.connection.active")(function* (D) {
                let S = a.get().integrations.get(D);
                return H(S, yield* e.list(D))[0];
              }),
              resolve: Ge("Integration.connection.resolve")(function* (D) {
                if (D.type === "env") {
                  let B = process.env[D.name];
                  return B ? s1n.make({ type: "key", key: B }) : void 0;
                }
                let S = yield* e.get(D.id);
                if (!S) return;
                if (S.value.type === "key") return S.value;
                let T = a.get().integrations.get(S.integrationID)?.implementations.get(S.value.methodID);
                if (!T?.refresh) return S.value;
                let C = yield* qC;
                if (S.value.expires > C + $E(Hie(5))) return S.value;
                let O = yield* f(T.refresh(S.value));
                return (yield* e.update(S.id, { value: O }), O);
              }),
              key: Ge("Integration.connection.key")(function* (D) {
                if (
                  !a
                    .get()
                    .integrations.get(D.integrationID)
                    ?.methods.some((T) => T.type === "key")
                )
                  return yield* No(`Key method not found: ${D.integrationID}`);
                (yield* e.create({
                  integrationID: D.integrationID,
                  label: D.label,
                  value: s1n.make({ type: "key", key: D.key }),
                }),
                  yield* t.publish(bY.ConnectionUpdated, { integrationID: D.integrationID }),
                  yield* t.publish(bY.Updated, {}));
              }),
              oauth: Ge("Integration.connection.oauth")(function* (D) {
                let S = a.get().integrations.get(D.integrationID)?.implementations.get(D.methodID);
                if (!S) return yield* No(`OAuth method not found: ${D.integrationID}/${D.methodID}`);
                let T = yield* Kut(r),
                  C = yield* f(S.authorize(D.inputs)).pipe(
                    $I(T),
                    JC((q) => (LI(q) ? cl(T, q) : ti)),
                  ),
                  O = o1n.create(),
                  B = yield* qC,
                  V = { created: B, expires: B + vYs };
                if (
                  (yield* zWs(s, (q) =>
                    new Map(q).set(O, {
                      status: "pending",
                      completing: C.mode === "auto",
                      authorization: C,
                      integrationID: D.integrationID,
                      methodID: D.methodID,
                      label: D.label,
                      scope: T,
                      time: V,
                    }),
                  ),
                  C.mode === "auto")
                )
                  yield* C.callback.pipe(
                    _h,
                    Hi((q) => L(O, q)),
                    zm(T, { startImmediately: !0 }),
                  );
                return new SYs({
                  attemptID: O,
                  url: C.url,
                  instructions: C.instructions,
                  mode: C.mode,
                  time: V,
                });
              }),
              update: Ge("Integration.connection.update")(function* (D, S) {
                let T = yield* e.get(D);
                if ((yield* e.update(D, S), T))
                  yield* t.publish(bY.ConnectionUpdated, { integrationID: T.integrationID });
                yield* t.publish(bY.Updated, {});
              }),
              remove: Ge("Integration.connection.remove")(function* (D) {
                let S = yield* e.get(D);
                if ((yield* e.remove(D), S))
                  yield* t.publish(bY.ConnectionUpdated, { integrationID: S.integrationID });
                yield* t.publish(bY.Updated, {});
              }),
            },
            attempt: {
              status: Ge("Integration.attempt.status")(function* (D) {
                let S = (yield* JRe(s)).get(D);
                if (!S) return yield* No(`OAuth attempt not found: ${D}`);
                if (S.status === "failed")
                  return { status: S.status, message: S.message ?? "Authorization failed", time: S.time };
                return { status: S.status, time: S.time };
              }),
              complete: Ge("Integration.attempt.complete")(function* (D) {
                let S = yield* $G(s, (O) => {
                  let B = O.get(D.attemptID);
                  if (!B || B.status !== "pending" || B.completing) return [B, O];
                  if (B.authorization.mode === "code" && D.code === void 0) return [B, O];
                  return [B, new Map(O).set(D.attemptID, { ...B, completing: !0 })];
                });
                if (!S) return yield* No(`OAuth attempt not found: ${D.attemptID}`);
                if (S.status !== "pending") return;
                if (S.authorization.mode === "code" && D.code === void 0)
                  return yield* new H1n({ attemptID: D.attemptID });
                if (S.completing) return yield* No(`OAuth attempt already completing: ${D.attemptID}`);
                let T =
                    S.authorization.mode === "auto"
                      ? S.authorization.callback
                      : S.authorization.callback(D.code),
                  C = yield* f(T).pipe(_h);
                if ((yield* L(D.attemptID, C), LI(C))) return yield* C;
              }),
              cancel: Ge("Integration.attempt.cancel")(function* (D) {
                let S = yield* $G(s, (T) => {
                  let C = T.get(D);
                  if (!C || C.status !== "pending") return [void 0, T];
                  let O = new Map(T);
                  return (O.delete(D), [C, O]);
                });
                if (S) yield* cl(S.scope, M$);
              }),
            },
          })
        );
      }),
    )),
    (bWe = Ua({ service: QS, layer: qir, deps: [yYs, zS] })));
});