
function za(c, t, e, s) {
  if (c === e) return t <= s;
  const i = c.compareDocumentPosition(e);
  return i & Node.DOCUMENT_POSITION_FOLLOWING ? !0 : i & Node.DOCUMENT_POSITION_PRECEDING ? !1 : null;
}