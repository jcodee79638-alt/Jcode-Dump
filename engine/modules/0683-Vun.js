
var Vun = "~effect/socket/Socket",
  TRs,
  vRs = (e) =>
    TRs.of({
      [Vun]: Vun,
      runRaw: e.runRaw,
      run:
        e.run ??
        ((t, r) =>
          e.runRaw(
            (s) =>
              typeof s === "string"
                ? t(bRs.encode(s))
                : s instanceof Uint8Array
                  ? t(s)
                  : t(new Uint8Array(s)),
            r,
          )),
      runString:
        e.runString ??
        (e.run
          ? (t, r) => e.run((s) => t(fer.decode(s)), r)
          : (t, r) =>
              e.runRaw(
                (s) =>
                  typeof s === "string"
                    ? t(s)
                    : s instanceof Uint8Array
                      ? t(fer.decode(s))
                      : t(fer.decode(new Uint8Array(s))),
                r,
              )),
      writer: e.writer,
    }),
  bRs,
  fer,
  $pt = "~effect/socket/Socket/CloseEvent",
  Fv,
  jRs = (e) => Ma(e, $pt),
  gpt = "~effect/socket/Socket/SocketError",
  PRs = (e) => Ma(e, gpt),
  per,
  qun,
  Ept,
  Ipt,
  CRs,
  jRe,
  wRs = (e) => !0,
  Gun,
  U1e,
  Xun,
  Jun = (e, t) =>
    U1e.use((r) =>
      der(
        Bd((typeof e === "string" ? Jt(e) : e).pipe(Vn((s) => r(s, t?.protocols))), (s) =>
          jn(() => s.close(1000)),
        ),
        t,
      ),
    ),
  der = (e, t) =>
    hl((r) => {
      let s,
        a = CW(!1),
        H = r.context,
        u = t?.closeCodeIsError ?? wRs,
        f = (L, I) =>
          llt(
            ni(function* (D) {
              let S = yield* _pt().pipe($I(D)),
                T = yield* $I(e, D),
                C = yield* IA(uer(S)(), Gun, T),
                O = !1;
              function B(Z) {
                if (Z.data instanceof Blob) {
                  let ae = Hi(
                    nA(() => Z.data.arrayBuffer()),
                    (z) => {
                      let Ae = L(new Uint8Array(z));
                      return ug(Ae) ? Ae : ti;
                    },
                  );
                  return C(ae);
                }
                let se = L(Z.data);
                if (ug(se)) C(se);
              }
              function V(Z) {
                (T.removeEventListener("message", B),
                  T.removeEventListener("close", q),
                  EE(
                    S.deferred,
                    bn(
                      new jRe({ reason: O ? new per({ cause: Z }) : new Ept({ kind: "Unknown", cause: Z }) }),
                    ),
                  ));
              }
              function q(Z) {
                let se = typeof Z.code === "number" ? Z.code : 1001;
                (T.removeEventListener("message", B),
                  T.removeEventListener("error", V),
                  EE(S.deferred, bn(new jRe({ reason: new Ipt({ code: se, closeReason: Z.reason }) }))));
              }
              if (
                (T.addEventListener("close", q, { once: !0 }),
                T.addEventListener("error", V, { once: !0 }),
                T.addEventListener("message", B),
                T.readyState !== 1)
              ) {
                let Z = Kg();
                (T.addEventListener(
                  "open",
                  () => {
                    ((O = !0), EE(Z, ti));
                  },
                  { once: !0 },
                ),
                  yield* Fl(Z).pipe(
                    Tj({
                      duration: t?.openTimeout ?? 1e4,
                      orElse: () =>
                        bn(
                          new jRe({
                            reason: new Ept({ kind: "Timeout", cause: Error('timeout waiting for "open"') }),
                          }),
                        ),
                    }),
                    Yq(hpt(S)),
                  ));
              }
              if (((O = !0), (s = T), a.openUnsafe(), I?.onOpen)) yield* I.onOpen;
              return yield* Alt(
                hpt(S),
                Ipt.filterClean((Z) => !u(Z)),
                () => ti,
              );
            }),
          ).pipe(
            iBe((D) => _I(H, D)),
            up(
              jn(() => {
                (a.closeUnsafe(), (s = void 0));
              }),
            ),
          ),
        _ = Jt((L) =>
          a.whenOpen(
            jn(() => {
              let I = s;
              if (jRs(L)) I.close(L.code, L.reason);
              else I.send(L);
            }),
          ),
        );
      return Jt(vRs({ runRaw: f, writer: _ }));
    });