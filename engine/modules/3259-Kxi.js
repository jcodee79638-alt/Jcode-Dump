
function Kxi(e, t, r) {
  if ((e && e.parentNode === t) || r(t)) return t.nextSibling || t.parentNode;
  return t.firstChild || t.nextSibling || t.parentNode;
}