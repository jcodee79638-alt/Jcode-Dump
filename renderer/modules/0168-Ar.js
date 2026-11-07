
function Ar(e) {
  return r(g, {
    get when() {
      return e.value;
    },
    children: (n) =>
      (() => {
        var i = ah(),
          s = i.firstChild;
        return (
          t(
            i,
            r(Z, {
              get name() {
                return n().error ? "info" : "check";
              },
              size: 18,
            }),
            s,
          ),
          t(s, () => n().text),
          t(
            i,
            r(Xe, {
              name: "close",
              get label() {
                return G(() => !!e.inline)() ? "Dismiss notification" : $.close;
              },
              get onClick() {
                return e.dismiss;
              },
            }),
            null,
          ),
          x(
            (l) => {
              var a = e.inline ? "modal-notice" : "toast",
                c = !!n().error,
                d = n().error ? "alert" : "status";
              return (
                a !== l.e && Be(i, (l.e = a)),
                c !== l.t && i.classList.toggle("error", (l.t = c)),
                d !== l.a && z(i, "role", (l.a = d)),
                l
              );
            },
            { e: void 0, t: void 0, a: void 0 },
          ),
          i
        );
      })(),
  });
}