
function Si(e) {
  return (() => {
    var n = Xs(),
      i = n.firstChild,
      s = i.firstChild,
      l = s.nextSibling;
    return (
      _t(n, "click", e.open),
      t(n, r(Z, { name: "chat", size: 16 }), i),
      t(s, () => e.chat.title || "Untitled chat"),
      t(l, () => ki(e.chat.updatedAt)),
      x(
        (a) => {
          var c = !!e.active,
            d = e.active ? "page" : void 0,
            f = e.chat.title;
          return (
            c !== a.e && n.classList.toggle("selected", (a.e = c)),
            d !== a.t && z(n, "aria-current", (a.t = d)),
            f !== a.a && z(n, "title", (a.a = f)),
            a
          );
        },
        { e: void 0, t: void 0, a: void 0 },
      ),
      n
    );
  })();
}
Oe(["click"]);