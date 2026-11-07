
function Zbi(e, t, r, s) {
  if (!e) {
    let a = {
      code: "custom",
      input: r,
      inst: s,
      path: [...(s._zod.def.path ?? [])],
      continue: !s._zod.def.abort,
    };
    if (s._zod.def.params) a.params = s._zod.def.params;
    t.issues.push(Dhe(a));
  }
}