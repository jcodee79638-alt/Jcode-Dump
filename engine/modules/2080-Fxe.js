
var Fxe = ne(async () => {
  OH();
  Gt();
  i$t();
  h2();
  a3e();
  zde();
  dWe();
  rV();
  await Jn([Fxe(), KG(), fL(), yV(), Par(), PV(), R2()]);
  ((M$t = pvn), (gfo = dvn));
  Bxe = class Bxe extends _i()("@opencode/v2/Plugin") {};
  ((lPn = Es(
    Bxe,
    ft(function* () {
      let e = yield* lL,
        t = mir(),
        r = yield* V2e(),
        s = new Map(),
        a = new Set(),
        H = new Map(),
        u = new Map(),
        f,
        d = Ge("Plugin.add")(function* (D, S) {
          if (a.has(D)) return yield* No(`Plugin load cycle detected for ${D}`);
          yield* t.withLock(D)(
            jn(() => {
              (a.add(D), u.delete(D));
            }).pipe(
              Zu(
                Adt(
                  ft(function* () {
                    let T = s.get(D);
                    if ((s.delete(D), T)) yield* cl(T, M$).pipe(FA);
                    let C = yield* Kut(r);
                    (yield* S(f).pipe(
                      $I(C),
                      gI("Plugin.load", { attributes: { "plugin.id": D } }),
                      JC((O) => (LI(O) ? cl(C, O) : ti)),
                    ),
                      yield* e.publish(gfo.Added, { id: D }),
                      s.set(D, C),
                      yield* ja(H.get(D) ?? [], (O) => D6(O, void 0), { discard: !0 }),
                      H.delete(D));
                  }),
                ),
              ),
              JC((T) => {
                if (mh(T)) return ti;
                return (
                  u.set(D, T),
                  ja(H.get(D) ?? [], (C) => SQ(C, T), { discard: !0 }).pipe(up(jn(() => H.delete(D))))
                );
              }),
              up(jn(() => a.delete(D))),
            ),
          );
        }),
        _ = Ge("Plugin.remove")(function* (D) {
          if (a.has(D)) return yield* No(`Cannot remove plugin ${D} while it is loading`);
          yield* t.withLock(D)(
            Adt(
              ft(function* () {
                let S = s.get(D);
                if ((s.delete(D), u.delete(D), S)) yield* cl(S, M$).pipe(FA);
              }),
            ),
          );
        }),
        L = Ge("Plugin.wait")(function* (D) {
          let S = yield* bU(),
            T = yield* t.withLock(D)(
              jn(() => {
                if (s.has(D)) return !1;
                let C = u.get(D);
                if (C) return C;
                let O = H.get(D) ?? new Set();
                return (O.add(S), H.set(D, O), !0);
              }),
            );
          if (!T) return;
          if (typeof T !== "boolean") return yield* T;
          yield* Fl(S).pipe(
            up(
              t.withLock(D)(
                jn(() => {
                  let C = H.get(D);
                  if ((C?.delete(S), C?.size === 0)) H.delete(D);
                }),
              ),
            ),
          );
        });
      yield* sL((D) =>
        ft(function* () {
          (s.clear(), yield* Adt(cl(r, D)));
        }),
      );
      let I = Bxe.of({ add: d, remove: _, wait: L });
      return ((f = yield* $fo(I)), I);
    }),
  )),
    (QZH = lPn.pipe(Jm(hdn), Jm($dn), Jm(wYs), Jm(kYs), Jm(qir), Jm(Hco))),
    (fPn = Ua({ service: Bxe, layer: lPn, deps: [zS, s3e, gdn, Lht, Xir, bWe, u$t, vVe] })));
});
import Efo from "path";