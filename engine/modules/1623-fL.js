
var fL = ne(async () => {
  Gt();
  g_();
  Ef();
  w3e();
  OH();
  MWe();
  await Jn([fL(), qL(), qd()]);
  ((b2 = rtr),
    (Uir = Ge("EventV2.latestSequence")(function* (e, t) {
      return (
        (yield* e.select({ seq: j$.seq }).from(j$).where(Pi(j$.aggregate_id, t)).get().pipe(on))?.seq ?? -1
      );
    })));
  v2 = class v2 extends ki()("EventV2.InvalidDurableEvent", { type: re, message: re }) {};
  LYs = Ge("EventV2.readAggregate")(function* (e, t) {
    let r = t.after ?? -1,
      s = yield* e
        .select()
        .from(E_)
        .where(
          Gc(
            Pi(E_.aggregate_id, t.aggregateID),
            $D(E_.seq, r),
            Wv(E_.type, Array.from(t.manifest.definitions.keys())),
          ),
        )
        .orderBy(Qm(E_.seq))
        .limit(t.limit + 1)
        .all()
        .pipe(on),
      a = s.slice(0, t.limit),
      H = E1(t.manifest.schema);
    return {
      events: a.map((f) =>
        H({
          id: f.id,
          type: t.manifest.definitions.get(f.type)?.type ?? f.type,
          durable: {
            aggregateID: f.aggregate_id,
            seq: f.seq,
            version: t.manifest.definitions.get(f.type)?.durable?.version,
          },
          data: f.data,
        }),
      ),
      hasMore: s.length > t.limit,
    };
  });
  e1n = class e1n extends ki()("EventV2.SubscriberOverflow", { capacity: DI }) {};
  ((x7H = ua), (mht = Npn));
  lL = class lL extends _i()("@opencode/Event") {};
  ((EYs = gYs()), (zS = iA({ service: lL, layer: EYs, deps: [DD] })));
});