
function Wtn(e) {
  return LW((t, r) => {
    if (t.length !== r.length) return !1;
    for (let s = 0; s < t.length; s++) if (!e[s](t[s], r[s])) return !1;
    return !0;
  });
}