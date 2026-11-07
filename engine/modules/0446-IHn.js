
var IHn = "~effect/Channel",
  a1e = (e) => Ma(e, IHn),
  U9s,
  T$ = (e) => {
    let t = Object.create(U9s);
    return ((t.transform = (r, s) => jf(e(r, s), (a) => Jt(NL(a)))), t);
  },
  ift = (e, t) => T$((r, s) => Hi(II(e)(r, s), (a) => t(a, s))),
  UU = (e) => T$((t, r) => e),
  H1e = (e) =>
    T$(
      ni(function* (t, r) {
        let s = qM(r),
          a = (u) => cl(s, pQt(u)),
          H = yield* Mie(e(t, r, s), a);
        return Mie(H, a);
      }),
    ),
  II = (e) => e.transform,
  $Yt = 4096,
  N9s = (e, t, r) =>
    BQ({ capacity: r?.bufferSize, strategy: r?.strategy }).pipe(
      DE((s) => UL(e, Nie(s))),
      DE((s) => zm($I(t(s), e), e)),
    ),
  DHn = (e, t) => T$((r, s) => Vn(N9s(s, e, t), mYt)),
  yHn = (e) => T$((t, r) => yH(() => II(e())(t, r))),
  MHn = (e, t = $Yt) =>
    UU(
      jn(() => {
        let r = e(),
          s = eH();
        return yH(() => {
          if (s._tag === "Some") return Xp(s.value);
          let a = [];
          while (a.length < t) {
            let H = r.next();
            if (H.done) {
              if (a.length === 0) return Xp(H.value);
              s = Lo(H.value);
              break;
            }
            a.push(H.value);
          }
          return Jt(a);
        });
      }),
    ),
  xHn = (e, t = $Yt) => MHn(() => e[Symbol.iterator](), t),
  SHn = (e) => IYt(Jt(e)),
  THn,
  sft = (e) => UU(Jt(bn(e))),
  gYt = (e) => UU(NL(e)),
  EYt = (e) => gYt(Vut(e)),
  IYt = (e) =>
    UU(
      jn(() => {
        let t = !1;
        return yH(() => {
          if (t) return Xp();
          return ((t = !0), e);
        });
      }),
    ),
  vHn = (e) => UU(Jt(mYt(e))),
  DYt = (e) => UU(Jt(CU(iHn(e), () => Xp()))),
  bHn = (e) => FBe(Vn(AYt(e), DYt)),
  F9s = (e, t) =>
    T$(
      ni(function* (r, s) {
        let a = e[Symbol.asyncIterator]();
        if (a.return)
          yield* UL(
            s,
            nA(() => a.return()),
          );
        return Hi(bl({ try: () => a.next(), catch: t }), (H) => (H.done ? Xp(H.value) : Jt(H.value)));
      }),
    ),
  jHn = (e, t) => c1e(F9s(e, t), vS),
  c1e,
  PHn,
  B9s,
  CHn = (e) => e === void 0 || (e !== "unbounded" && e <= 1),
  yYt,
  R9s = (e, t) =>
    T$((r, s) => {
      let a = 0;
      return Vn(
        II(e)(r, s),
        Hi((H) => t(H, a++)),
      );
    }),
  W9s = (e, t, r) =>
    H1e(
      ni(function* (s, a, H) {
        let u = 0,
          f = yield* II(e)(s, a),
          d = r.concurrency === "unbounded" ? Number.MAX_SAFE_INTEGER : r.concurrency,
          _ = yield* n1e(0);
        yield* UL(H, Nie(_));
        let L = G0(yield* Qg()),
          I = Pj(H);
        if (r.unordered) {
          let D = j6(d),
            S = ph(D.release(1)),
            T = XC({ onFailure: (C) => Hi(a2(_, C), S), onSuccess: (C) => Hi(kW(_, C), S) });
          yield* D.take(1).pipe(
            Hi(() => f),
            Hi((C) => (I(L(T(t(C, u++)))), ti)),
            CS({ disableYield: !0 }),
            jf((C) => D.withPermits(d - 1)(a2(_, C))),
            zm(H),
          );
        } else {
          let D = yield* n1e(d - 2);
          (yield* UL(H, Nie(_)),
            yield* Fie(D).pipe(
              zq,
              Hi((C) => kW(_, C)),
              CS({ disableYield: !0 }),
              jf((C) => a2(_, C)),
              zm(H),
            ));
          let S,
            T = (C) => {
              if (C._tag === "Success") return;
              ((S = C.cause), OW(_, C.cause));
            };
          yield* f.pipe(
            Hi((C) => {
              if (S) return NL(S);
              let O = L(t(C, u++));
              return (I(O), O.addObserver(T), kW(D, kBe(O)));
            }),
            CS({ disableYield: !0 }),
            jf((C) => kW(D, SW(C)).pipe(Zu(a2(D, C)))),
            zm(H),
          );
        }
        return Fie(_);
      }),
    ),
  wHn,
  V9s = (e, t) =>
    T$((r, s) =>
      Vn(II(e)(r, s), (a) => {
        let H,
          u,
          f = Hi(a, (_) => ((u ??= qM(s)), _1(II(t(_))(r, u), (L) => ((H = d(L)), H)))),
          d = jS((_) => {
            if (((H = void 0), u.state._tag === "Open" && u.state.finalizers.size === 1)) return f;
            let L = cl(u, M$);
            return ((u = void 0), Hi(L, () => f));
          });
        return yH(() => H ?? f);
      }),
    ),
  q9s = (e, t, r) => e.pipe(c1e(t), BHn(r)),
  oft = (e) =>
    ift(e, (t) => {
      let r,
        s = 0,
        a = yH(function H() {
          if (r === void 0)
            return Hi(t, (f) => {
              switch (f.length) {
                case 0:
                  return H();
                case 1:
                  return Jt(f[0]);
                default:
                  return ((r = f), Jt(f[s++]));
              }
            });
          let u = r[s++];
          if (s >= r.length) ((r = void 0), (s = 0));
          return Jt(u);
        });
      return Jt(a);
    }),
  kHn,
  MYt,
  xYt,
  OHn,
  NBe,
  UHn,
  NHn,
  FHn = (e) => NBe(e, EYt),
  BHn,
  SYt,
  RHn = () =>
    T$((e, t) =>
      jn(() => {
        let r = "",
          s = !1,
          a = eH();
        function H(d) {
          let _ = [];
          function L(I) {
            if (r.length === 0) _.push(I);
            else (_.push(r + I), (r = ""));
          }
          for (let I = 0; I < d.length; I++) {
            let D = d[I];
            if (D.length !== 0) {
              let S = 0,
                T = D.indexOf("\r"),
                C = D.indexOf(`
`);
              if (s) {
                if (C === 0)
                  (L(""),
                    (S = 1),
                    (C = D.indexOf(
                      `
`,
                      S,
                    )));
                else L("");
                s = !1;
              }
              while (T !== -1 || C !== -1)
                if (T === -1 || (C !== -1 && C < T))
                  (L(D.substring(S, C)),
                    (S = C + 1),
                    (C = D.indexOf(
                      `
`,
                      S,
                    )));
                else if (D.length === T + 1) ((s = !0), (T = -1));
                else
                  (L(D.substring(S, T)),
                    (S = T + (C === T + 1 ? 2 : 1)),
                    (T = D.indexOf("\r", S)),
                    (C = D.indexOf(
                      `
`,
                      S,
                    )));
              r = r + D.substring(S, D.length - (s ? 1 : 0));
            }
          }
          return bv(_) ? _ : null;
        }
        let u = yH(() => {
          if (a._tag === "Some") return Xp(a.value);
          return z2e(e, {
            onSuccess: f,
            onFailure: NL,
            onDone: (d) => {
              if (((a = Lo(d)), r.length > 0 || s)) {
                let _ = r;
                return ((r = ""), (s = !1), Jt([_]));
              }
              return Xp(d);
            },
          });
        });
        function f(d) {
          let _ = H(d);
          return _ !== null ? Jt(_) : u;
        }
        return u;
      }),
    ),
  aft,
  FBe = (e) =>
    T$((t, r) => {
      let s;
      return Jt(
        yH(() => {
          if (s) return s;
          return e.pipe(
            $I(r),
            Hi((a) => II(a)(t, r)),
            Hi((a) => (s = a)),
          );
        }),
      );
    }),
  WHn = (e) => H1e((t, r, s) => Vn($I(II(e)(t, r), s), $I(s))),
  VHn,
  TYt,
  qHn,
  vYt = (e, t, r) =>
    yH(() => {
      let s = VM(),
        a = II(e)(Xp(), s);
      return jS(Hi(a, t), r ? r : Jt).pipe(JC((H) => cl(s, H)));
    }),
  GHn,
  XHn = (e) => vYt(e, (t) => CS(t, { disableYield: !0 })),
  bYt,
  A1e,
  jYt = (e, t) => II(e)(Xp(), t);