
function Wo(e) {
  const [n, i] = S(),
    [s, l] = S([]),
    [a, c] = S(),
    [d, f] = S(""),
    [u, h] = S(!1),
    [m, y] = S(),
    [b, j] = S(),
    [w, L] = S(),
    O = () =>
      s().find((F) => F.id === a() && F.sessionId === e.state?.chat.id) ??
      s().find((F) => F.sessionId === e.state?.chat.id),
    _ = (F) =>
      F.needsAttention ||
      (F.sessionId === e.state?.chat.id && !!(e.state.permissions.length || e.state.questions.length)),
    R = Pe(() => e.state?.status === "busy" || s().some((F) => F.state === "running")),
    A = Pe(() => e.state?.chat.id),
    J = Pe(() => e.directory),
    D = Pe(
      () => `${e.state?.chat.id ?? "new"}
${e.directory ?? ""}`,
    ),
    B = Pe(() => e.openPanel?.revision),
    H = () => (b()?.directory === J() ? b() : void 0),
    V = () => {
      if (
        !(n() === "preview" && (!e.directory || !H() || !w())) &&
        !((n() === "context" && !e.directory) || (n() === "report" && !e.state))
      )
        return n();
    };
  let E = 0,
    me = 0,
    P;
  async function v() {
    const F = e.directory;
    if (!F) return;
    if (P?.directory === F && P.epoch === E) return P.promise;
    if (Date.now() - me < 3e3) return;
    me = Date.now();
    const p = E,
      ee = window.jac
        .previewStatus({ directory: F })
        .then((ie) => {
          p !== E ||
            F !== J() ||
            (j(ie ? { directory: F, path: ie.path } : void 0), !ie && n() === "preview" && i(void 0));
        })
        .catch(() => {
          p !== E || F !== J() || (j(void 0), n() === "preview" && i(void 0));
        })
        .finally(() => {
          P?.promise === ee && (P = void 0);
        });
    return ((P = { directory: F, epoch: p, promise: ee }), ee);
  }
  async function M() {
    await Promise.all([window.jac.tasks().then(l), v()]);
  }
  async function N(F) {
    u() ||
      (h(!0),
      f(""),
      await F()
        .catch((p) => f(Ke(p instanceof Error ? p.message : "The saved task could not be refreshed.")))
        .finally(() => h(!1)));
  }
  function re(F) {
    (F === "preview" && !H()) || (F === "preview" && L(H().path), i((p) => (p === F ? void 0 : F)), f(""));
  }
  return (
    Ie(() => {
      (J(), E++, (me = 0), j(void 0), e.onPreviewAvailable?.(!1), Ze(v));
    }),
    Ie(() => {
      (D(), i(void 0), c(void 0), L(void 0));
    }),
    Ie(() => {
      const F = R() ? 3e3 : 15e3;
      Ze(M).catch((ee) => {
        n() && f(Ke(ee instanceof Error ? ee.message : "Could not refresh saved tasks."));
      });
      const p = setInterval(() => {
        M().catch(() => {});
      }, F);
      Me(() => clearInterval(p));
    }),
    Ie(() => {
      (A(), y(void 0), f(""));
    }),
    Ie(() => {
      e.onPreviewAvailable?.(!!H());
    }),
    Ie(() => {
      B() !== void 0 &&
        Ze(() => {
          const p = e.openPanel?.kind;
          !p ||
            (p === "context" && !e.directory) ||
            (p === "report" && !e.state) ||
            (p === "preview" && !H()) ||
            (p === "preview" && L(H().path), i(p), f(""));
        });
    }),
    Me(() => {
      E++;
    }),
    [
      r(g, {
        get when() {
          return !e.hideToolbar;
        },
        get children() {
          var F = Al(),
            p = F.firstChild,
            ee = p.firstChild,
            ie = p.nextSibling;
          return (
            (p.$$click = () => re("inbox")),
            t(p, r(Z, { name: "history", size: 16 }), ee),
            t(
              p,
              r(g, {
                get when() {
                  return s().filter((te) => _(te) || ["failed", "interrupted"].includes(te.state)).length;
                },
                children: (te) =>
                  (() => {
                    var U = Rl();
                    return (t(U, te), U);
                  })(),
              }),
              null,
            ),
            t(
              F,
              r(g, {
                get when() {
                  return e.state;
                },
                get children() {
                  var te = Sl(),
                    U = te.firstChild;
                  return (
                    (te.$$click = () => re("report")),
                    t(te, r(Z, { name: "check", size: 16 }), U),
                    x(() => z(te, "aria-pressed", n() === "report")),
                    te
                  );
                },
              }),
              ie,
            ),
            t(
              F,
              r(g, {
                get when() {
                  return e.directory;
                },
                get children() {
                  var te = jl(),
                    U = te.firstChild;
                  return (
                    (te.$$click = () => re("context")),
                    t(te, r(Z, { name: "file", size: 16 }), U),
                    x(() => z(te, "aria-pressed", n() === "context")),
                    te
                  );
                },
              }),
              ie,
            ),
            t(
              F,
              r(g, {
                get when() {
                  return H();
                },
                get children() {
                  var te = Tl(),
                    U = te.firstChild;
                  return (
                    (te.$$click = () => re("preview")),
                    t(te, r(Z, { name: "eye", size: 16 }), U),
                    x(() => z(te, "aria-pressed", n() === "preview")),
                    te
                  );
                },
              }),
              ie,
            ),
            x(() => z(p, "aria-pressed", n() === "inbox")),
            F
          );
        },
      }),
      r(g, {
        get when() {
          return e.issue || e.state?.messages.at(-1)?.error;
        },
        get children() {
          var F = Pl(),
            p = F.firstChild,
            ee = p.firstChild,
            ie = ee.nextSibling,
            te = ie.nextSibling;
          te.firstChild;
          var U = p.nextSibling,
            C = U.firstChild;
          return (
            t(F, r(Z, { name: "info", size: 19 }), p),
            t(te, () => O()?.supportId ?? e.state?.chat.id, null),
            (C.$$click = () => {
              N(async () => {
                (await e.refresh(), await M());
              });
            }),
            t(
              U,
              r(g, {
                get when() {
                  return e.state?.status === "idle";
                },
                get children() {
                  var I = El();
                  return (
                    (I.$$click = () => {
                      N(() => e.prompt(Ti));
                    }),
                    x(() => (I.disabled = u() || !e.canSend)),
                    I
                  );
                },
              }),
              null,
            ),
            x(() => (C.disabled = u())),
            F
          );
        },
      }),
      r(g, {
        get when() {
          return V();
        },
        children: (F) =>
          (() => {
            var p = Dl(),
              ee = p.firstChild,
              ie = ee.firstChild,
              te = ie.firstChild;
            return (
              t(
                te,
                (() => {
                  var U = G(() => F() === "inbox");
                  return () =>
                    U()
                      ? "Task inbox"
                      : G(() => F() === "report")()
                        ? "Task report"
                        : F() === "context"
                          ? "Project context"
                          : "Preview";
                })(),
              ),
              t(ee, r(Xe, { name: "close", label: "Close task panel", onClick: () => i(void 0) }), null),
              t(
                p,
                r(g, {
                  get when() {
                    return d();
                  },
                  get children() {
                    var U = Il(),
                      C = U.firstChild,
                      I = C.nextSibling;
                    return (
                      t(U, r(Z, { name: "info", size: 17 }), C),
                      t(C, d),
                      (I.$$click = () => {
                        N(M);
                      }),
                      U
                    );
                  },
                }),
                null,
              ),
              t(
                p,
                r(g, {
                  get when() {
                    return F() === "inbox";
                  },
                  get children() {
                    return [
                      (() => {
                        var U = ql();
                        return (
                          U.firstChild,
                          t(
                            U,
                            r(Xe, {
                              name: "refresh",
                              label: "Refresh task inbox",
                              get disabled() {
                                return u();
                              },
                              onClick: () => {
                                N(M);
                              },
                            }),
                            null,
                          ),
                          U
                        );
                      })(),
                      (() => {
                        var U = Ll();
                        return (
                          t(
                            U,
                            r(_e, {
                              get each() {
                                return s();
                              },
                              get fallback() {
                                return (() => {
                                  var C = Nl(),
                                    I = C.firstChild;
                                  return (t(C, r(Z, { name: "history", size: 28 }), I), C);
                                })();
                              },
                              children: (C) =>
                                (() => {
                                  var I = zl(),
                                    ne = I.firstChild,
                                    se = ne.nextSibling,
                                    ce = se.firstChild,
                                    ae = ce.nextSibling,
                                    de = ae.firstChild,
                                    ve = ae.nextSibling,
                                    ke = ve.firstChild,
                                    le = ke.nextSibling;
                                  return (
                                    le.nextSibling,
                                    (I.$$click = () => {
                                      N(async () => {
                                        (await e.open({ id: C.sessionId, directory: C.directory }),
                                          c(C.id),
                                          i("report"));
                                      });
                                    }),
                                    t(ce, () => C.title),
                                    t(
                                      ae,
                                      (() => {
                                        var be = G(() => !!_(C));
                                        return () => (be() ? "Needs your attention" : br(C.state));
                                      })(),
                                      de,
                                    ),
                                    t(
                                      ae,
                                      () =>
                                        new Date(C.startedAt).toLocaleDateString(void 0, {
                                          month: "short",
                                          day: "numeric",
                                        }),
                                      null,
                                    ),
                                    t(ve, () => C.files.length, ke),
                                    t(ve, () => C.checks.filter((be) => be.status === "passed").length, le),
                                    t(I, r(Z, { name: "chevron", size: 16 }), null),
                                    x(() => Be(ne, `task-state-dot ${_(C) ? "attention" : C.state}`)),
                                    I
                                  );
                                })(),
                            }),
                          ),
                          U
                        );
                      })(),
                    ];
                  },
                }),
                null,
              ),
              t(
                p,
                r(g, {
                  get when() {
                    return F() === "report";
                  },
                  get children() {
                    var U = Ml();
                    return (
                      t(
                        U,
                        r(g, {
                          get when() {
                            return e.state?.chat.branchOf;
                          },
                          children: (C) => [
                            (() => {
                              var I = Ol(),
                                ne = I.firstChild;
                              return (
                                (I.$$click = () => {
                                  N(async () => {
                                    (await e.open(C()), c(void 0));
                                  });
                                }),
                                t(I, r(Z, { name: "back", size: 15 }), ne),
                                I
                              );
                            })(),
                            Ul(),
                          ],
                        }),
                        null,
                      ),
                      t(
                        U,
                        r(g, {
                          get when() {
                            return O();
                          },
                          get fallback() {
                            return (() => {
                              var C = Fl(),
                                I = C.firstChild;
                              return (t(C, r(Z, { name: "check", size: 28 }), I), C);
                            })();
                          },
                          children: (C) => [
                            (() => {
                              var I = Jl(),
                                ne = I.firstChild,
                                se = ne.nextSibling,
                                ce = se.nextSibling,
                                ae = ce.firstChild,
                                de = ae.nextSibling;
                              return (
                                t(
                                  ne,
                                  (() => {
                                    var ve = G(() => !!_(C()));
                                    return () => (ve() ? "Needs your attention" : br(C().state));
                                  })(),
                                ),
                                t(se, () => C().title),
                                t(de, () => C().supportId),
                                x(() => Be(ne, `task-status ${C().state}`)),
                                I
                              );
                            })(),
                            r(g, {
                              get when() {
                                return s().filter((I) => I.sessionId === e.state?.chat.id).length > 1;
                              },
                              get children() {
                                var I = Bl(),
                                  ne = I.firstChild,
                                  se = ne.nextSibling;
                                return (
                                  se.addEventListener("change", (ce) => {
                                    (c(ce.currentTarget.value), y(void 0));
                                  }),
                                  t(
                                    se,
                                    r(_e, {
                                      get each() {
                                        return s().filter((ce) => ce.sessionId === e.state?.chat.id);
                                      },
                                      children: (ce) =>
                                        (() => {
                                          var ae = Ai(),
                                            de = ae.firstChild;
                                          return (
                                            t(ae, () => ce.title, de),
                                            t(ae, () => br(ce.state), null),
                                            x(() => (ae.value = ce.id)),
                                            ae
                                          );
                                        })(),
                                    }),
                                  ),
                                  x(() => (se.value = C().id)),
                                  I
                                );
                              },
                            }),
                            r(Vo, {
                              get task() {
                                return C();
                              },
                              get tasks() {
                                return s();
                              },
                              get state() {
                                return e.state;
                              },
                              get issue() {
                                return e.issue;
                              },
                              get pending() {
                                return u();
                              },
                              get canSend() {
                                return e.canSend;
                              },
                              act: N,
                              refresh: async () => {
                                (await e.refresh(), await M());
                              },
                              get prompt() {
                                return e.prompt;
                              },
                              answer: async () => {
                                (await e.refresh(), i(void 0));
                              },
                              get usage() {
                                return e.usage;
                              },
                              get signIn() {
                                return e.signIn;
                              },
                              get update() {
                                return e.update;
                              },
                              get reconnect() {
                                return e.reconnect;
                              },
                            }),
                            (() => {
                              var I = Wl(),
                                ne = I.firstChild,
                                se = ne.firstChild,
                                ce = se.nextSibling,
                                ae = ce.firstChild;
                              return (
                                ne.nextSibling,
                                t(ce, () => C().checks.filter((de) => de.status === "passed").length, ae),
                                t(
                                  I,
                                  r(_e, {
                                    get each() {
                                      return C().checks;
                                    },
                                    get fallback() {
                                      return Vl();
                                    },
                                    children: (de) =>
                                      (() => {
                                        var ve = Gl(),
                                          ke = ve.firstChild,
                                          le = ke.firstChild,
                                          be = le.nextSibling;
                                        return (
                                          t(
                                            ke,
                                            r(Z, {
                                              get name() {
                                                return de.status === "passed" ? "check" : "info";
                                              },
                                              size: 16,
                                            }),
                                            le,
                                          ),
                                          t(le, () => de.label),
                                          t(
                                            be,
                                            (() => {
                                              var Te = G(() => de.status === "passed");
                                              return () =>
                                                Te()
                                                  ? "Passed"
                                                  : de.status === "failed"
                                                    ? "Failed"
                                                    : "Unknown";
                                            })(),
                                          ),
                                          t(
                                            ve,
                                            r(g, {
                                              get when() {
                                                return de.exitCode !== void 0;
                                              },
                                              get children() {
                                                var Te = Kl();
                                                return (Te.firstChild, t(Te, () => de.exitCode, null), Te);
                                              },
                                            }),
                                            null,
                                          ),
                                          t(
                                            ve,
                                            r(g, {
                                              get when() {
                                                return de.output;
                                              },
                                              get children() {
                                                var Te = Zl();
                                                return (t(Te, () => Ke(de.output)), Te);
                                              },
                                            }),
                                            null,
                                          ),
                                          x(() => Be(ve, `task-check ${de.status}`)),
                                          ve
                                        );
                                      })(),
                                  }),
                                  null,
                                ),
                                t(
                                  I,
                                  r(g, {
                                    get when() {
                                      return C().checks.some((de) => de.status === "failed");
                                    },
                                    get children() {
                                      var de = Hl();
                                      return (
                                        (de.$$click = () => {
                                          N(() =>
                                            e.prompt(
                                              `Inspect the current saved files and recorded check results first. Fix the failed checks for this task: ${C()
                                                .checks.filter((ve) => ve.status === "failed")
                                                .map((ve) => ve.label)
                                                .join(
                                                  "; ",
                                                )}. Run the relevant checks again and report their actual results. Do not repeat completed external side effects.`,
                                            ),
                                          );
                                        }),
                                        x(() => (de.disabled = u() || !e.canSend)),
                                        de
                                      );
                                    },
                                  }),
                                  null,
                                ),
                                I
                              );
                            })(),
                            r(Yo, {
                              get task() {
                                return C();
                              },
                              get pending() {
                                return u();
                              },
                              get locked() {
                                return e.state?.status === "busy" || C().state === "running";
                              },
                              act: N,
                              refresh: async () => {
                                (await e.refresh(), await M());
                              },
                            }),
                            (() => {
                              var I = Yl(),
                                ne = I.firstChild,
                                se = ne.nextSibling,
                                ce = se.nextSibling,
                                ae = ce.firstChild,
                                de = ae.firstChild,
                                ve = ae.nextSibling,
                                ke = ve.firstChild;
                              return (
                                t(
                                  se,
                                  (() => {
                                    var le = G(() => !!C().checkpoint.available);
                                    return () =>
                                      le()
                                        ? `${C().checkpoint.files} files saved before this request. ${C().checkpoint.skipped ? `${C().checkpoint.skipped} files were excluded.` : ""}`
                                        : (C().checkpoint.reason ??
                                          "A restore checkpoint is not available for this request.");
                                  })(),
                                ),
                                (ae.$$click = () =>
                                  e.confirm({
                                    title: "Restore checkpoint?",
                                    detail:
                                      "Restore the files saved before this request. Files edited since this task finished will be reported as conflicts and kept. This does not undo external actions or replay tools.",
                                    label: "Restore files",
                                    danger: !0,
                                    action: async () => {
                                      (y(await window.jac.restoreTask({ id: C().id, confirmed: !0 })),
                                        await e.refresh(),
                                        await M());
                                    },
                                  })),
                                t(ae, r(Z, { name: "history", size: 15 }), de),
                                (ve.$$click = () => {
                                  N(async () => {
                                    (await e.open(await window.jac.branchTask({ id: C().id })),
                                      await M(),
                                      c(void 0));
                                  });
                                }),
                                t(ve, r(Z, { name: "changes", size: 15 }), ke),
                                t(
                                  I,
                                  r(g, {
                                    get when() {
                                      return m();
                                    },
                                    children: (le) =>
                                      (() => {
                                        var be = to(),
                                          Te = be.firstChild,
                                          $e = Te.firstChild;
                                        return (
                                          t(Te, () => le().restored, $e),
                                          t(
                                            be,
                                            r(g, {
                                              get when() {
                                                return le().conflicts.length;
                                              },
                                              get children() {
                                                return [
                                                  (() => {
                                                    var pe = Ql(),
                                                      Re = pe.firstChild,
                                                      De = Re.nextSibling;
                                                    return (
                                                      De.nextSibling,
                                                      t(pe, () => le().conflicts.length, De),
                                                      pe
                                                    );
                                                  })(),
                                                  (() => {
                                                    var pe = Xl();
                                                    return (
                                                      t(
                                                        pe,
                                                        r(_e, {
                                                          get each() {
                                                            return le().conflicts;
                                                          },
                                                          children: (Re) =>
                                                            (() => {
                                                              var De = no();
                                                              return (t(De, Re), De);
                                                            })(),
                                                        }),
                                                      ),
                                                      pe
                                                    );
                                                  })(),
                                                ];
                                              },
                                            }),
                                            null,
                                          ),
                                          t(
                                            be,
                                            r(g, {
                                              get when() {
                                                return !le().conflicts.length;
                                              },
                                              get children() {
                                                return eo();
                                              },
                                            }),
                                            null,
                                          ),
                                          be
                                        );
                                      })(),
                                  }),
                                  null,
                                ),
                                x(
                                  (le) => {
                                    var be = u() || e.state?.status === "busy" || !C().checkpoint.available,
                                      Te = u() || e.state?.status === "busy";
                                    return (
                                      be !== le.e && (ae.disabled = le.e = be),
                                      Te !== le.t && (ve.disabled = le.t = Te),
                                      le
                                    );
                                  },
                                  { e: void 0, t: void 0 },
                                ),
                                I
                              );
                            })(),
                          ],
                        }),
                        null,
                      ),
                      U
                    );
                  },
                }),
                null,
              ),
              t(
                p,
                r(g, {
                  get when() {
                    return G(() => F() === "context")() && e.directory;
                  },
                  get children() {
                    return r(Ko, {
                      get directory() {
                        return e.directory;
                      },
                    });
                  },
                }),
                null,
              ),
              t(
                p,
                r(g, {
                  get when() {
                    return G(() => !!(F() === "preview" && e.directory && H()))() && w();
                  },
                  get children() {
                    return r(Cl, {
                      get directory() {
                        return e.directory;
                      },
                      get path() {
                        return w();
                      },
                      get draft() {
                        return e.draft;
                      },
                    });
                  },
                }),
                null,
              ),
              x(
                (U) => {
                  var C = F() === "preview",
                    I =
                      F() === "inbox"
                        ? "Task inbox"
                        : F() === "report"
                          ? "Task report"
                          : F() === "context"
                            ? "Project context"
                            : "Preview";
                  return (
                    C !== U.e && p.classList.toggle("task-preview-panel", (U.e = C)),
                    I !== U.t && z(p, "aria-label", (U.t = I)),
                    U
                  );
                },
                { e: void 0, t: void 0 },
              ),
              p
            );
          })(),
      }),
    ]
  );
}