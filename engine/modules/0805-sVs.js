
function sVs(e) {
  let t = Object.keys(e),
    r = Object.fromEntries(t.map((s) => [s, iVs(s)]));
  return { values: r, make: (s) => (a) => Ll({ ...a, tag: r[s] }) };
}