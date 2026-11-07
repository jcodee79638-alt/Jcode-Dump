
function zDa(e) {
  let t = e.allOf;
  if (!Array.isArray(t) || t.length < 2) return;
  for (let a of JPi) if (a in e) return;
  let r = t.filter((a) => qPi.some((H) => Array.isArray(a[H]))),
    s = null;
  if (!r.length) s = JEr(t);
  else {
    let a = r[0],
      H = qPi.find((d) => Array.isArray(a[d]));
    if (Object.keys(a).length !== 1) return;
    let u = t.filter((d) => d !== a),
      f = a[H].map((d) => JEr([...u, d]));
    if (f.some((d) => !d)) return;
    s = { [H]: f };
  }
  if (!s) return;
  (delete e.allOf, u5e(e, s));
}