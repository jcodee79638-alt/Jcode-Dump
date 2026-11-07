
function $a(c, t) {
  return c === t ? 0 : c.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}