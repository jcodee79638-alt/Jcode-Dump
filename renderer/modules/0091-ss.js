
function ss(e) {
  const n = Pe(() => ({
      ...e.message,
      error: e.grouped ? void 0 : e.message.error,
      parts: e.message.parts.filter((a) => a.type === "text" || a.type === "file"),
    })),
    i = Pe(() => (e.message.role === "assistant" ? e.message.parts.filter((a) => a.type === "tool") : [])),
    s = Pe(() => e.busy && i().some((a) => a.status === "pending" || a.status === "running")),
    l = (a) => JSON.stringify([e.sessionId, e.message.id, a ?? null]);
  return [
    r(g, {
      get when() {
        return n().parts.length || n().error;
      },
      get children() {
        return r(jr, {
          get message() {
            return n();
          },
          get children() {
            return e.children;
          },
          get openChild() {
            return e.openChild;
          },
        });
      },
    }),
    r(g, {
      get when() {
        return i().length;
      },
      get children() {
        var a = ts(),
          c = a.firstChild,
          d = c.firstChild,
          f = c.nextSibling;
        return (
          (c.$$click = (u) => {
            (u.preventDefault(), e.setExpanded(l(), !e.expanded(l())));
          }),
          t(
            c,
            r(Z, {
              get name() {
                return s() ? "history" : "check";
              },
              size: 14,
            }),
            d,
          ),
          t(c, r(Z, { name: "down", size: 14 }), null),
          t(
            f,
            r(_e, {
              get each() {
                return i().map((u) => u.id);
              },
              children: (u) => {
                const h = () => i().find((m) => m.id === u);
                return (() => {
                  var m = as(),
                    y = m.firstChild,
                    b = y.firstChild,
                    j = b.nextSibling;
                  return (
                    (y.$$click = (w) => {
                      (w.preventDefault(), e.setExpanded(l(u), !e.expanded(l(u))));
                    }),
                    t(
                      b,
                      r(Z, {
                        get name() {
                          return G(() => h().status === "completed")()
                            ? "check"
                            : h().status === "error"
                              ? "info"
                              : "history";
                        },
                        size: 14,
                      }),
                    ),
                    t(j, () => h().title ?? h().tool ?? $.tool),
                    t(y, r(Z, { name: "down", size: 14 }), null),
                    t(
                      m,
                      r(g, {
                        get when() {
                          return h().output;
                        },
                        get children() {
                          var w = ns();
                          return (t(w, () => h().output), w);
                        },
                      }),
                      null,
                    ),
                    t(
                      m,
                      r(g, {
                        get when() {
                          return h().error;
                        },
                        get children() {
                          var w = rs();
                          return (t(w, () => h().error), w);
                        },
                      }),
                      null,
                    ),
                    t(
                      m,
                      r(g, {
                        get when() {
                          return (
                            G(() => !!h().childSessionId)() &&
                            e.children.some((w) => w.id === h().childSessionId)
                          );
                        },
                        get children() {
                          var w = is();
                          return (
                            (w.$$click = () => e.openChild(h().childSessionId)),
                            t(w, () => $.child, null),
                            t(w, r(Z, { name: "chevron", size: 14 }), null),
                            w
                          );
                        },
                      }),
                      null,
                    ),
                    x(
                      (w) => {
                        var L = e.expanded(l(u)),
                          O = e.expanded(l(u)),
                          _ = `tool-state ${h().status ?? ""}`,
                          R = h().status ?? "Tool";
                        return (
                          L !== w.e && (m.open = w.e = L),
                          O !== w.t && z(y, "aria-expanded", (w.t = O)),
                          _ !== w.a && Be(b, (w.a = _)),
                          R !== w.o && z(b, "aria-label", (w.o = R)),
                          w
                        );
                      },
                      { e: void 0, t: void 0, a: void 0, o: void 0 },
                    ),
                    m
                  );
                })();
              },
            }),
          ),
          x(
            (u) => {
              var h = !!e.grouped,
                m = e.grouped ? "Tool activity" : "Thinking activity",
                y = e.grouped || e.expanded(l()),
                b = e.grouped || e.expanded(l());
              return (
                h !== u.e && a.classList.toggle("grouped-tools", (u.e = h)),
                m !== u.t && z(a, "aria-label", (u.t = m)),
                y !== u.a && (a.open = u.a = y),
                b !== u.o && z(c, "aria-expanded", (u.o = b)),
                u
              );
            },
            { e: void 0, t: void 0, a: void 0, o: void 0 },
          ),
          a
        );
      },
    }),
  ];
}
Oe(["click"]);