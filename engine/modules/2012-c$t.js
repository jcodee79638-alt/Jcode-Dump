
var c$t = ne(async () => {
  Gt();
  jA();
  OH();
  Ide();
  await um();
  ((q) => {
    class e extends ki()("LockTimeoutError", { key: re }) {}
    q.LockTimeoutError = e;
    class t extends ki()("LockCompromisedError", { detail: re }) {}
    q.LockCompromisedError = t;
    class r extends ki()("ReleaseError", { detail: re, cause: be(yd()) }) {
      get message() {
        return this.detail;
      }
    }
    class s extends ki()("NotAcquired", {}) {}
    let a = 60000,
      H = 300000,
      u = 100,
      f = 2000,
      d = Math.max(100, Math.floor(a / 3)),
      _ = slt(u, 1.7).pipe(
        HNs(Die(f)),
        olt,
        eBe((Z) => Z.elapsed < H),
      ),
      L = Cj(nt({ token: re, pid: Aa, hostname: re, createdAt: re })),
      I = E1(L),
      D = Kie(L);
    class S extends _i()("EffectFlock") {}
    q.Service = S;
    function T() {
      return performance.timeOrigin + performance.now();
    }
    let C = (Z) => uD(Z.mtime, () => new Date(0)).getTime(),
      O = (Z) => Z.reason._tag === "NotFound" || Z.reason._tag === "Unknown",
      B = Es(
        S,
        ft(function* () {
          let Z = yield* M1,
            se = yield* ui.Service,
            ae = H$t.join(Z.state, "locks"),
            z = QHo.hostname(),
            Ae = new Set(),
            le = (Ve) =>
              se.stat(Ve).pipe(
                GM(O, () => ti),
                on,
              ),
            Be = (Ve) => se.remove(Ve, { recursive: !0 }).pipe(FA),
            Te = (Ve) =>
              se.makeDirectory(Ve, { mode: 448 }).pipe(
                eu(!0),
                GM(
                  (Fe) => Fe.reason._tag === "AlreadyExists",
                  () => Jt(!1),
                ),
                on,
              ),
            Lt = (Ve, Fe, it, At) =>
              se.writeFileString(Ve, Fe, { flag: "wx" }).pipe(
                $s(() =>
                  ft(function* () {
                    return (yield* Be(it), yield* new t({ detail: At }));
                  }),
                ),
              ),
            Ht = ni(function* (Ve) {
              let Fe = yield* le(Ve);
              if (Fe && T() - C(Fe) > a) yield* Be(Ve);
              return !1;
            }),
            Se = ni(function* (Ve) {
              if (Ae.has(Ve)) return;
              (yield* se.makeDirectory(Ve, { recursive: !0 }).pipe(on), Ae.add(Ve));
            }),
            _e = ni(function* (Ve, Fe, it) {
              let At = T(),
                et = yield* le(Fe);
              if (et) return At - C(et) > a;
              let ut = yield* le(it);
              if (ut) return At - C(ut) > a;
              let ht = yield* le(Ve);
              if (!ht) return !1;
              return At - C(ht) > a;
            }),
            we = (Ve, Fe) =>
              ft(function* () {
                let it = YHo(),
                  At = H$t.join(Ve, "meta.json"),
                  et = H$t.join(Ve, "heartbeat");
                if (!(yield* Te(Ve))) {
                  if (!(yield* _e(Ve, et, At))) return yield* new s();
                  let Et = Ve + ".breaker";
                  if (
                    !(yield* se.makeDirectory(Et, { mode: 448 }).pipe(
                      eu(!0),
                      GM(
                        (Vt) => Vt.reason._tag === "AlreadyExists",
                        () => Ht(Et),
                      ),
                      GM(O, () => Jt(!1)),
                      on,
                    ))
                  )
                    return yield* new s();
                  if (
                    !(yield* ft(function* () {
                      if (!(yield* _e(Ve, et, At))) return !1;
                      return (yield* Be(Ve), yield* Te(Ve));
                    }).pipe(up(Be(Et))))
                  )
                    return yield* new s();
                }
                yield* Lt(et, "", Ve, "heartbeat already existed");
                let ht = D({ token: it, pid: process.pid, hostname: z, createdAt: new Date().toISOString() });
                return (
                  yield* Lt(At, ht, Ve, "meta.json already existed"),
                  { token: it, metaPath: At, heartbeatPath: et, lockDir: Ve }
                );
              }).pipe(gI("EffectFlock.tryAcquire", { attributes: { key: Fe } })),
            Pe = (Ve, Fe) =>
              we(Ve, Fe).pipe(
                ult({ while: (it) => it._tag === "NotAcquired", schedule: _ }),
                EA("NotAcquired", () => bn(new e({ key: Fe }))),
              ),
            ye = (Ve) =>
              ft(function* () {
                let Fe = yield* se.readFileString(Ve.metaPath).pipe(
                  $s((At) => {
                    if (O(At)) return No(new r({ detail: "metadata missing" }));
                    return No(At);
                  }),
                );
                if (
                  (yield* ZA({
                    try: () => I(Fe),
                    catch: (At) => new r({ detail: "metadata invalid", cause: At }),
                  }).pipe(on)).token !== Ve.token
                )
                  return yield* No(new r({ detail: "token mismatch" }));
                yield* Be(Ve.lockDir);
              }),
            ot = Ge("EffectFlock.acquire")(function* (Ve, Fe) {
              let it = Fe ?? ae;
              yield* Se(it);
              let At = H$t.join(it, qU.fast(Ve) + ".lock"),
                et = yield* Bd(Pe(At, Ve), (ut) => ye(ut));
              yield* se.utimes(et.heartbeatPath, new Date(), new Date()).pipe(FA, xie(Die(d)), EI);
            }),
            Ee = Wr(
              (Ve) => ug(Ve[0]),
              (Ve, Fe, it) =>
                FL(
                  ft(function* () {
                    return (yield* ot(Fe, it), yield* Ve);
                  }),
                ),
            );
          return S.of({ acquire: ot, withLock: Ee });
        }),
      );
    q.node = iA({ service: S, layer: B, deps: [lw, ui.node] });
  })((n5 ||= {}));
});
import ZHo from "path";