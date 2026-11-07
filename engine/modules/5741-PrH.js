
var PrH = (e) =>
  ft(function* () {
    let t = new Map(),
      r = yield* MRs(),
      s = () => ({ done: Kg(), pendingWake: !1, stopping: !1 }),
      a = (_, L, I, D = !1) => {
        let S = Kg(),
          T = r(
            (D ? rBe : Fl(S)).pipe(
              Zu(yH(() => e.drain(_, I))),
              JC((C) => jn(() => H(_, L, C))),
              _h,
              Qf,
            ),
          );
        if (((L.owner = T), !D)) EE(S, ti);
      },
      H = (_, L, I) => {
        if (mh(I) && !L.stopping && L.pendingWake) {
          ((L.pendingWake = !1), a(_, L, !1, !0));
          return;
        }
        let D = L.pendingWake ? s() : void 0;
        if (D === void 0) t.delete(_);
        else (t.set(_, D), a(_, D, !1, !0));
        EE(L.done, I);
      },
      u = (_) =>
        q0((L) => {
          let I = t.get(_);
          if (I !== void 0) {
            if (I.stopping) return L(Fl(I.done).pipe(Zu(u(_))));
            return L(Fl(I.done));
          }
          let D = s();
          return (t.set(_, D), a(_, D, !0), L(Fl(D.done)));
        }),
      f = (_) =>
        jn(() => {
          let L = t.get(_);
          if (L !== void 0) {
            L.pendingWake = !0;
            return;
          }
          let I = s();
          (t.set(_, I), a(_, I, !1));
        }),
      d = (_) =>
        yH(() => {
          let L = t.get(_);
          if (L?.owner === void 0) return ti;
          return ((L.stopping = !0), (L.pendingWake = !1), s2(L.owner));
        });
    return { active: jn(() => new Set(t.keys())), run: u, wake: f, interrupt: d };
  });