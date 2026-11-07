
function Gbi(e, t, r, s) {
  for (let H of e) if (H.issues.length === 0) return ((t.value = H.value), t);
  let a = e.filter((H) => !_X(H));
  if (a.length === 1) return ((t.value = a[0].value), a[0]);
  return (
    t.issues.push({
      code: "invalid_union",
      input: t.value,
      inst: r,
      errors: e.map((H) => H.issues.map((u) => hX(u, s, U8()))),
    }),
    t
  );
}