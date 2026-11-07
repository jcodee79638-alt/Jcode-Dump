
function ypt(e, t = !1) {
  if (typeof e !== "string") return Dpt;
  let r = e.indexOf(";"),
    s = r !== -1 ? e.slice(0, r).trim() : e.trim();
  if ((t ? ORs : kRs).test(s) === !1) return Dpt;
  let H = { value: s.toLowerCase(), parameters: Object.create(null) };
  if (r === -1) return H;
  let u, f, d;
  Kun.lastIndex = r;
  while ((f = Kun.exec(e))) {
    if (f.index !== r) return Dpt;
    if (((r += f[0].length), (u = f[1].toLowerCase()), (d = f[2]), d[0] === '"'))
      ((d = d.slice(1, d.length - 1)), !t && zun.test(d) && (d = d.replace(zun, "$1")));
    H.parameters[u] = d;
  }
  if (r !== e.length) return Dpt;
  return H;
}