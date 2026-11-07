
function ODa(e) {
  if (!WSt.test(e)) return !1;
  let t = e.replace(/[-_]/g, (s) => (s === "-" ? "+" : "/")),
    r = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return Iji(r);
}