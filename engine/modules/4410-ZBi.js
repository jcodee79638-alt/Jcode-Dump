
function ZBi({ requestedResource: e, configuredResource: t }) {
  let r = typeof e === "string" ? new URL(e) : new URL(e.href),
    s = typeof t === "string" ? new URL(t) : new URL(t.href);
  if (r.origin !== s.origin) return !1;
  if (r.pathname.length < s.pathname.length) return !1;
  let a = r.pathname.endsWith("/") ? r.pathname : r.pathname + "/",
    H = s.pathname.endsWith("/") ? s.pathname : s.pathname + "/";
  return a.startsWith(H);
}