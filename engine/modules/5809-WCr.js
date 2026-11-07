
function WCr(e, t) {
  let r = e.searchParams.get(cnH);
  if (r) return Ees(r);
  let s = /^Basic\s+(.+)$/i.exec(t.headers.authorization ?? "");
  if (s) return Ees(s[1]);
  return Jt(RCr());
}