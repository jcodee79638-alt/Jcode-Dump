
var b2,
  Uir,
  v2,
  hYs = (e) => {
    let t = yWe.get(e.type);
    if (!t?.durable) throw new v2({ type: e.type, message: `Unknown durable event type ${e.type}` });
    return {
      id: e.id,
      type: t.type,
      durable: { aggregateID: e.aggregateID, seq: e.seq, version: t.durable.version },
      data: E1(t.data)(e.data),
    };
  },
  LYs,
  e1n,
  x7H,
  mht,
  lL,
  $Ys = (e, t) =>
    ft(function* () {
      let r = yield* S9s(t),
        s = yield* e.listen((a) =>
          kW(r, a).pipe(Hi((H) => (H ? ti : T9s(r, new e1n({ capacity: t })).pipe(Qf)))),
        );
      return (yield* sL(() => s.pipe(Zu(Nie(r)), Qf)), Bie(r));
    }),
  gYs = (e) =>
    Es(
      lL,
      ft(function* () {
        let t = { all: yield* cYt(), durable: new Map(), typed: new Map() },
          r = new Map(),
          s = [],
          { db: a } = yield* Vd,
          H = (ae) =>
            ft(function* () {
              let z = t.typed.get(ae.type);
              if (z) return z;
              let Ae = yield* cYt();
              return (t.typed.set(ae.type, Ae), Ae);
            });
        yield* sL(() =>
          ft(function* () {
            (yield* OBe(t.all),
              yield* ja(t.durable.values(), (ae) => ja(ae, OBe, { discard: !0 }), { discard: !0 }),
              yield* ja(t.typed.values(), OBe, { discard: !0 }));
          }),
        );
        function u(ae, z, Ae, le) {
          return ft(function* () {
            let Be = ae?.durable;
            if (Be) {
              let Te = z.data[Be.aggregate];
              if (typeof Te !== "string")
                yield* No(
                  new v2({ type: z.type, message: `Expected string aggregate field ${Be.aggregate}` }),
                );
              else {
                if (Ae && Ae.aggregateID !== Te)
                  yield* No(
                    new v2({
                      type: z.type,
                      message: `Aggregate mismatch: expected ${Ae.aggregateID}, got ${Te}`,
                    }),
                  );
                let Lt = r.get(z.type) ?? [];
                return yield* BL(
                  ft(function* () {
                    let Ht = yield* a
                      .transaction(
                        () =>
                          ft(function* () {
                            let Se = yield* a
                                .select({ seq: j$.seq, ownerID: j$.owner_id })
                                .from(j$)
                                .where(Pi(j$.aggregate_id, Te))
                                .get()
                                .pipe(on),
                              _e = Se?.seq ?? -1,
                              we = hZt(ae.data)(z.data);
                            if (Ae?.strictOwner && Se?.ownerID && Se.ownerID !== Ae.ownerID)
                              yield* No(
                                new v2({
                                  type: z.type,
                                  message: `Replay owner mismatch for aggregate ${Te}: expected ${Se.ownerID}, got ${Ae.ownerID ?? "none"}`,
                                }),
                              );
                            if (Ae && Ae.seq <= _e) {
                              let Ee = yield* a
                                .select()
                                .from(E_)
                                .where(Gc(Pi(E_.aggregate_id, Te), Pi(E_.seq, Ae.seq)))
                                .get()
                                .pipe(on);
                              if (
                                Ee?.id === z.id &&
                                Ee.type === mht(ae.type, Be.version) &&
                                _Ys(Ee.data, we)
                              ) {
                                if (Ae.ownerID && Se?.ownerID == null)
                                  yield* a
                                    .update(j$)
                                    .set({ owner_id: Ae.ownerID })
                                    .where(Pi(j$.aggregate_id, Te))
                                    .run()
                                    .pipe(on);
                                return;
                              }
                              yield* No(
                                new v2({
                                  type: z.type,
                                  message: `Replay diverged at aggregate ${Te} sequence ${Ae.seq}`,
                                }),
                              );
                            }
                            if (Ae && Se?.ownerID && Se.ownerID !== Ae.ownerID) return;
                            let Pe = Ae?.seq ?? _e + 1;
                            if (Ae && Pe !== _e + 1)
                              yield* No(
                                new v2({
                                  type: z.type,
                                  message: `Sequence mismatch for aggregate ${Te}: expected ${_e + 1}, got ${Pe}`,
                                }),
                              );
                            let ye = yield* a
                              .select({ aggregateID: E_.aggregate_id, seq: E_.seq })
                              .from(E_)
                              .where(Pi(E_.id, z.id))
                              .get()
                              .pipe(on);
                            if (ye)
                              yield* No(
                                new v2({
                                  type: z.type,
                                  message: `Event ${z.id} already exists at aggregate ${ye.aggregateID} sequence ${ye.seq}`,
                                }),
                              );
                            let ot = { ...z, durable: { aggregateID: Te, seq: Pe, version: Be.version } };
                            for (let Ee of Lt) yield* Ee(ot);
                            if (le) yield* le(Pe);
                            return (
                              yield* a
                                .insert(j$)
                                .values([{ aggregate_id: Te, seq: Pe, owner_id: Ae?.ownerID }])
                                .onConflictDoUpdate({
                                  target: j$.aggregate_id,
                                  set: {
                                    seq: Pe,
                                    ...(Ae?.ownerID && Se?.ownerID == null ? { owner_id: Ae.ownerID } : {}),
                                  },
                                })
                                .run()
                                .pipe(on),
                              yield* a
                                .insert(E_)
                                .values([
                                  {
                                    id: z.id,
                                    aggregate_id: Te,
                                    seq: Pe,
                                    type: mht(ae.type, Be.version),
                                    data: we,
                                  },
                                ])
                                .run()
                                .pipe(on),
                              { aggregateID: Te, seq: Pe }
                            );
                          }),
                        { behavior: "immediate" },
                      )
                      .pipe(on);
                    if (Ht)
                      yield* ja(t.durable.get(Ht.aggregateID) ?? [], (Se) => eft(Se, void 0), {
                        discard: !0,
                      });
                    return Ht;
                  }),
                );
              }
            }
          });
        }
        function f(ae, z, Ae) {
          return ft(function* () {
            if (!ae?.durable && Ae)
              return yield* No(
                new v2({ type: z.type, message: "Local commit hooks require a durable event" }),
              );
            if (ae?.durable) {
              let le = yield* u(ae, z, void 0, Ae);
              if (le)
                return (
                  (z = {
                    ...z,
                    durable: { aggregateID: le.aggregateID, seq: le.seq, version: ae.durable.version },
                  }),
                  yield* _(z, !0),
                  z
                );
            }
            return (yield* _(z, !1), z);
          });
        }
        let d = (ae, z) =>
          yH(() => z(ae)).pipe(
            Fsn(
              (Ae) => !xW(Ae),
              (Ae) => cf("Event listener failed", { eventID: ae.id, eventType: ae.type, cause: Ae }),
            ),
          );
        function _(ae, z) {
          return ft(function* () {
            yield* ja(s, (le) => (z ? d(ae, le) : le(ae)), { discard: !0 });
            let Ae = t.typed.get(ae.type);
            if (Ae) yield* eft(Ae, ae);
            yield* eft(t.all, ae);
          });
        }
        function L(ae, z, Ae) {
          return ft(function* () {
            let le = OL(yield* x6(bm)),
              Be = Ae?.location ?? (le ? { directory: le.directory, workspaceID: le.workspaceID } : void 0);
            return yield* f(
              ae,
              {
                id: Ae?.id ?? b2.create(),
                ...(Ae?.metadata ? { metadata: Ae.metadata } : {}),
                type: ae.type,
                ...(Be ? { location: Be } : {}),
                data: z,
              },
              Ae?.commit,
            );
          });
        }
        function I(ae, z) {
          return ft(function* () {
            let Ae = yWe.get(ae.type);
            if (!Ae?.durable)
              yield* No(new v2({ type: ae.type, message: `Unknown durable event type ${ae.type}` }));
            else {
              let le = { id: ae.id, type: Ae.type, data: E1(Ae.data)(ae.data) },
                Be = yield* u(Ae, le, {
                  seq: ae.seq,
                  aggregateID: ae.aggregateID,
                  ownerID: z?.ownerID,
                  strictOwner: z?.strictOwner,
                });
              if (Be && z?.publish)
                yield* _(
                  {
                    ...le,
                    durable: { aggregateID: Be.aggregateID, seq: Be.seq, version: Ae.durable.version },
                  },
                  !0,
                );
            }
          });
        }
        function D(ae, z) {
          return ft(function* () {
            let Ae = ae[0]?.aggregateID;
            if (!Ae) return;
            if (ae.some((Be) => Be.aggregateID !== Ae))
              yield* No(
                new v2({
                  type: ae[0]?.type ?? "unknown",
                  message: "Replay events must belong to the same aggregate",
                }),
              );
            let le = ae[0]?.seq ?? 0;
            for (let [Be, Te] of ae.entries()) {
              let Lt = le + Be;
              if (Te.seq !== Lt)
                yield* No(
                  new v2({
                    type: Te.type,
                    message: `Replay sequence mismatch at index ${Be}: expected ${Lt}, got ${Te.seq}`,
                  }),
                );
            }
            for (let Be of ae) yield* I(Be, z);
            return Ae;
          });
        }
        function S(ae) {
          return a
            .transaction(() =>
              ft(function* () {
                (yield* a.delete(j$).where(Pi(j$.aggregate_id, ae)).run(),
                  yield* a.delete(E_).where(Pi(E_.aggregate_id, ae)).run());
              }),
            )
            .pipe(on);
        }
        function T(ae, z) {
          return a.update(j$).set({ owner_id: z }).where(Pi(j$.aggregate_id, ae)).run().pipe(on);
        }
        let C = (ae) => hh(H(ae).pipe(Vn((z) => pcn(z)))).pipe(xE((z) => z)),
          O = () => pcn(t.all),
          B = (ae, z) =>
            (e?.beforeAggregateRead?.(ae) ?? ti).pipe(
              Zu(
                a
                  .select()
                  .from(E_)
                  .where(Gc(Pi(E_.aggregate_id, ae), $D(E_.seq, z)))
                  .orderBy(Qm(E_.seq))
                  .all(),
              ),
              on,
              Vn((Ae) =>
                Ae.map((le) =>
                  hYs({ id: le.id, aggregateID: le.aggregate_id, seq: le.seq, type: le.type, data: le.data }),
                ),
              ),
            ),
          V = (ae) =>
            ft(function* () {
              let z = yield* nHn(1),
                Ae = yield* AYt(z);
              return (
                yield* Bd(
                  jn(() => {
                    let le = t.durable.get(ae) ?? new Set();
                    (le.add(z), t.durable.set(ae, le));
                  }),
                  () =>
                    jn(() => {
                      let le = t.durable.get(ae);
                      if ((le?.delete(z), le?.size === 0)) t.durable.delete(ae);
                    }).pipe(Zu(OBe(z))),
                ),
                Ae
              );
            }),
          q = (ae) =>
            hh(
              ft(function* () {
                let z = yield* V(ae.aggregateID),
                  Ae = ae.after ?? -1,
                  le = yH(() => B(ae.aggregateID, Ae)).pipe(
                    DE((Lt) =>
                      jn(() => {
                        Ae = Lt.at(-1)?.durable?.seq ?? Ae;
                      }),
                    ),
                  ),
                  Be = yield* le,
                  Te = pFs(z).pipe(
                    f1e(() => le),
                    mFs,
                  );
                return Fpe(KBe(Be), Te);
              }),
            ),
          Z = (ae) =>
            jn(
              () => (
                s.push(ae),
                jn(() => {
                  let z = s.indexOf(ae);
                  if (z >= 0) s.splice(z, 1);
                })
              ),
            ),
          se = (ae, z) =>
            jn(() => {
              let Ae = r.get(ae.type) ?? [];
              (Ae.push((le) => z(le)), r.set(ae.type, Ae));
            });
        return lL.of({
          publish: L,
          subscribe: C,
          all: O,
          durable: q,
          listen: Z,
          project: se,
          replay: I,
          replayAll: D,
          remove: S,
          claim: T,
        });
      }),
    ),
  EYs,
  zS;