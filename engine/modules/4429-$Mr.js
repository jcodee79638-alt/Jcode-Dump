
function $Mr(e, t) {
  let r = e.headers.get("WWW-Authenticate");
  if (!r) return null;
  let s = new RegExp(`${t}=(?:"([^"]+)"|([^\\s,]+))`),
    a = r.match(s);
  if (a) return a[1] || a[2];
  return null;
}