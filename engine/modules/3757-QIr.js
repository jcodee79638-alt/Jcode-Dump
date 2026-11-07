
function QIr(e) {
  let t = e.split(".").map(Number),
    [r, s, a] = t;
  if (r === 0) return !0;
  if (r === 10) return !0;
  if (r === 100 && s >= 64 && s <= 127) return !0;
  if (r === 127) return !0;
  if (r === 169 && s === 254) return !0;
  if (r === 172 && s >= 16 && s <= 31) return !0;
  if (r === 192 && s === 0 && a === 0) return !0;
  if (r === 192 && s === 168) return !0;
  if (r === 198 && (s === 18 || s === 19)) return !0;
  if (r >= 240) return !0;
  return !1;
}