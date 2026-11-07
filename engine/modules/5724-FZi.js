
function FZi(e, t) {
  let r = Object.keys(t);
  if (r.length === 0) return Jt(!0);
  return e
    .select({ id: j$.aggregate_id, seq: j$.seq })
    .from(j$)
    .where(Wv(j$.aggregate_id, r))
    .all()
    .pipe(
      on,
      Vn((s) => {
        let a = Object.fromEntries(s.map((H) => [H.id, H.seq]));
        return r.every((H) => (a[H] ?? -1) >= t[H]);
      }),
    );
}