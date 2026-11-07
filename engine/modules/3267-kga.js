
function kga(e, t) {
  if (e.isBlock || (t.preformattedCode && e.isCode)) return { leading: "", trailing: "" };
  var r = Oga(e.textContent);
  if (r.leadingAscii && zxi("left", e, t)) r.leading = r.leadingNonAscii;
  if (r.trailingAscii && zxi("right", e, t)) r.trailing = r.trailingNonAscii;
  return { leading: r.leading, trailing: r.trailing };
}