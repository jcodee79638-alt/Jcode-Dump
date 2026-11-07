
function Vo(e) {
  const [n, i] = S(),
    [s, l] = S(),
    [a, c] = S(),
    [d, f] = S(!1),
    [u, h] = S(""),
    [m, y] = S(),
    [b, j] = S(),
    [w, L] = S(!1),
    O = Pe(() => e.task.id),
    _ = () => e.tasks.filter((J) => J.id !== e.task.id && J.state !== "running" && J.checkpoint.available),
    R = (J) => a()?.actions.includes(J),
    A = () =>
      e.issue ||
      e.task.needsAttention ||
      ["failed", "interrupted", "cancelled"].includes(e.task.state) ||
      (a()?.connection.state !== void 0 && a()?.connection.state !== "connected");
  return (
    Ie(() => {
      (O(), h(""), y(void 0), j(void 0), L(!1), i(void 0), l(void 0), c(void 0));
    }),
    Ie(() => {
      const J = e.task;
      let D = !1;
      (f(!1),
        Promise.all([
          Promise.resolve().then(() => window.jac.taskTimeline({ id: J.id })),
          Promise.resolve().then(() => window.jac.completionReview({ id: J.id })),
          Promise.resolve().then(() => window.jac.recoverTask({ id: J.id })),
        ])
          .then((B) => {
            D || (i(B[0]), l(B[1]), c(B[2]));
          })
          .catch(() => {
            D || f(!0);
          }),
        Me(() => {
          D = !0;
        }));
    }),
    [
      r(g, {
        get when() {
          return A();
        },
        get children() {
          var J = $o(),
            D = J.firstChild,
            B = D.nextSibling,
            H = B.nextSibling,
            V = H.firstChild;
          return (
            t(J, r(Z, { name: "history", size: 21 }), D),
            t(D, () =>
              e.task.needsAttention || a()?.outcome === "needs_attention"
                ? "Your answer or permission is needed"
                : "Review saved progress",
            ),
            t(
              B,
              (() => {
                var E = G(() => a()?.connection.state === "reconnecting");
                return () =>
                  E()
                    ? "Live output is reconnecting. Refresh or reconnect to observe existing work."
                    : G(() => a()?.connection.state === "stopped")()
                      ? "The engine stopped. Refresh the saved conversation before continuing."
                      : e.task.state === "running"
                        ? "This task is still active. Refresh to review questions and permission requests in the conversation."
                        : "The conversation and files are saved. Inspect recorded work before sending a new continuation.";
              })(),
            ),
            (V.$$click = () => {
              e.act(e.refresh);
            }),
            t(
              H,
              r(g, {
                get when() {
                  return a()?.connection.state === "reconnecting";
                },
                get children() {
                  var E = uo();
                  return (
                    (E.$$click = () => {
                      e.act(async () => {
                        (e.reconnect && (await e.reconnect()),
                          e.reconnect ||
                            (await window.jac.reconnect({
                              id: e.task.sessionId,
                              directory: e.task.directory,
                            })),
                          await e.refresh());
                      });
                    }),
                    x(() => (E.disabled = e.pending)),
                    E
                  );
                },
              }),
              null,
            ),
            t(
              H,
              r(g, {
                get when() {
                  return R("answer");
                },
                get children() {
                  var E = ho();
                  return (
                    (E.$$click = () => {
                      e.act(e.answer);
                    }),
                    x(() => (E.disabled = e.pending)),
                    E
                  );
                },
              }),
              null,
            ),
            t(
              H,
              r(g, {
                get when() {
                  return G(() => !!R("usage"))() && e.usage;
                },
                get children() {
                  var E = go();
                  return (_t(E, "click", e.usage), x(() => (E.disabled = e.pending)), E);
                },
              }),
              null,
            ),
            t(
              H,
              r(g, {
                get when() {
                  return G(() => !!R("sign_in"))() && e.signIn;
                },
                get children() {
                  var E = fo();
                  return (_t(E, "click", e.signIn), x(() => (E.disabled = e.pending)), E);
                },
              }),
              null,
            ),
            t(
              H,
              r(g, {
                get when() {
                  return G(() => !!R("update"))() && e.update;
                },
                get children() {
                  var E = vo();
                  return (_t(E, "click", e.update), x(() => (E.disabled = e.pending)), E);
                },
              }),
              null,
            ),
            t(
              H,
              r(g, {
                get when() {
                  return (
                    G(() => e.state?.status === "idle")() &&
                    ["failed", "interrupted", "cancelled"].includes(e.task.state)
                  );
                },
                get children() {
                  var E = mo();
                  return (
                    (E.$$click = () => {
                      e.act(() => e.prompt(Ti));
                    }),
                    x(() => (E.disabled = e.pending || !e.canSend || a()?.connection.state === "stopped")),
                    E
                  );
                },
              }),
              null,
            ),
            x(() => (V.disabled = e.pending)),
            J
          );
        },
      }),
      (() => {
        var J = po(),
          D = J.firstChild,
          B = D.firstChild,
          H = B.nextSibling;
        return (
          D.nextSibling,
          t(
            H,
            (() => {
              var V = G(() => s()?.state === "verified");
              return () => (V() ? "Verified" : s()?.state === "failed" ? "Failed checks" : "Incomplete");
            })(),
          ),
          t(
            J,
            r(g, {
              get when() {
                return s();
              },
              get fallback() {
                return So();
              },
              children: (V) => [
                r(g, {
                  get when() {
                    return V().expected.length;
                  },
                  get fallback() {
                    return Eo();
                  },
                  get children() {
                    var E = jo();
                    return (
                      t(
                        E,
                        r(_e, {
                          get each() {
                            return V().expected;
                          },
                          children: (me) =>
                            (() => {
                              var P = Po(),
                                v = P.firstChild,
                                M = v.nextSibling;
                              return (
                                t(v, me),
                                t(M, () => (V().missing.includes(me) ? "Missing or unverified" : "Passed")),
                                P
                              );
                            })(),
                        }),
                      ),
                      E
                    );
                  },
                }),
                r(g, {
                  get when() {
                    return V().missing.length;
                  },
                  get children() {
                    return [
                      (() => {
                        var E = To(),
                          me = E.firstChild,
                          P = me.nextSibling;
                        return (
                          P.nextSibling,
                          t(E, () => V().missing.length, me),
                          t(
                            E,
                            () => (V().missing.length === 1 ? "check still needs" : "checks still need"),
                            P,
                          ),
                          E
                        );
                      })(),
                      (() => {
                        var E = Ao();
                        return (
                          (E.$$click = () => {
                            e.act(() =>
                              e.prompt(
                                `Inspect the current saved files and actual check results before doing more work. Verify these missing expected checks, one command per tool call: ${V().missing.join("; ")}. Report their actual exit results. Do not repeat external side effects.`,
                              ),
                            );
                          }),
                          x(() => (E.disabled = e.pending || !e.canSend || e.state?.status !== "idle")),
                          E
                        );
                      })(),
                    ];
                  },
                }),
              ],
            }),
            null,
          ),
          x(() => Be(H, `completion-state ${s()?.state ?? "incomplete"}`)),
          J
        );
      })(),
      (() => {
        var J = wo(),
          D = J.firstChild,
          B = D.firstChild,
          H = B.nextSibling,
          V = H.firstChild,
          E = D.nextSibling,
          me = E.firstChild,
          P = me.nextSibling,
          v = P.nextSibling;
        return (
          t(H, () => n()?.events.length ?? 0, V),
          t(
            v,
            r(_e, {
              get each() {
                return n()?.events;
              },
              get fallback() {
                return Ro();
              },
              children: (M) =>
                (() => {
                  var N = qo(),
                    re = N.firstChild,
                    F = re.nextSibling,
                    p = F.firstChild,
                    ee = p.nextSibling;
                  return (
                    t(re, () =>
                      new Date(M.at).toLocaleTimeString(void 0, {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }),
                    ),
                    t(p, () => M.label),
                    t(
                      F,
                      r(g, {
                        get when() {
                          return M.path;
                        },
                        get children() {
                          var ie = Io();
                          return (t(ie, () => M.path), ie);
                        },
                      }),
                      ee,
                    ),
                    t(
                      ee,
                      (() => {
                        var ie = G(() => M.status === "running");
                        return () =>
                          ie()
                            ? "Observed running"
                            : G(() => M.status === "passed")()
                              ? "Completed"
                              : M.status === "failed"
                                ? "Failed"
                                : "Unknown";
                      })(),
                    ),
                    x(
                      (ie) => {
                        var te = `timeline-event ${M.status}`,
                          U = new Date(M.at).toISOString();
                        return (
                          te !== ie.e && Be(N, (ie.e = te)),
                          U !== ie.t && z(re, "datetime", (ie.t = U)),
                          ie
                        );
                      },
                      { e: void 0, t: void 0 },
                    ),
                    N
                  );
                })(),
            }),
          ),
          t(
            E,
            r(g, {
              get when() {
                return n()?.truncated;
              },
              get children() {
                return bo();
              },
            }),
            null,
          ),
          J
        );
      })(),
      (() => {
        var J = _o(),
          D = J.firstChild,
          B = D.nextSibling,
          H = B.nextSibling,
          V = H.firstChild,
          E = V.nextSibling;
        E.firstChild;
        var me = H.nextSibling;
        return (
          E.addEventListener("change", (P) => {
            (h(P.currentTarget.value), y(void 0));
          }),
          t(
            E,
            r(_e, {
              get each() {
                return _();
              },
              children: (P) =>
                (() => {
                  var v = Ai(),
                    M = v.firstChild;
                  return (
                    t(v, () => P.title, M),
                    t(v, () => new Date(P.startedAt).toLocaleDateString(), null),
                    x(() => (v.value = P.id)),
                    v
                  );
                })(),
            }),
            null,
          ),
          (me.$$click = () => {
            e.act(async () => y(await window.jac.compareTasks({ left: e.task.id, right: u() })));
          }),
          t(
            J,
            r(g, {
              get when() {
                return m();
              },
              children: (P) =>
                (() => {
                  var v = Mo(),
                    M = v.firstChild,
                    N = M.firstChild;
                  N.firstChild;
                  var re = N.nextSibling;
                  re.firstChild;
                  var F = M.nextSibling;
                  return (
                    t(N, () => P().left.title, null),
                    t(re, () => P().right.title, null),
                    t(
                      v,
                      r(_e, {
                        get each() {
                          return P().files;
                        },
                        get fallback() {
                          return Do();
                        },
                        children: (p) =>
                          (() => {
                            var ee = No(),
                              ie = ee.firstChild,
                              te = ie.firstChild;
                            return (
                              t(ie, () => p.path, te),
                              t(te, () => (p.identical ? "Identical" : "Different")),
                              t(
                                ee,
                                r(ji, {
                                  get diff() {
                                    return {
                                      path: p.path,
                                      before: p.left,
                                      after: p.right,
                                      patch: p.patch,
                                      canStage: !1,
                                      canRestore: !1,
                                      fingerprint: "",
                                    };
                                  },
                                }),
                                null,
                              ),
                              ee
                            );
                          })(),
                      }),
                      F,
                    ),
                    t(
                      v,
                      r(_e, {
                        get each() {
                          return P().checks;
                        },
                        get fallback() {
                          return zo();
                        },
                        children: (p) =>
                          (() => {
                            var ee = Oo(),
                              ie = ee.firstChild,
                              te = ie.nextSibling,
                              U = te.nextSibling;
                            return (
                              t(ie, () => (p.side === "left" ? "Original" : "Alternative")),
                              t(te, () => p.check.label),
                              t(
                                U,
                                (() => {
                                  var C = G(() => p.check.status === "passed" && p.check.exitCode === 0);
                                  return () =>
                                    C() ? "Passed" : p.check.status === "failed" ? "Failed" : "Unknown";
                                })(),
                              ),
                              x(() => Be(ee, `alternative-check ${p.check.status}`)),
                              ee
                            );
                          })(),
                      }),
                      null,
                    ),
                    t(
                      v,
                      r(g, {
                        get when() {
                          return P().truncated;
                        },
                        get children() {
                          return Lo();
                        },
                      }),
                      null,
                    ),
                    v
                  );
                })(),
            }),
            null,
          ),
          x(
            (P) => {
              var v = e.pending || !_().length,
                M = e.pending || !u() || e.task.state === "running" || !e.task.checkpoint.available;
              return (v !== P.e && (E.disabled = P.e = v), M !== P.t && (me.disabled = P.t = M), P);
            },
            { e: void 0, t: void 0 },
          ),
          x(() => (E.value = u())),
          J
        );
      })(),
      (() => {
        var J = xo(),
          D = J.firstChild,
          B = D.nextSibling,
          H = B.nextSibling,
          V = H.firstChild;
        return (
          (V.$$click = () => {
            e.act(async () => {
              (j(await window.jac.supportReport({ taskId: e.task.id })), L(!1));
            });
          }),
          t(
            H,
            r(g, {
              get when() {
                return b();
              },
              get children() {
                var E = yo();
                return (
                  (E.$$click = () => {
                    e.act(async () => L((await window.jac.exportSupportReport({ taskId: e.task.id })).saved));
                  }),
                  x(() => (E.disabled = e.pending)),
                  E
                );
              },
            }),
            null,
          ),
          t(
            J,
            r(g, {
              get when() {
                return b();
              },
              children: (E) =>
                (() => {
                  var me = Uo(),
                    P = me.firstChild,
                    v = P.nextSibling;
                  return (t(v, () => JSON.stringify(E(), null, 2)), me);
                })(),
            }),
            null,
          ),
          t(
            J,
            r(g, {
              get when() {
                return w();
              },
              get children() {
                return ko();
              },
            }),
            null,
          ),
          x(() => (V.disabled = e.pending)),
          J
        );
      })(),
      r(g, {
        get when() {
          return d();
        },
        get children() {
          return Co();
        },
      }),
    ]
  );
}