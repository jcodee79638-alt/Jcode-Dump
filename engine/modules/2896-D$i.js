
var D$i = Ie(function (j$c, I$i) {
  var O1t = (e) => !!e && !Array.isArray(e) && typeof e === "object",
    wHa = (e, t, r) =>
      r.includes(e) && !r.includes(t)
        ? -1
        : r.includes(t) && !r.includes(e)
          ? 1
          : r.includes(e) && r.includes(t)
            ? r.indexOf(e) - r.indexOf(t)
            : e.localeCompare(t, "en"),
    kHa = (e, t) => (r, s) => {
      let a = Array.isArray(e) ? e : [];
      if (typeof e === "function") s = e(r, s);
      if (!O1t(s)) return s;
      if (t.has(s)) return t.get(s);
      let H = Object.entries(s)
        .sort(([u, f], [d, _]) => (O1t(f) === O1t(_) ? wHa(u, d, a) : O1t(f) ? 1 : -1))
        .reduce((u, [f, d]) => ((u[f] = d), u), {});
      return (t.set(s, H), H);
    };
  I$i.exports = (e, t, r = 2) =>
    JSON.stringify(e, kHa(t, new Map()), r) +
    (r
      ? `
`
      : "");
});