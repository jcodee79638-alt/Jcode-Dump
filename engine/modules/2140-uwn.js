
var uwn = Ie(function (ltc, Awn) {
  var fmo = Vxe(),
    pmo = W2();
  Awn.exports = (e, t, r) => {
    let s = [],
      a = null,
      H = null,
      u = e.sort((L, I) => pmo(L, I, r));
    for (let L of u)
      if (fmo(L, t, r)) {
        if (((H = L), !a)) a = L;
      } else {
        if (H) s.push([a, H]);
        ((H = null), (a = null));
      }
    if (a) s.push([a, null]);
    let f = [];
    for (let [L, I] of s)
      if (L === I) f.push(L);
      else if (!I && L === u[0]) f.push("*");
      else if (!I) f.push(`>=${L}`);
      else if (L === u[0]) f.push(`<=${I}`);
      else f.push(`${L} - ${I}`);
    let d = f.join(" || "),
      _ = typeof t.raw === "string" ? t.raw : String(t);
    return d.length < _.length ? d : t;
  };
});