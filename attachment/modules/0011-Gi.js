
function Gi(c, t = null, e = null) {
  if (!c) return null;
  if (
    e &&
    typeof c == "string" &&
    (e.addDefaultProtocol && c.startsWith("www.") && c.match(/\./g)?.length >= 2 && (c = `http://${c}`),
    e.tryConvertEncoding)
  )
    try {
      c = Nn(c);
    } catch {}
  const s = t ? URL.parse(c, t) : URL.parse(c);
  return On(s) ? s : null;
}