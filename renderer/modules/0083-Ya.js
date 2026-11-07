
function Ya(e) {
  const n = () =>
      e.block.indexOf(`
`),
    i = () => (n() >= 0 ? e.block.slice(3, n()).trim() : ""),
    s = () => (n() >= 0 ? e.block.slice(n() + 1).replace(/```$/, "") : e.block.slice(3)),
    [l, a] = S(!1),
    [c, d] = S(!1);
  let f;
  Me(() => clearTimeout(f));
  function u() {
    if ((d(!1), !navigator.clipboard)) {
      d(!0);
      return;
    }
    navigator.clipboard.writeText(s()).then(
      () => {
        (a(!0), clearTimeout(f), (f = setTimeout(() => a(!1), 1800)));
      },
      () => d(!0),
    );
  }
  return (() => {
    var h = Ua(),
      m = h.firstChild,
      y = m.firstChild,
      b = y.nextSibling,
      j = b.firstChild,
      w = m.nextSibling,
      L = w.firstChild;
    return (
      t(y, () => i() || "Code"),
      (b.$$click = u),
      t(
        b,
        r(Z, {
          get name() {
            return l() ? "check" : "file";
          },
          size: 13,
        }),
        j,
      ),
      t(j, () => (l() ? "Copied" : "Copy")),
      t(L, s),
      t(
        h,
        r(g, {
          get when() {
            return c();
          },
          get children() {
            return Oa();
          },
        }),
        null,
      ),
      x(
        (O) => {
          var _ = l() ? "Copied code" : "Copy code",
            R = i() ? `${i()} code` : "Code";
          return (_ !== O.e && z(b, "aria-label", (O.e = _)), R !== O.t && z(w, "aria-label", (O.t = R)), O);
        },
        { e: void 0, t: void 0 },
      ),
      h
    );
  })();
}