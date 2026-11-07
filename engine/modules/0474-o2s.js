
function o2s(e) {
  if (e.includes("%")) e = e.replace(t2s, "%25");
  if (e.includes("\\")) e = e.replace(r2s, "%5C");
  if (
    e.includes(`
`)
  )
    e = e.replace(n2s, "%0A");
  if (e.includes("\r")) e = e.replace(i2s, "%0D");
  if (e.includes("\t")) e = e.replace(s2s, "%09");
  return e;
}