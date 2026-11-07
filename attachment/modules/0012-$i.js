
function $i(c, t, e = !1) {
  const s = URL.parse(c);
  return s
    ? ((s.hash = t), s.href)
    : e && Gi(c, "http://example.com")
      ? c.split("#", 1)[0] + `${t ? `#${t}` : ""}`
      : "";
}