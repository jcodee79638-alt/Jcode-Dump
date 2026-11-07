
function Cd(e) {
  const [n, i] = S(),
    [s, l] = S([]),
    [a, c] = S([]),
    [d, f] = S(),
    [u, h] = S(!1),
    [m, y] = S(""),
    [b, j] = S(),
    [w, L] = S(""),
    [O, _] = S(""),
    [R, A] = S(""),
    [J, D] = S("");
  let B = 0,
    H;
  function V() {
    if (!e.sessionId) throw new Error("Choose a conversation to save, run, or remove project profiles.");
    return e.sessionId;
  }
  async function E(N, re, F) {
    const p = await Promise.all([
      window.jac.projectSetup({ directory: N }),
      window.jac.runProfiles({ directory: N }),
      window.jac.profileRuns({ directory: N }),
      F ? window.jac.completionReview({ id: F }) : void 0,
    ]);
    re === B && (i(p[0]), l(p[1]), c(p[2]), f(p[3]), me(N, re));
  }
  function me(N, re) {
    (clearTimeout(H),
      !(re !== B || !a().some((F) => F.state === "running")) &&
        (H = setTimeout(() => {
          window.jac
            .profileRuns({ directory: N })
            .then((F) => {
              re === B &&
                (c(F),
                !F.some((p) => p.state === "running") &&
                  e.taskId &&
                  window.jac
                    .completionReview({ id: e.taskId })
                    .then((p) => {
                      re === B && f(p);
                    })
                    .catch(() => {}),
                me(N, re));
            })
            .catch(() => {
              re === B && y("Command history could not refresh. Use Refresh to inspect its state.");
            });
        }, 800)));
  }
  async function P(N) {
    if (u()) return;
    const re = B,
      F = e.directory;
    (h(!0),
      y(""),
      await N(F, re)
        .catch((p) => {
          re === B && y(Ke(p instanceof Error ? p.message : "Project tools could not complete this action."));
        })
        .finally(() => {
          re === B && h(!1);
        }));
  }
  function v(N) {
    (j(N?.id ?? "new"),
      L(N?.name ?? ""),
      _(N?.commands.start ? JSON.stringify(N.commands.start) : ""),
      A(N?.commands.build ? JSON.stringify(N.commands.build) : ""),
      D(N?.commands.test ? JSON.stringify(N.commands.test) : ""),
      y(""));
  }
  async function M(N, re) {
    const F = {};
    for (const ee of [
      ["start", O()],
      ["build", R()],
      ["test", J()],
    ]) {
      if (!ee[1].trim()) continue;
      const ie = JSON.parse(ee[1]);
      if (!Array.isArray(ie) || !ie.length || !ie.every((te) => typeof te == "string" && !!te))
        throw new Error('Enter commands as JSON arrays of arguments, for example ["npm","run","test"].');
      F[ee[0]] = ie;
    }
    if (!w().trim() || !Object.keys(F).length)
      throw new Error("Enter a profile name and at least one command.");
    const p = await window.jac.saveRunProfile({
      directory: N,
      sessionId: V(),
      profile: {
        id: b() === "new" ? crypto.randomUUID() : b(),
        name: w().trim(),
        commands: F,
        updatedAt: Date.now(),
      },
    });
    re === B && (l(p), j(void 0));
  }
  return (
    Ie(() => {
      const N = e.directory;
      e.sessionId;
      const re = e.taskId,
        F = ++B;
      (clearTimeout(H),
        i(void 0),
        l([]),
        c([]),
        f(void 0),
        j(void 0),
        y(""),
        h(!0),
        Ze(() => E(N, F, re))
          .catch(() => {
            F === B && y("Project tools could not inspect this folder. Refresh to try again.");
          })
          .finally(() => {
            F === B && h(!1);
          }));
    }),
    Me(() => {
      (B++, clearTimeout(H));
    }),
    (() => {
      var N = sd(),
        re = N.firstChild,
        F = re.firstChild,
        p = F.nextSibling,
        ee = re.nextSibling,
        ie = ee.firstChild,
        te = ie.firstChild,
        U = te.nextSibling;
      ie.nextSibling;
      var C = ee.nextSibling;
      return (
        C.firstChild,
        (p.$$click = () => {
          P((I, ne) => E(I, ne, e.taskId));
        }),
        t(
          N,
          r(g, {
            get when() {
              return G(() => !!u())() && !n();
            },
            get children() {
              return nd();
            },
          }),
          ee,
        ),
        t(
          N,
          r(g, {
            get when() {
              return m();
            },
            get children() {
              var I = rd();
              return (t(I, m), I);
            },
          }),
          ee,
        ),
        t(
          N,
          r(g, {
            get when() {
              return n();
            },
            children: (I) =>
              (() => {
                var ne = ld(),
                  se = ne.firstChild,
                  ce = se.firstChild,
                  ae = ce.firstChild,
                  de = ce.nextSibling,
                  ve = se.nextSibling,
                  ke = ve.nextSibling;
                return (
                  t(ce, () => I().kind, ae),
                  (de.$$click = () =>
                    e.draft(`Help me set up this project. First inspect the project documentation.
${I().requirements.map((le) => `${le.label}: ${le.status}. ${le.detail}`).join(`
`)}
${I().issues.join(`
`)}
Ask before installing dependencies or changing my environment.`)),
                  t(
                    ve,
                    r(_e, {
                      get each() {
                        return I().requirements;
                      },
                      children: (le) =>
                        (() => {
                          var be = od(),
                            Te = be.firstChild,
                            $e = Te.nextSibling,
                            pe = $e.nextSibling;
                          return (
                            t(Te, () => le.label),
                            t($e, () => le.status),
                            t(pe, () => le.detail),
                            x(() => Be($e, `project-v6-state ${le.status}`)),
                            be
                          );
                        })(),
                    }),
                  ),
                  t(
                    ne,
                    r(_e, {
                      get each() {
                        return I().issues;
                      },
                      children: (le) =>
                        (() => {
                          var be = cd();
                          return (t(be, le), be);
                        })(),
                    }),
                    ke,
                  ),
                  t(
                    ne,
                    r(_e, {
                      get each() {
                        return I().suggestedProfiles;
                      },
                      children: (le) =>
                        (() => {
                          var be = dd();
                          return (
                            be.firstChild,
                            (be.$$click = () => {
                              P(async (Te, $e) => {
                                const pe = await window.jac.saveRunProfile({
                                  directory: Te,
                                  sessionId: V(),
                                  profile: le,
                                });
                                $e === B && l(pe);
                              });
                            }),
                            t(be, () => le.name, null),
                            x(() => (be.disabled = u() || !e.sessionId)),
                            be
                          );
                        })(),
                    }),
                    null,
                  ),
                  ne
                );
              })(),
          }),
          ee,
        ),
        (U.$$click = () => v()),
        t(
          ee,
          r(g, {
            get when() {
              return !e.sessionId;
            },
            get children() {
              return id();
            },
          }),
          null,
        ),
        t(
          ee,
          r(_e, {
            get each() {
              return s();
            },
            get fallback() {
              return ud();
            },
            children: (I) =>
              (() => {
                var ne = hd(),
                  se = ne.firstChild,
                  ce = se.nextSibling,
                  ae = ce.firstChild;
                ae.firstChild;
                var de = ae.nextSibling;
                return (
                  de.firstChild,
                  t(se, () => I.name),
                  t(
                    ne,
                    r(_e, {
                      each: ["start", "build", "test"],
                      children: (ve) =>
                        r(g, {
                          get when() {
                            return I.commands[ve];
                          },
                          children: (ke) =>
                            (() => {
                              var le = gd(),
                                be = le.firstChild,
                                Te = be.nextSibling;
                              return (
                                Te.firstChild,
                                t(be, () => JSON.stringify(ke())),
                                (Te.$$click = () => {
                                  P(async ($e, pe) => {
                                    await window.jac.runProfile({
                                      directory: $e,
                                      sessionId: V(),
                                      profileId: I.id,
                                      kind: ve,
                                      ...(e.taskId ? { taskId: e.taskId } : {}),
                                    });
                                    const Re = await window.jac.profileRuns({ directory: $e });
                                    pe === B && (c(Re), me($e, pe));
                                  });
                                }),
                                t(Te, ve, null),
                                x(
                                  () =>
                                    (Te.disabled =
                                      u() || !e.sessionId || a().some(($e) => $e.state === "running")),
                                ),
                                le
                              );
                            })(),
                        }),
                    }),
                    ce,
                  ),
                  (ae.$$click = () => v(I)),
                  t(ae, () => I.name, null),
                  (de.$$click = () => {
                    P(async (ve, ke) => {
                      const le = await window.jac.removeRunProfile({
                        directory: ve,
                        sessionId: V(),
                        id: I.id,
                      });
                      ke === B && l(le);
                    });
                  }),
                  t(de, () => I.name, null),
                  x(
                    (ve) => {
                      var ke = u() || a().some((be) => be.state === "running"),
                        le = u() || !e.sessionId || a().some((be) => be.state === "running");
                      return (
                        ke !== ve.e && (ae.disabled = ve.e = ke),
                        le !== ve.t && (de.disabled = ve.t = le),
                        ve
                      );
                    },
                    { e: void 0, t: void 0 },
                  ),
                  ne
                );
              })(),
          }),
          null,
        ),
        t(
          ee,
          r(g, {
            get when() {
              return b();
            },
            get children() {
              var I = ad(),
                ne = I.firstChild,
                se = ne.firstChild,
                ce = se.nextSibling,
                ae = ne.nextSibling,
                de = ae.nextSibling,
                ve = de.firstChild,
                ke = ve.nextSibling,
                le = de.nextSibling,
                be = le.firstChild,
                Te = be.nextSibling,
                $e = le.nextSibling,
                pe = $e.firstChild,
                Re = pe.nextSibling,
                De = $e.nextSibling,
                st = De.firstChild,
                ue = st.nextSibling;
              return (
                I.addEventListener("submit", (Ue) => {
                  (Ue.preventDefault(), P(M));
                }),
                (ce.$$input = (Ue) => L(Ue.currentTarget.value)),
                (ke.$$input = (Ue) => _(Ue.currentTarget.value)),
                z(ke, "spellcheck", !1),
                (Te.$$input = (Ue) => A(Ue.currentTarget.value)),
                z(Te, "spellcheck", !1),
                (Re.$$input = (Ue) => D(Ue.currentTarget.value)),
                z(Re, "spellcheck", !1),
                (ue.$$click = () => j(void 0)),
                x(() => (st.disabled = u() || !e.sessionId)),
                x(() => (ce.value = w())),
                x(() => (ke.value = O())),
                x(() => (Te.value = R())),
                x(() => (Re.value = J())),
                I
              );
            },
          }),
          null,
        ),
        t(
          N,
          r(g, {
            get when() {
              return d();
            },
            children: (I) =>
              (() => {
                var ne = vd(),
                  se = ne.firstChild;
                return (
                  se.firstChild,
                  t(se, () => I().state, null),
                  t(
                    ne,
                    r(g, {
                      get when() {
                        return I().expected.length;
                      },
                      get fallback() {
                        return md();
                      },
                      get children() {
                        var ce = fd();
                        return (
                          t(
                            ce,
                            r(_e, {
                              get each() {
                                return I().expected;
                              },
                              children: (ae) =>
                                (() => {
                                  var de = $d(),
                                    ve = de.firstChild;
                                  return (t(ve, ae), de);
                                })(),
                            }),
                          ),
                          ce
                        );
                      },
                    }),
                    null,
                  ),
                  t(
                    ne,
                    r(_e, {
                      get each() {
                        return I().missing;
                      },
                      children: (ce) =>
                        (() => {
                          var ae = pd();
                          return (ae.firstChild, t(ae, ce, null), ae);
                        })(),
                    }),
                    null,
                  ),
                  t(
                    ne,
                    r(_e, {
                      get each() {
                        return I().checks;
                      },
                      children: (ce) =>
                        (() => {
                          var ae = bd(),
                            de = ae.firstChild;
                          return (
                            de.nextSibling,
                            t(de, () => ce.status),
                            t(ae, () => ce.label, null),
                            t(
                              ae,
                              (() => {
                                var ve = G(() => ce.exitCode === void 0);
                                return () => (ve() ? " · No exit proof" : ` · Exit ${ce.exitCode}`);
                              })(),
                              null,
                            ),
                            ae
                          );
                        })(),
                    }),
                    null,
                  ),
                  ne
                );
              })(),
          }),
          C,
        ),
        t(
          C,
          r(_e, {
            get each() {
              return a();
            },
            get fallback() {
              return wd();
            },
            children: (I) =>
              (() => {
                var ne = xd(),
                  se = ne.firstChild,
                  ce = se.firstChild,
                  ae = ce.firstChild,
                  de = se.nextSibling,
                  ve = de.nextSibling;
                return (
                  t(ce, () => I.kind, ae),
                  t(ce, () => I.state.replaceAll("_", " "), null),
                  t(
                    se,
                    r(g, {
                      get when() {
                        return I.state === "running";
                      },
                      get children() {
                        var ke = _d();
                        return (
                          (ke.$$click = () => {
                            P(async (le, be) => {
                              await window.jac.cancelProfile({ id: I.id });
                              const Te = await window.jac.profileRuns({ directory: le });
                              be === B && (c(Te), me(le, be));
                            });
                          }),
                          x(() => (ke.disabled = u())),
                          ke
                        );
                      },
                    }),
                    null,
                  ),
                  t(de, () => JSON.stringify(I.command)),
                  t(
                    ve,
                    (() => {
                      var ke = G(() => I.exitCode === null);
                      return () => (ke() ? "No exit result yet." : `Actual process exit: ${I.exitCode}`);
                    })(),
                  ),
                  t(
                    ne,
                    r(g, {
                      get when() {
                        return I.output;
                      },
                      get children() {
                        var ke = yd(),
                          le = ke.firstChild,
                          be = le.nextSibling;
                        return (
                          t(be, () => I.output.slice(-12e3)),
                          x(() => (ke.open = I.state === "running")),
                          ke
                        );
                      },
                    }),
                    null,
                  ),
                  t(
                    ne,
                    r(g, {
                      get when() {
                        return I.truncated || I.output.length > 12e3;
                      },
                      get children() {
                        return kd();
                      },
                    }),
                    null,
                  ),
                  x(() => ne.classList.toggle("is-running", I.state === "running")),
                  ne
                );
              })(),
          }),
          null,
        ),
        x(
          (I) => {
            var ne = u(),
              se = u(),
              ce = u();
            return (
              ne !== I.e && z(N, "aria-busy", (I.e = ne)),
              se !== I.t && (p.disabled = I.t = se),
              ce !== I.a && (U.disabled = I.a = ce),
              I
            );
          },
          { e: void 0, t: void 0, a: void 0 },
        ),
        N
      );
    })()
  );
}
Oe(["click", "input"]);