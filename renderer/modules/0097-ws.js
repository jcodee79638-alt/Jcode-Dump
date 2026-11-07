
function ws(e) {
  const n = Pe(() => es(e.turn.responses)),
    i = Pe(() => e.current && e.state.status === "busy" && !e.stopped),
    s = () => (e.current ? xi(e.state, e.thinking, e.stopped) : "hidden"),
    l = Pe(() => (i() ? ls(n().activity) : void 0)),
    [a, c] = S(!1);
  let d;
  Ie(() => {
    (i(),
      d?.contains(document.activeElement) &&
        document.activeElement !== d.querySelector("summary") &&
        d.querySelector("summary")?.focus({ preventScroll: !0 }),
      c(!1));
  });
  const f = () => e.state.children;
  return (() => {
    var u = hs();
    return (
      t(
        u,
        r(g, {
          get when() {
            return e.turn.user;
          },
          children: (h) =>
            r(jr, {
              get message() {
                return h();
              },
              get children() {
                return f();
              },
              get openChild() {
                return e.openChild;
              },
            }),
        }),
        null,
      ),
      t(
        u,
        r(g, {
          get when() {
            return n().activity.length || i();
          },
          get children() {
            var h = ds(),
              m = h.firstChild,
              y = m.nextSibling,
              b = d;
            return (
              typeof b == "function" ? Rt(b, h) : (d = h),
              (m.$$click = (j) => {
                (j.preventDefault(), c((w) => !w));
              }),
              t(
                m,
                r(g, {
                  get when() {
                    return G(() => !!i())() && s() !== "hidden";
                  },
                  get fallback() {
                    return (() => {
                      var j = gs(),
                        w = j.firstChild;
                      return (t(j, r(Z, { name: "check", size: 15 }), w), j);
                    })();
                  },
                  get children() {
                    return r(Qa, {
                      get state() {
                        return e.state;
                      },
                      get thinking() {
                        return e.thinking;
                      },
                      get stopped() {
                        return e.stopped;
                      },
                      compact: !0,
                    });
                  },
                }),
                null,
              ),
              t(
                m,
                r(g, {
                  get when() {
                    return n().toolCount;
                  },
                  get children() {
                    var j = os(),
                      w = j.firstChild;
                    return (
                      t(j, () => n().toolCount, w),
                      t(j, () => (n().toolCount === 1 ? "tool call" : "tool calls"), null),
                      j
                    );
                  },
                }),
                null,
              ),
              t(m, r(Z, { name: "down", size: 14 }), null),
              t(
                y,
                r(g, {
                  get when() {
                    return Xr(e.turn.responses).length;
                  },
                  get children() {
                    var j = cs();
                    return (
                      t(
                        j,
                        r(_e, {
                          get each() {
                            return Xr(e.turn.responses);
                          },
                          children: (w) =>
                            (() => {
                              var L = fs(),
                                O = L.firstChild,
                                _ = O.nextSibling;
                              return (
                                t(
                                  L,
                                  r(Z, {
                                    get name() {
                                      return G(() => w.status === "error")()
                                        ? "info"
                                        : w.status === "running"
                                          ? "history"
                                          : "check";
                                    },
                                    size: 14,
                                  }),
                                  O,
                                ),
                                t(O, () => w.label),
                                t(
                                  _,
                                  (() => {
                                    var R = G(() => w.status === "error");
                                    return () =>
                                      R()
                                        ? "Needs attention"
                                        : w.status === "running"
                                          ? "In progress"
                                          : "Observed";
                                  })(),
                                ),
                                x(() => Be(L, w.status)),
                                L
                              );
                            })(),
                        }),
                      ),
                      j
                    );
                  },
                }),
                null,
              ),
              t(
                y,
                r(_e, {
                  get each() {
                    return n().activity.map((j) => j.id);
                  },
                  children: (j) =>
                    r(ss, {
                      get sessionId() {
                        return e.state.chat.id;
                      },
                      get message() {
                        return n().activity.find((w) => w.id === j);
                      },
                      get busy() {
                        return i();
                      },
                      get expanded() {
                        return e.expanded;
                      },
                      get setExpanded() {
                        return e.setExpanded;
                      },
                      get children() {
                        return f();
                      },
                      get openChild() {
                        return e.openChild;
                      },
                      grouped: !0,
                    }),
                }),
                null,
              ),
              x(
                (j) => {
                  var w = !!(i() && !a() && (l()?.tool || l()?.note)),
                    L = a(),
                    O = a(),
                    _ = i() ? "Task in progress — expand activity" : "Task activity — expand details";
                  return (
                    w !== j.e && h.classList.toggle("with-live-progress", (j.e = w)),
                    L !== j.t && (h.open = j.t = L),
                    O !== j.a && z(m, "aria-expanded", (j.a = O)),
                    _ !== j.o && z(m, "aria-label", (j.o = _)),
                    j
                  );
                },
                { e: void 0, t: void 0, a: void 0, o: void 0 },
              ),
              h
            );
          },
        }),
        null,
      ),
      t(
        u,
        r(g, {
          get when() {
            return G(() => !a())() && (l()?.tool || l()?.note);
          },
          get children() {
            var h = us();
            return (
              t(
                h,
                r(g, {
                  get when() {
                    return l()?.tool;
                  },
                  children: (m) =>
                    (() => {
                      var y = vs(),
                        b = y.firstChild;
                      return (
                        t(
                          y,
                          r(Z, {
                            get name() {
                              return m().icon;
                            },
                            size: 14,
                          }),
                          b,
                        ),
                        t(b, () => m().label),
                        y
                      );
                    })(),
                }),
                null,
              ),
              t(
                h,
                r(g, {
                  get when() {
                    return l()?.note;
                  },
                  children: (m) =>
                    (() => {
                      var y = ms();
                      return (t(y, m), y);
                    })(),
                }),
                null,
              ),
              h
            );
          },
        }),
        null,
      ),
      t(
        u,
        r(g, {
          get when() {
            return n().answer;
          },
          children: (h) => [
            r(jr, {
              get message() {
                return h();
              },
              get children() {
                return f();
              },
              get openChild() {
                return e.openChild;
              },
            }),
            r(g, {
              get when() {
                return n().errors.some((m) => m.id === h().id) || (!i() && h().finish === "error");
              },
              get children() {
                return $s();
              },
            }),
          ],
        }),
        null,
      ),
      t(
        u,
        r(_e, {
          get each() {
            return n().errors;
          },
          children: (h) =>
            (() => {
              var m = ps();
              return (t(m, () => Ke(h.error ?? "The response could not finish.")), m);
            })(),
        }),
        null,
      ),
      u
    );
  })();
}
Oe(["click"]);