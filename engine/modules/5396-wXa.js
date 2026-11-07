
function wXa(e, t) {
  let r = new Set(Object.keys(t).filter((s) => s !== "allOf"));
  return e.every((s) =>
    Object.keys(s).every((a) => {
      if (r.has(a)) return !1;
      return (r.add(a), !0);
    }),
  );
}