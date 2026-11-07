
var Etr = ne(() => {
  YA();
  BH();
  ew();
  KH();
  wC();
  Dd();
  s1e();
  fD();
  aL();
  p3e = class p3e extends _i()("effect/reactivity/Reactivity") {};
  UVs = jn(() => {
    let e = new Map(),
      t = (d) => {
        $tr(d, (_) => {
          let L = e.get(_);
          if (L === void 0) return;
          L.forEach((I) => I());
        });
      },
      r = (d) =>
        M6((_) => {
          let L = _.mapUnsafe.get(gtr.key);
          if (L)
            $tr(d, (I) => {
              L.add(I);
            });
          else t(d);
          return ti;
        }),
      s = (d, _) => DE(_, r(d)),
      a = (d, _) => {
        let L = [];
        return (
          $tr(d, (I) => {
            L.push(I);
            let D = e.get(I);
            if (D === void 0) ((D = new Set()), e.set(I, D));
            D.add(_);
          }),
          () => {
            for (let I = 0; I < L.length; I++) {
              let D = e.get(L[I]);
              if ((D.delete(_), D.size === 0)) e.delete(L[I]);
            }
          }
        );
      },
      H = (d, _) =>
        ft(function* () {
          let L = yield* Qg(),
            I = Pp(L, $f),
            D = yield* BQ(),
            S = mW(G0(L), Pj(I)),
            T = !1,
            C = !1,
            O = (q) => {
              if (q._tag === "Failure") OW(D, q.cause);
              else JM(D, q.value);
              if (C) ((C = !1), S(_).addObserver(O));
              else T = !1;
            };
          function B() {
            if (T) {
              C = !0;
              return;
            }
            ((T = !0), S(_).addObserver(O));
          }
          let V = a(d, B);
          return (yield* UL(I, jn(V)), B(), D);
        }),
      u = (d, _) => H(d, _).pipe(Vn(Bie), hh),
      f = (d) =>
        yH(() => {
          let _ = new Set();
          return d.pipe(
            IA(gtr, _),
            JC((L) =>
              jn(() => {
                _.forEach((I) => {
                  let D = e.get(I);
                  if (D === void 0) return;
                  D.forEach((S) => S());
                });
              }),
            ),
          );
        });
    return p3e.of({
      mutation: s,
      query: H,
      stream: u,
      invalidateUnsafe: t,
      invalidate: r,
      registerUnsafe: a,
      withBatch: f,
    });
  });
  gtr = class gtr extends _i()("effect/reactivity/Reactivity/PendingInvalidation") {};
  kdn = Es(p3e)(UVs);
});