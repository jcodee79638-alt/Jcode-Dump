
function fTt(e, t = {}) {
  let r = new Zya({ type: "custom", check: "custom", fn: (s) => s instanceof e, abort: !0, ...yA(t) });
  return (
    (r._zod.bag.Class = e),
    (r._zod.check = (s) => {
      if (!(s.value instanceof e))
        s.issues.push({
          code: "invalid_type",
          expected: e.name,
          input: s.value,
          inst: r,
          path: [...(r._zod.def.path ?? [])],
        });
    }),
    r
  );
}