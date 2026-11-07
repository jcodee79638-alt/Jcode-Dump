
function Xpe(e) {
  let t = Array.isArray(e) ? e : Symbol.iterator in e ? [...e] : e;
  if (Array.isArray(t)) return Gpe((r) => Km(t.map((s) => s.parse(r))));
  else return Gpe((r) => Km(vv(t, (s) => s.parse(r))));
}