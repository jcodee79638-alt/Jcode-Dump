
function HnH(e) {
  let r = new URL(e.url, "http://localhost").searchParams.get(onH);
  if (r) return $es(r);
  let s = /^Basic\s+(.+)$/i.exec(e.headers.authorization ?? "");
  if (s) return $es(s[1]);
  return Jt(FCr());
}