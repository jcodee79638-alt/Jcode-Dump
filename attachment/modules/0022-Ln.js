
function Ln(c) {
  (typeof c != "object" || c?.length === void 0) && $("Invalid argument for bytesToString");
  const t = c.length,
    e = 8192;
  if (t < e) return String.fromCharCode.apply(null, c);
  const s = [];
  for (let i = 0; i < t; i += e) {
    const n = Math.min(i + e, t),
      r = c.subarray(i, n);
    s.push(String.fromCharCode.apply(null, r));
  }
  return s.join("");
}