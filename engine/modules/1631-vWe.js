
var vWe = ne(async () => {
  Ef();
  Gt();
  e3e();
  ade();
  OH();
  i1n();
  await Jn([vWe(), qL()]);
  ((Bir = sdt), (Rir = Wpn), (s1n = Vpn), (Wir = lVs));
  Fir = class Fir extends Pa("Credential.Info")({ id: Bir, integrationID: rY, label: re, value: Wir }) {};
  TWe = class TWe extends _i()("@opencode/v2/Credential") {};
  ((DYs = Es(
    TWe,
    ft(function* () {
      let { db: e } = yield* Vd,
        t = E1(Wir),
        r = (s) => {
          if (!s.integration_id) return;
          return new Fir({ id: s.id, integrationID: s.integration_id, label: s.label, value: t(s.value) });
        };
      return TWe.of({
        all: Ge("Credential.all")(function* () {
          return (yield* e.select().from($w).orderBy(Qm($w.time_created)).all().pipe(on)).flatMap((s) => {
            let a = r(s);
            return a ? [a] : [];
          });
        }),
        list: Ge("Credential.list")(function* (s) {
          return (yield* e
            .select()
            .from($w)
            .where(Pi($w.integration_id, s))
            .orderBy(Qm($w.time_created))
            .all()
            .pipe(on)).flatMap((a) => {
            let H = r(a);
            return H ? [H] : [];
          });
        }),
        get: Ge("Credential.get")(function* (s) {
          let a = yield* e.select().from($w).where(Pi($w.id, s)).get().pipe(on);
          return a ? r(a) : void 0;
        }),
        create: Ge("Credential.create")(function* (s) {
          let a = new Fir({
            id: Bir.create(),
            integrationID: s.integrationID,
            label: s.label ?? "default",
            value: s.value,
          });
          return (
            yield* e
              .transaction((H) =>
                ft(function* () {
                  (yield* H.delete($w).where(Pi($w.integration_id, a.integrationID)).run(),
                    yield* H.insert($w)
                      .values({ id: a.id, integration_id: a.integrationID, label: a.label, value: a.value })
                      .run());
                }),
              )
              .pipe(on),
            a
          );
        }),
        update: Ge("Credential.update")(function* (s, a) {
          if (!a.label && !a.value) return;
          yield* e.update($w).set({ label: a.label, value: a.value }).where(Pi($w.id, s)).run().pipe(on);
        }),
        remove: Ge("Credential.remove")(function* (s) {
          yield* e.delete($w).where(Pi($w.id, s)).run().pipe(on);
        }),
      });
    }),
  )),
    (yYs = iA({ service: TWe, layer: DYs, deps: [DD] })));
});