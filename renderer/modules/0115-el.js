
function el(e) {
  return (() => {
    var n = Ys(),
      i = n.firstChild,
      s = i.firstChild;
    s.firstChild;
    var l = i.nextSibling,
      a = l.firstChild;
    return (
      (s.$$click = () => e.save({ projectsCollapsed: !e.settings.projectsCollapsed })),
      t(s, r(Z, { name: "down", size: 14 }), null),
      t(
        i,
        r(Xe, {
          name: "plus",
          label: "Open a project",
          get onClick() {
            return e.pick;
          },
        }),
        null,
      ),
      t(
        a,
        r(_e, {
          get each() {
            return e.projects;
          },
          get fallback() {
            return Vs();
          },
          children: (c) => r(tl, va(e, { project: c })),
        }),
      ),
      x(
        (c) => {
          var d = !e.settings.projectsCollapsed,
            f = !!e.settings.projectsCollapsed,
            u = e.settings.projectsCollapsed;
          return (
            d !== c.e && z(s, "aria-expanded", (c.e = d)),
            f !== c.t && l.classList.toggle("is-collapsed", (c.t = f)),
            u !== c.a && (l.inert = c.a = u),
            c
          );
        },
        { e: void 0, t: void 0, a: void 0 },
      ),
      n
    );
  })();
}