
function uja(e, t) {
  let r = t.map((a) => a.id),
    s = new Map();
  return ft(function* () {
    if (r.length > 0) {
      let a = yield* e
        .select()
        .from(dg)
        .where(Wv(dg.message_id, r))
        .orderBy(dg.message_id, dg.id)
        .all()
        .pipe(on);
      for (let H of a) {
        let u = $Oi(H),
          f = s.get(H.message_id);
        if (f) f.push(u);
        else s.set(H.message_id, [u]);
      }
    }
    return t.map((a) => ({ info: LOi(a), parts: s.get(a.id) ?? [] }));
  });
}