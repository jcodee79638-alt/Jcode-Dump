
function sZt(e) {
  return (t) => {
    let r = new Map();
    for (let H = 0; H < t.length; H++) r.set(ME(t[H]), H);
    let s = [...t].sort((H, u) => {
      ((H = ME(H)), (u = ME(u)));
      let f = e(H),
        d = e(u);
      if (f !== d) return f - d;
      return r.get(H) - r.get(u);
    });
    if (!s.some((H, u) => H !== t[u])) return t;
    return s;
  };
}