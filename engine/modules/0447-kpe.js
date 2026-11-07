
var kpe = ne(() => {
  R0();
  Jg();
  BH();
  lD();
  ew();
  KH();
  h2e();
  Oie();
  Hf();
  R_();
  Yu();
  fYt();
  TQ();
  s1e();
  Tv();
  fD();
  o1e();
  ((U9s = {
    [IHn]: { _Env: Za, _InErr: Za, _InElem: Za, _OutErr: Za, _OutElem: Za },
    pipe() {
      return vA(this, arguments);
    },
  }),
    (THn = UU(Jt(Xp()))),
    (c1e = Wr(2, (e, t) =>
      ift(e, (r) =>
        jn(() => {
          let s = 0;
          return Vn(r, (a) => t(a, s++));
        }),
      ),
    )),
    (PHn = Wr(2, (e, t) => B9s(e, (r) => Jt(t(r))))),
    (B9s = Wr(2, (e, t) => ift(e, (r) => Jt(jS(r, (s) => Hi(t(s), Xp)))))),
    (yYt = Wr(
      (e) => a1e(e[0]),
      (e, t, r) => (CHn(r?.concurrency) ? R9s(e, t) : W9s(e, t, r)),
    )),
    (wHn = Wr(
      (e) => a1e(e[0]),
      (e, t, r) => (CHn(r?.concurrency) ? V9s(e, t) : q9s(e, t, r)),
    )),
    (kHn = Wr(2, (e, t) =>
      ift(e, (r) =>
        Jt(
          Hi(r, function s(a) {
            let H = [];
            for (let u = 0; u < a.length; u++) if (t(a[u])) H.push(a[u]);
            return bv(H) ? Jt(H) : Hi(r, s);
          }),
        ),
      ),
    )),
    (MYt = Wr(
      (e) => a1e(e[0]),
      (e, t, r, s) =>
        T$((a, H) =>
          Vn(II(e)(a, H), (u) => {
            let f = t(),
              d,
              _ = 0,
              L,
              I = XC(u, {
                onFailure(S) {
                  L = S;
                  let T = s?.onHalt && s.onHalt(f);
                  return T && T.length > 0 ? Jt([f, T]) : NL(S);
                },
                onSuccess(S) {
                  let T = r(f, S);
                  return crn(T) ? Jt(T) : T;
                },
              });
            return yH(function S() {
              if (d === void 0) {
                if (L) return NL(L);
                return Hi(I, ([C, O]) => {
                  if (((f = C), O.length === 0)) return S();
                  else if (O.length === 1) return Jt(O[0]);
                  return ((d = O), S());
                });
              }
              let T = d[_++];
              if (_ >= d.length) ((d = void 0), (_ = 0));
              return Jt(T);
            });
          }),
        ),
    )),
    (xYt = Wr(2, (e, t) =>
      T$((r, s) => {
        let a = qM(s);
        return Vn(II(e)(r, a), (H) => {
          let u = H.pipe(
            jf((f) => {
              if (Eie(f)) return NL(f);
              let d = a;
              return (
                (a = qM(s)),
                cl(d, SW(f)).pipe(
                  Zu(II(t(f))(r, a)),
                  Hi((_) => ((u = _), _)),
                )
              );
            }),
          );
          return yH(() => u);
        });
      }),
    )),
    (OHn = Wr(3, (e, t, r) =>
      xYt(e, (s) => {
        let a = t(s);
        return xm(a) ? gYt(a.failure) : r(a.success, s);
      }),
    )),
    (NBe = Wr(2, (e, t) => OHn(e, pie, (r) => t(r)))),
    (UHn = Wr(
      (e) => a1e(e[0]),
      (e, t, r, s) => NBe(e, (a) => (t(a) ? r(a) : s ? s(a) : sft(a))),
    )),
    (NHn = Wr(2, (e, t) => NBe(e, (r) => sft(t(r))))),
    (BHn = Wr(2, (e, { bufferSize: t = 16, concurrency: r, switch: s = !1 }) =>
      H1e(
        ni(function* (a, H, u) {
          let f = r === "unbounded" ? Number.MAX_SAFE_INTEGER : Math.max(1, r),
            d = s ? void 0 : j6(f),
            _ = yield* iYt(!0),
            L = new Set(),
            I = yield* n1e(t);
          yield* UL(u, Nie(I));
          let D = yield* II(e)(a, H);
          return (
            yield* ft(function* () {
              while (!0) {
                if (d) yield* d.take(1);
                let S = yield* D,
                  T = qM(u),
                  C = yield* II(S)(a, T);
                while (L.size >= f) {
                  let B = m2e(L);
                  if ((L.delete(B), L.size === 0)) yield* _.open;
                  yield* s2(B);
                }
                let O = yield* C.pipe(
                  DE(() => rBe),
                  Hi((B) => kW(I, B)),
                  CS({ disableYield: !0 }),
                  Mie(
                    ni(function* (B) {
                      let V = ilt(B);
                      if ((yield* _h(cl(T, !xm(V) ? RC(V.success.value) : SW(V.failure))), !L.has(O))) return;
                      if ((L.delete(O), d)) yield* d.release(1);
                      if (L.size === 0) yield* _.open;
                      if (gW(V)) return;
                      return yield* a2(I, B);
                    }),
                  ),
                  oBe,
                );
                (_.closeUnsafe(), L.add(O));
              }
            }).pipe(
              jf((S) => _.whenOpen(a2(I, S))),
              zm(u),
            ),
            Fie(I)
          );
        }),
      ),
    )),
    (SYt = Wr(
      (e) => a1e(e[0]) && a1e(e[1]),
      (e, t, r) =>
        H1e(
          ni(function* (s, a, H) {
            let u = r?.haltStrategy ?? "both",
              f = yield* n1e(0);
            yield* UL(H, Nie(f));
            let d = 0;
            function _(I, D) {
              if ((d++, !Eie(D))) return a2(f, D);
              switch (u) {
                case "both":
                  return d === 2 ? a2(f, D) : ti;
                case "left":
                case "right":
                  return I === u ? a2(f, D) : ti;
                case "either":
                  return a2(f, D);
              }
            }
            let L = (I, D, S) =>
              II(D)(s, S).pipe(
                Hi((T) =>
                  T.pipe(
                    Hi((C) => kW(f, C)),
                    CS,
                  ),
                ),
                Mie((T) => Zu(cl(S, pQt(T)), _(I, T))),
                zm(H),
              );
            return (yield* L("left", e, qM(H)), yield* L("right", t, qM(H)), Fie(f));
          }),
        ),
    )),
    (aft = Wr(2, (e, t) => T$((r, s) => Hi(II(e)(r, s), (a) => II(t)(a, s))))),
    (VHn = Wr(2, (e, t) => SYt(e, UU(Jt(Hi(t, Xp))), { haltStrategy: "either" }))),
    (TYt = Wr(2, (e, t) => H1e((r, s, a) => TW(a, t).pipe(Zu(II(e)(r, s)))))),
    (qHn = Wr(2, (e, t) => TYt(e, (r) => t))),
    (GHn = Wr(2, (e, t) => T$((r, s) => Vn(m1(II(e)(r, s), t), m1(t))))),
    (bYt = Wr(2, (e, t) => vYt(e, (r) => CS(Hi(r, t), { disableYield: !0 })))),
    (A1e = Wr(3, (e, t, r) =>
      yH(() => {
        let s = t();
        return vYt(
          e,
          (a) =>
            Kq({
              while: d6,
              body: () => a,
              step: (H) => {
                s = r(s, H);
              },
            }),
          () => Jt(s),
        );
      }),
    )));
});