
function di(e) {
  return (() => {
    var n = gh(),
      i = n.firstChild,
      s = i.firstChild,
      l = s.nextSibling,
      a = l.firstChild,
      c = a.nextSibling,
      d = i.nextSibling,
      f = d.firstChild,
      u = d.nextSibling,
      h = u.firstChild;
    return (
      t(s, () => e.label),
      t(l, () => Hn(e.usage.remainingPercent), a),
      t(c, () => $.remaining),
      t(u, () => $.resetsIn, h),
      t(u, () => Bn(e.usage.resetAt, e.now), null),
      x((m) => _i(f, "width", Hn(e.usage.remainingPercent))),
      n
    );
  })();
}
Oe(["click", "input", "keydown", "focusout"]);
ba(() => r(vh, {}), document.getElementById("root"));
