
function bLt(e, t, r) {
  if (!r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1) return e;
  if (eoe(e) || t.has(e) || !NY(e) || ULt(e)) return e;
  return (
    t.add(e),
    CLt(e, (s, a) => {
      if (eoe(a)) {
        let H = a[Iw];
        if (NLt(H, r)) {
          let u = Cor(H);
          (TLt(e, s, u, e.type_), UTn(H));
        }
      } else if (NY(a)) bLt(a, t, r);
    }),
    e
  );
}