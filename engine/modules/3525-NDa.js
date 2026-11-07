
function NDa(e, t) {
  let r = Z0r(e._zod.def.checks);
  if (!r.length) return;
  let s = Math.min(...r.map((H) => H[0])),
    a = e._zod.parse;
  e._zod.parse = (H, u) => {
    let f = t(H.value);
    if (f > s && !u?.skipChecks && u?.direction !== "backward") {
      for (let [d, _] of Z0r(e._zod.def.checks))
        if (f > d && _._zod.def.when(H)) {
          let L = H.issues.length;
          return (_._zod.check(H), (H.issues[L].continue = !1), SSt(H.issues, L, e), H);
        }
    }
    return a(H, u);
  };
}