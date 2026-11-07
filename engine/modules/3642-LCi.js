
function LCi(e, t, r, s, a) {
  let H = !1,
    u = JSON.stringify(e, (f, d) => {
      if (typeof d !== "bigint") return d;
      return ((H = !0), null);
    });
  if (!H) return JSON.parse(u);
  return (LT(t, r, s, a, "BigInt defaults cannot be represented in JSON Schema"), dIr);
}