
function Xe(e) {
  return (() => {
    var n = xa();
    return (
      _t(n, "click", e.onClick),
      t(
        n,
        r(Z, {
          get name() {
            return e.name;
          },
        }),
      ),
      x(
        (i) => {
          var s = `icon-button ${e.class ?? ""}`,
            l = e.label,
            a = e.label,
            c = e.pressed,
            d = e.disabled;
          return (
            s !== i.e && Be(n, (i.e = s)),
            l !== i.t && z(n, "title", (i.t = l)),
            a !== i.a && z(n, "aria-label", (i.a = a)),
            c !== i.o && z(n, "aria-pressed", (i.o = c)),
            d !== i.i && (n.disabled = i.i = d),
            i
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 },
      ),
      n
    );
  })();
}
Oe(["click"]);