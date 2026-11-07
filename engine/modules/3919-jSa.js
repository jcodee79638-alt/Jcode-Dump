
function jSa({ data: e, signatures: t }) {
  let r = bSa(e),
    s = typeof r === "string" ? IX(r.substring(0, Math.min(r.length, 24))) : r;
  for (let a of t)
    if (s.length >= a.bytesPrefix.length && a.bytesPrefix.every((H, u) => H === null || s[u] === H))
      return a.mediaType;
  return;
}