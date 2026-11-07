
function C2s(e, t) {
  let r = uG(e),
    s = { errors: "all", ...t?.parseOptions },
    a = xon(t),
    H = (u) => {
      let f = new mye(),
        d = KC(yie(r(u, s), { onFailure: a, onSuccess: (L) => ({ value: L }) }), { scheduler: f });
      d.currentDispatcher?.flush();
      let _ = d.pollUnsafe();
      if (_) return $An(_);
      return new Promise((L) => {
        d.addObserver((I) => {
          L($An(I));
        });
      });
    };
  if ("~standard" in e) {
    let u = e;
    if ("validate" in u["~standard"]) return u;
    return (Object.assign(u["~standard"], { validate: H }), u);
  } else return Object.assign(e, { "~standard": { version: 1, vendor: "effect", validate: H } });
}