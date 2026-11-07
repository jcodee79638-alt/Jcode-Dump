
function vMn() {
  let e = Rht(),
    t = Gse(e, "..", ".."),
    r = [Gse(t, "target", "release", uxe()), Gse(t, "target", "debug", uxe())];
  for (let s of r) if (Bht(s)) return s;
  return null;
}