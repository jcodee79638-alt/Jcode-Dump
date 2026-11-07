
function Va(e) {
  const [n, i] = S({}),
    [s, l] = S({}),
    a = () =>
      e.request.questions.map((c, d) => [
        ...(n()[d] ?? []),
        ...(c.custom && s()[d]?.trim() ? [s()[d].trim()] : []),
      ]);
  return (() => {
    var c = Fa(),
      d = c.firstChild,
      f = d.firstChild,
      u = d.nextSibling,
      h = u.firstChild,
      m = h.nextSibling;
    return (
      t(d, r(Z, { name: "chat" }), f),
      t(f, () => $.questionTitle),
      t(
        c,
        r(_e, {
          get each() {
            return e.request.questions;
          },
          children: (y, b) =>
            (() => {
              var j = Ba(),
                w = j.firstChild,
                L = w.firstChild,
                O = w.nextSibling;
              return (
                t(L, () => y.header),
                t(w, () => y.question, null),
                t(
                  O,
                  r(_e, {
                    get each() {
                      return y.options;
                    },
                    children: (_) =>
                      (() => {
                        var R = Ha(),
                          A = R.firstChild,
                          J = A.nextSibling,
                          D = J.firstChild,
                          B = D.nextSibling;
                        return (
                          A.addEventListener("change", (H) =>
                            i((V) => ({
                              ...V,
                              [b()]: y.multiple
                                ? H.currentTarget.checked
                                  ? [...(V[b()] ?? []), _.label]
                                  : (V[b()] ?? []).filter((E) => E !== _.label)
                                : [_.label],
                            })),
                          ),
                          t(D, () => _.label),
                          t(B, () => _.description),
                          x(
                            (H) => {
                              var V = y.multiple ? "checkbox" : "radio",
                                E = `${e.request.id}-${b()}`;
                              return (
                                V !== H.e && z(A, "type", (H.e = V)),
                                E !== H.t && z(A, "name", (H.t = E)),
                                H
                              );
                            },
                            { e: void 0, t: void 0 },
                          ),
                          x(() => (A.checked = n()[b()]?.includes(_.label) ?? !1)),
                          R
                        );
                      })(),
                  }),
                ),
                t(
                  j,
                  r(g, {
                    get when() {
                      return y.custom;
                    },
                    get children() {
                      var _ = Ja();
                      return (
                        (_.$$input = (R) => l((A) => ({ ...A, [b()]: R.currentTarget.value }))),
                        x(
                          (R) => {
                            var A = $.customAnswer,
                              J = $.customAnswer;
                            return (
                              A !== R.e && z(_, "aria-label", (R.e = A)),
                              J !== R.t && z(_, "placeholder", (R.t = J)),
                              R
                            );
                          },
                          { e: void 0, t: void 0 },
                        ),
                        x(() => (_.value = s()[b()] ?? "")),
                        _
                      );
                    },
                  }),
                  null,
                ),
                j
              );
            })(),
        }),
        u,
      ),
      (h.$$click = () => e.submit(void 0, !0)),
      t(h, () => $.skip),
      (m.$$click = () => e.submit(a())),
      t(
        m,
        (() => {
          var y = G(() => !!e.busy);
          return () => (y() ? $.loading : $.answer);
        })(),
      ),
      x(
        (y) => {
          var b = $.questionTitle,
            j = e.busy,
            w = e.busy || a().some((L) => L.length === 0);
          return (
            b !== y.e && z(c, "aria-label", (y.e = b)),
            j !== y.t && (h.disabled = y.t = j),
            w !== y.a && (m.disabled = y.a = w),
            y
          );
        },
        { e: void 0, t: void 0, a: void 0 },
      ),
      c
    );
  })();
}
Oe(["click", "input"]);