
var tvt = ne(() => {
  tvt();
  Gt();
  QDr();
  OH();
  VN = class VN extends _i()("@opencode/BackgroundJob") {};
  ((K8i = ft(function* () {
    let e = { jobs: yield* KWs(new Map()), scope: yield* $f },
      t = Ge("BackgroundJob.settle")(function* (I, D, S, T) {
        let C = yield* qC,
          O = yield* $G(e.jobs, (B) => {
            let V = B.get(I);
            if (!V) return [{}, B];
            if (V.token !== D) return [{}, B];
            if (V.info.status !== "running") return [{ info: W8(V) }, B];
            let q = V.pending - 1,
              Z = mh(T) && (!V.output || S > V.output.sequence) ? { sequence: S, text: T.value } : V.output;
            if (mh(T) && q > 0) return [{}, new Map(B).set(I, { ...V, pending: q, output: Z })];
            let se = mh(T) ? "completed" : d1(T.cause) ? "cancelled" : "error",
              ae = {
                ...V,
                onPromote: void 0,
                pending: 0,
                output: Z,
                info: {
                  ...V.info,
                  status: se,
                  completed_at: C,
                  ...(Z ? { output: Z.text } : {}),
                  ...(LI(T) ? { error: Vva(hI(T.cause)) } : {}),
                },
              };
            return [{ info: W8(ae), done: V.done, scope: V.scope }, new Map(B).set(I, ae)];
          });
        if (O.info && O.done) yield* D6(O.done, O.info).pipe(FA);
        if (O.scope) yield* cl(O.scope, M$).pipe(zm(e.scope, { startImmediately: !0 }));
        return O.info;
      }),
      r = Ge("BackgroundJob.fork")(function* (I, D, S, T, C) {
        return yield* C.pipe(
          XC({ onSuccess: (O) => t(D, S, T, RC(O)), onFailure: (O) => t(D, S, T, SW(O)) }),
          Qf,
          zm(I, { startImmediately: !0 }),
        );
      }),
      s = Ge("BackgroundJob.list")(function* () {
        return Array.from((yield* JRe(e.jobs)).values())
          .map(W8)
          .toSorted((I, D) => I.started_at - D.started_at);
      }),
      a = Ge("BackgroundJob.get")(function* (I) {
        let D = (yield* JRe(e.jobs)).get(I);
        if (!D) return;
        return W8(D);
      }),
      H = Ge("BackgroundJob.start")(function* (I) {
        return yield* q0((D) =>
          ft(function* () {
            let S = I.id ?? Bva("job"),
              T = yield* qC,
              C = yield* bU(),
              O = yield* bU(),
              B = yield* bU(),
              V = yield* KRe(
                e.jobs,
                ni(function* (q) {
                  let Z = q.get(S);
                  if (Z?.info.status === "running") return [{ info: W8(Z) }, q];
                  let se = yield* Kut(e.scope, "parallel"),
                    ae = {},
                    z = {
                      info: {
                        id: S,
                        type: I.type,
                        title: I.title,
                        status: "running",
                        started_at: T,
                        metadata: I.metadata,
                      },
                      done: C,
                      scope: se,
                      token: ae,
                      pending: 1,
                      next: 1,
                      tail: B,
                      promoted: O,
                      onPromote: I.onPromote,
                    };
                  return [{ info: W8(z), scope: se, token: ae }, new Map(q).set(S, z)];
                }),
              );
            if ("scope" in V) yield* r(V.scope, S, V.token, 0, D(I.run).pipe(up(D6(B, void 0))));
            return V.info;
          }),
        );
      }),
      u = Ge("BackgroundJob.extend")(function* (I) {
        return yield* q0((D) =>
          ft(function* () {
            let S = yield* bU(),
              T = yield* $G(e.jobs, (C) => {
                let O = C.get(I.id);
                if (!O || O.info.status !== "running") return [{ extended: !1 }, C];
                return [
                  {
                    extended: !0,
                    previous: O.tail,
                    scope: O.scope,
                    tail: S,
                    token: O.token,
                    sequence: O.next,
                  },
                  new Map(C).set(I.id, { ...O, pending: O.pending + 1, next: O.next + 1, tail: S }),
                ];
              });
            if (!T.extended) return !1;
            return (
              yield* r(
                T.scope,
                I.id,
                T.token,
                T.sequence,
                Fl(T.previous).pipe(Zu(D(I.run)), up(D6(T.tail, void 0))),
              ),
              !0
            );
          }),
        );
      }),
      f = Ge("BackgroundJob.wait")(function* (I) {
        let D = (yield* JRe(e.jobs)).get(I.id);
        if (!D) return { timedOut: !1 };
        if (D.info.status !== "running") return { info: W8(D), timedOut: !1 };
        if (I.timeout === void 0) return { info: yield* Fl(D.done), timedOut: !1 };
        if (I.timeout <= 0) return { info: W8(D), timedOut: !0 };
        let S = yield* Fl(D.done).pipe(PQ(I.timeout));
        if (S._tag === "Some") return { info: S.value, timedOut: !1 };
        return { info: W8(D), timedOut: !0 };
      }),
      d = Ge("BackgroundJob.waitForPromotion")(function* (I) {
        let D = (yield* JRe(e.jobs)).get(I);
        if (!D || D.info.status !== "running") return yield* clt;
        if (D.info.metadata?.background === !0) return W8(D);
        return yield* Fl(D.promoted);
      }),
      _ = Ge("BackgroundJob.promote")(function* (I) {
        let D = yield* KRe(
          e.jobs,
          ni(function* (S) {
            let T = S.get(I);
            if (!T || T.info.status !== "running") return [{}, S];
            if (T.info.metadata?.background === !0) return [{ info: W8(T) }, S];
            let C = {
              ...T,
              onPromote: void 0,
              info: { ...T.info, metadata: { ...T.info.metadata, background: !0 } },
            };
            return [{ info: W8(C), onPromote: T.onPromote, promoted: T.promoted }, new Map(S).set(I, C)];
          }),
        );
        if (D.info && D.promoted) yield* D6(D.promoted, D.info).pipe(FA);
        if (D.onPromote) yield* D.onPromote.pipe(FA);
        return D.info;
      }),
      L = Ge("BackgroundJob.cancel")(function* (I) {
        let D = yield* qC,
          S = yield* $G(e.jobs, (T) => {
            let C = T.get(I);
            if (!C) return [{}, T];
            if (C.info.status !== "running") return [{ info: W8(C) }, T];
            let O = {
              ...C,
              onPromote: void 0,
              pending: 0,
              info: { ...C.info, status: "cancelled", completed_at: D },
            };
            return [{ info: W8(O), done: C.done, scope: C.scope }, new Map(T).set(I, O)];
          });
        if (S.info && S.done) yield* D6(S.done, S.info).pipe(FA);
        if (S.scope) yield* cl(S.scope, M$);
        return S.info;
      });
    return VN.of({
      list: s,
      get: a,
      start: H,
      extend: u,
      wait: f,
      waitForPromotion: d,
      promote: _,
      cancel: L,
    });
  })),
    (qva = Es(VN, K8i)),
    (XVc = iA({ service: VN, layer: qva, deps: [] })));
});