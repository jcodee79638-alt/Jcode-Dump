
function Gd(e) {
  const [n, i] = S(),
    s = Pe(() => e.sessionId);
  return (
    Ie(() => {
      const l = s();
      let a = !1;
      (i(void 0),
        l &&
          window.jac
            .tasks({ sessionId: l })
            .then((c) => {
              a || i(c.find((d) => d.sessionId === l)?.id);
            })
            .catch(() => {}),
        Me(() => {
          a = !0;
        }));
    }),
    (() => {
      var l = Vd(),
        a = l.firstChild,
        c = a.firstChild,
        d = c.firstChild,
        f = c.nextSibling,
        u = f.firstChild,
        h = f.nextSibling,
        m = h.firstChild;
      return (
        (c.$$click = () => e.setTab("search")),
        t(c, r(Z, { name: "search", size: 16 }), d),
        (f.$$click = () => e.setTab("project")),
        t(f, r(Z, { name: "folder", size: 16 }), u),
        (h.$$click = () => e.setTab("queue")),
        t(h, r(Z, { name: "history", size: 16 }), m),
        t(
          l,
          r(g, {
            get when() {
              return e.tab === "queue";
            },
            get children() {
              return r(Od, {
                get sessionId() {
                  return e.sessionId;
                },
                get onOpen() {
                  return e.open;
                },
                get onChanged() {
                  return e.changed;
                },
              });
            },
          }),
          null,
        ),
        t(
          l,
          r(g, {
            get when() {
              return e.tab !== "queue";
            },
            get children() {
              return r(g, {
                get when() {
                  return e.directory;
                },
                get fallback() {
                  return (() => {
                    var y = Kd(),
                      b = y.firstChild;
                    return (t(y, r(Z, { name: "folder", size: 28 }), b), y);
                  })();
                },
                children: (y) => [
                  r(g, {
                    get when() {
                      return e.tab === "search";
                    },
                    get children() {
                      return r(Yd, {
                        get directory() {
                          return y();
                        },
                        onSelect: (b, j) =>
                          e.draft(`Please inspect the project reference ${JSON.stringify(b)} at line ${j}.
Requested change: `),
                      });
                    },
                  }),
                  r(g, {
                    get when() {
                      return e.tab === "project";
                    },
                    get children() {
                      return [
                        r(Cd, {
                          get directory() {
                            return y();
                          },
                          get sessionId() {
                            return e.sessionId;
                          },
                          get taskId() {
                            return n();
                          },
                          get draft() {
                            return e.draft;
                          },
                        }),
                        r(g, {
                          get when() {
                            return e.sessionId;
                          },
                          get children() {
                            var b = Zd();
                            return (
                              b.firstChild,
                              t(
                                b,
                                r(Dc, {
                                  get sessionId() {
                                    return e.sessionId;
                                  },
                                  get directory() {
                                    return y();
                                  },
                                  get draft() {
                                    return e.draft;
                                  },
                                }),
                                null,
                              ),
                              b
                            );
                          },
                        }),
                      ];
                    },
                  }),
                ],
              });
            },
          }),
          null,
        ),
        x(
          (y) => {
            var b = e.tab === "search",
              j = e.tab === "project",
              w = e.tab === "queue";
            return (
              b !== y.e && z(c, "aria-pressed", (y.e = b)),
              j !== y.t && z(f, "aria-pressed", (y.t = j)),
              w !== y.a && z(h, "aria-pressed", (y.a = w)),
              y
            );
          },
          { e: void 0, t: void 0, a: void 0 },
        ),
        l
      );
    })()
  );
}
Oe(["click"]);