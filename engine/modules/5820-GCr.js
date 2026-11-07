
function GCr(e, t) {
  return ft(function* () {
    let r = yield* (
      t?.length ? e.select().from(j$).where(Wv(j$.aggregate_id, t)).all() : e.select().from(j$).all()
    ).pipe(on);
    return Object.fromEntries(r.map((s) => [s.aggregate_id, s.seq]));
  });
}