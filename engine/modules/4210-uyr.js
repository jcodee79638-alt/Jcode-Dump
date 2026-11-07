
function uyr(e) {
  return ft(function* () {
    let { db: t } = yield* Vd;
    return (yield* t.select().from(dg).where(Pi(dg.message_id, e)).orderBy(dg.id).all().pipe(on)).map($Oi);
  });
}