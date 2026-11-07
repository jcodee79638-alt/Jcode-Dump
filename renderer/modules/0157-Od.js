
function Od(e) {
  const [n, i] = S({ paused: !0, items: [] }),
    [s, l] = S(!1),
    [a, c] = S(!1),
    [d, f] = S(""),
    [u, h] = S(),
    [m, y] = S("");
  let b = !1,
    j = 0;
  const w = (R) => R.state === "queued" || R.state === "paused";
  async function L() {
    const R = ++j,
      A = await window.jac.queueState();
    !b && R === j && (i(A), c(!0));
  }
  async function O(R) {
    if (!s()) {
      (l(!0), f(""), j++);
      try {
        const A = await R();
        if (b) return;
        (j++, i(A), h(void 0), e.onChanged?.());
      } catch {
        b || f("The queue could not be changed. Refresh it and review the saved chat before trying again.");
      } finally {
        b || l(!1);
      }
    }
  }
  Ie(() => {
    (e.sessionId,
      h(void 0),
      Ze(L).catch(() => {
        b || f("The saved queue could not load. No queued work was started.");
      }));
  });
  const _ = setInterval(() => {
    s() || L().catch(() => {});
  }, 3e3);
  return (
    Me(() => {
      ((b = !0), j++, clearInterval(_));
    }),
    (() => {
      var R = jd(),
        A = R.firstChild,
        J = A.firstChild,
        D = J.firstChild,
        B = D.nextSibling,
        H = J.nextSibling,
        V = H.nextSibling,
        E = A.nextSibling,
        me = E.firstChild,
        P = E.nextSibling;
      return (
        t(
          B,
          (() => {
            var v = G(() => !a());
            return () =>
              v()
                ? "Loading saved requests…"
                : n().paused
                  ? "Paused. Review pending requests, then resume when ready."
                  : "Requests enter admission in order when their workspace is available.";
          })(),
        ),
        (H.$$click = () => {
          O(() => window.jac.pauseQueue({ paused: !n().paused }));
        }),
        t(H, () => (n().paused ? "Resume queue" : "Pause queue")),
        (V.$$click = () => {
          L().catch(() => f("The saved queue could not load. Try refreshing again."));
        }),
        t(E, () => n().items.length, me),
        t(
          R,
          r(g, {
            get when() {
              return d();
            },
            get children() {
              var v = Sd();
              return (t(v, d), v);
            },
          }),
          P,
        ),
        t(
          P,
          r(_e, {
            get each() {
              return n().items;
            },
            get fallback() {
              return Td();
            },
            children: (v) =>
              (() => {
                var M = Dd(),
                  N = M.firstChild,
                  re = N.firstChild,
                  F = re.nextSibling,
                  p = N.nextSibling,
                  ee = p.firstChild,
                  ie = p.nextSibling,
                  te = ie.firstChild,
                  U = te.nextSibling;
                return (
                  t(re, () => zd[v.state]),
                  t(F, () => new Date(v.createdAt).toLocaleString()),
                  t(
                    M,
                    r(g, {
                      get when() {
                        return u() === v.id;
                      },
                      get fallback() {
                        return (() => {
                          var C = Nd();
                          return (t(C, () => v.text || "Request with attachments"), C);
                        })();
                      },
                      get children() {
                        return [
                          (() => {
                            var C = Ad(),
                              I = C.firstChild,
                              ne = I.nextSibling;
                            return (
                              (ne.$$input = (se) => y(se.currentTarget.value)),
                              x(() => (ne.disabled = s())),
                              x(() => (ne.value = m())),
                              C
                            );
                          })(),
                          (() => {
                            var C = Ed(),
                              I = C.firstChild,
                              ne = I.nextSibling;
                            return (
                              (I.$$click = () => {
                                O(() => window.jac.updateQueuedPrompt({ id: v.id, text: m() }));
                              }),
                              (ne.$$click = () => h(void 0)),
                              x(
                                (se) => {
                                  var ce = s() || (!m().trim() && !v.attachments.length),
                                    ae = s();
                                  return (
                                    ce !== se.e && (I.disabled = se.e = ce),
                                    ae !== se.t && (ne.disabled = se.t = ae),
                                    se
                                  );
                                },
                                { e: void 0, t: void 0 },
                              ),
                              C
                            );
                          })(),
                        ];
                      },
                    }),
                    p,
                  ),
                  t(p, () => v.attachments.length, ee),
                  t(
                    p,
                    (() => {
                      var C = G(() => v.accessMode === "read");
                      return () =>
                        C() ? "Read access" : v.accessMode === "ask" ? "Ask before changes" : "Full access";
                    })(),
                    null,
                  ),
                  t(
                    M,
                    r(g, {
                      get when() {
                        return v.state === "needs_attention";
                      },
                      get children() {
                        return Pd();
                      },
                    }),
                    ie,
                  ),
                  t(
                    M,
                    r(g, {
                      get when() {
                        return v.state === "submitted";
                      },
                      get children() {
                        return Rd();
                      },
                    }),
                    ie,
                  ),
                  (te.$$click = () => e.onOpen(v.sessionId, v.directory)),
                  t(
                    ie,
                    r(g, {
                      get when() {
                        return w(v);
                      },
                      get children() {
                        return [
                          (() => {
                            var C = Id();
                            return (
                              (C.$$click = () => {
                                (h(v.id), y(v.text));
                              }),
                              x(() => (C.disabled = s())),
                              C
                            );
                          })(),
                          (() => {
                            var C = qd();
                            return (
                              (C.$$click = () => {
                                O(() => window.jac.queueAction({ id: v.id, action: "up" }));
                              }),
                              x(() => (C.disabled = s() || v.position === 0)),
                              C
                            );
                          })(),
                          (() => {
                            var C = Ld();
                            return (
                              (C.$$click = () => {
                                O(() => window.jac.queueAction({ id: v.id, action: "down" }));
                              }),
                              x(() => (C.disabled = s() || v.position === n().items.length - 1)),
                              C
                            );
                          })(),
                          (() => {
                            var C = Md();
                            return (
                              (C.$$click = () => {
                                O(() =>
                                  window.jac.queueAction({
                                    id: v.id,
                                    action: v.state === "paused" ? "resume" : "pause",
                                  }),
                                );
                              }),
                              t(C, () => (v.state === "paused" ? "Resume request" : "Pause request")),
                              x(() => (C.disabled = s())),
                              C
                            );
                          })(),
                        ];
                      },
                    }),
                    U,
                  ),
                  (U.$$click = () => {
                    O(() => window.jac.queueAction({ id: v.id, action: "remove" }));
                  }),
                  t(U, () =>
                    v.state === "submitted" || v.state === "needs_attention"
                      ? "Remove record"
                      : "Remove request",
                  ),
                  x(
                    (C) => {
                      var I = v.sessionId === e.sessionId,
                        ne = `queue-v6-status ${v.state}`,
                        se = s() || v.state === "admitting";
                      return (
                        I !== C.e && M.classList.toggle("current", (C.e = I)),
                        ne !== C.t && Be(re, (C.t = ne)),
                        se !== C.a && (U.disabled = C.a = se),
                        C
                      );
                    },
                    { e: void 0, t: void 0, a: void 0 },
                  ),
                  M
                );
              })(),
          }),
        ),
        x(
          (v) => {
            var M = s() || !a(),
              N = !a(),
              re = s() || !a(),
              F = s();
            return (
              M !== v.e && z(R, "aria-busy", (v.e = M)),
              N !== v.t && B.classList.toggle("tools-loading", (v.t = N)),
              re !== v.a && (H.disabled = v.a = re),
              F !== v.o && (V.disabled = v.o = F),
              v
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 },
        ),
        R
      );
    })()
  );
}
Oe(["click", "input"]);