
function jr(e) {
  return (() => {
    var n = ja(),
      i = n.firstChild,
      s = i.nextSibling;
    return (
      t(
        i,
        r(g, {
          get when() {
            return e.message.role === "assistant";
          },
          get children() {
            return Sa();
          },
        }),
        null,
      ),
      t(
        i,
        (() => {
          var l = G(() => e.message.role === "user");
          return () => (l() ? $.user : $.assistant);
        })(),
        null,
      ),
      t(
        s,
        r(_e, {
          get each() {
            return e.message.parts.map((l) => l.id);
          },
          children: (l) => {
            const a = () => e.message.parts.find((c) => c.id === l);
            return [
              r(g, {
                get when() {
                  return G(() => a().type === "text")() && a().text;
                },
                get children() {
                  return r(Wa, {
                    get text() {
                      return a().text;
                    },
                  });
                },
              }),
              r(g, {
                get when() {
                  return a().type === "file";
                },
                get children() {
                  var c = Ta(),
                    d = c.firstChild;
                  return (
                    t(c, r(Z, { name: "file", size: 16 }), d),
                    t(d, () => a().filename ?? $.attachments),
                    c
                  );
                },
              }),
              r(g, {
                get when() {
                  return a().type === "tool";
                },
                get children() {
                  var c = Pa(),
                    d = c.firstChild,
                    f = d.firstChild,
                    u = f.nextSibling;
                  return (
                    t(
                      f,
                      r(Z, {
                        get name() {
                          return G(() => a().status === "error")()
                            ? "info"
                            : a().status === "completed"
                              ? "check"
                              : "history";
                        },
                        size: 14,
                      }),
                    ),
                    t(u, () => a().title ?? a().tool ?? $.tool),
                    t(d, r(Z, { name: "down", size: 14 }), null),
                    t(
                      c,
                      r(g, {
                        get when() {
                          return a().output;
                        },
                        get children() {
                          var h = Aa();
                          return (t(h, () => a().output), h);
                        },
                      }),
                      null,
                    ),
                    t(
                      c,
                      r(g, {
                        get when() {
                          return a().error;
                        },
                        get children() {
                          var h = Gr();
                          return (t(h, () => a().error), h);
                        },
                      }),
                      null,
                    ),
                    t(
                      c,
                      r(g, {
                        get when() {
                          return (
                            G(() => !!a().childSessionId)() &&
                            e.children.some((h) => h.id === a().childSessionId)
                          );
                        },
                        get children() {
                          var h = Ea();
                          return (
                            (h.$$click = () => e.openChild(a().childSessionId)),
                            t(h, () => $.child, null),
                            t(h, r(Z, { name: "chevron", size: 14 }), null),
                            h
                          );
                        },
                      }),
                      null,
                    ),
                    x(
                      (h) => {
                        var m = a().status === "error",
                          y = `tool-state ${a().status ?? ""}`,
                          b = a().status ?? "Tool";
                        return (
                          m !== h.e && (c.open = h.e = m),
                          y !== h.t && Be(f, (h.t = y)),
                          b !== h.a && z(f, "aria-label", (h.a = b)),
                          h
                        );
                      },
                      { e: void 0, t: void 0, a: void 0 },
                    ),
                    c
                  );
                },
              }),
              r(g, {
                get when() {
                  return G(() => a().type === "step")() && a().title;
                },
                get children() {
                  var c = Ra();
                  return (t(c, r(Z, { name: "check", size: 14 }), null), t(c, () => a().title, null), c);
                },
              }),
            ];
          },
        }),
        null,
      ),
      t(
        s,
        r(g, {
          get when() {
            return e.message.error;
          },
          get children() {
            var l = Gr();
            return (t(l, () => e.message.error), l);
          },
        }),
        null,
      ),
      x(
        (l) => {
          var a = `message message-${e.message.role}`,
            c = e.message.id;
          return (a !== l.e && Be(n, (l.e = a)), c !== l.t && z(n, "data-message-id", (l.t = c)), l);
        },
        { e: void 0, t: void 0 },
      ),
      n
    );
  })();
}