
function O4a(e, t, r) {
  let s = e.split(`
`);
  if (s.length <= t && Buffer.byteLength(e, "utf-8") <= r) return { text: e, cut: !1 };
  let a = [],
    H = 0;
  for (let u = s.length - 1; u >= 0 && a.length < t; u--) {
    let f = Buffer.byteLength(s[u], "utf-8") + (a.length > 0 ? 1 : 0);
    if (H + f > r) {
      if (a.length === 0) {
        let d = Buffer.from(s[u], "utf-8"),
          _ = d.length - r;
        if (_ < 0) _ = 0;
        while (_ < d.length && (d[_] & 192) === 128) _++;
        a.unshift(d.subarray(_).toString("utf-8"));
      }
      break;
    }
    (a.unshift(s[u]), (H += f));
  }
  return {
    text: a.join(`
`),
    cut: !0,
  };
}