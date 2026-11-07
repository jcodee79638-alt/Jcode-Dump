
function Z(e) {
  return (() => {
    var n = ka(),
      i = n.firstChild;
    return (
      x(
        (s) => {
          var l = e.size ?? 20,
            a = e.size ?? 20,
            c = e.class,
            d = Ca[e.name];
          return (
            l !== s.e && z(n, "width", (s.e = l)),
            a !== s.t && z(n, "height", (s.t = a)),
            c !== s.a && z(n, "class", (s.a = c)),
            d !== s.o && z(i, "d", (s.o = d)),
            s
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 },
      ),
      n
    );
  })();
}