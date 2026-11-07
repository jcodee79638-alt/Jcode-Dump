
function Gc(e) {
  const [n, i] = S(),
    [s, l] = S(),
    [a, c] = S(!1),
    [d, f] = S(""),
    [u, h] = S(""),
    [m, y] = S(!0),
    [b, j] = S(24),
    [w, L] = S(3);
  let O = !0;
  Me(() => {
    O = !1;
  });
  const _ = (A) => {
      O && (i(A), y(A.enabled), j(A.intervalHours), L(A.keep));
    },
    R = async (A) => {
      if (!a()) {
        (c(!0), f(""), h(""));
        try {
          await A();
        } catch {
          O &&
            f(
              "This backup operation could not complete. Your current data and recoverable originals are retained. Finish current work, refresh and try again.",
            );
        } finally {
          O && c(!1);
        }
      }
    };
  return (
    vn(() => {
      R(async () => _(await window.jac.backupStatus()));
    }),
    (() => {
      var A = zc(),
        J = A.firstChild,
        D = J.firstChild,
        B = D.nextSibling;
      return (
        J.nextSibling,
        (B.$$click = () => {
          R(async () => _(await window.jac.backupStatus()));
        }),
        t(
          A,
          r(g, {
            get when() {
              return d();
            },
            get children() {
              var H = ai();
              return (t(H, d), H);
            },
          }),
          null,
        ),
        t(
          A,
          r(g, {
            get when() {
              return u();
            },
            get children() {
              var H = Nc();
              return (t(H, u), H);
            },
          }),
          null,
        ),
        t(
          A,
          r(g, {
            get when() {
              return n();
            },
            get fallback() {
              return Oc();
            },
            children: (H) => [
              r(g, {
                get when() {
                  return H().lastError;
                },
                get children() {
                  var V = ai();
                  return (t(V, () => H().lastError), V);
                },
              }),
              (() => {
                var V = Uc(),
                  E = V.firstChild,
                  me = E.nextSibling,
                  P = me.nextSibling,
                  v = P.nextSibling,
                  M = v.nextSibling,
                  N = M.nextSibling;
                return (
                  N.nextSibling,
                  t(V, () => H().entries.length, E),
                  t(V, () => (H().entries.length === 1 ? "copy" : "copies"), me),
                  t(V, () => Mn(H().totalBytes), v),
                  t(V, () => Mn(H().limitBytes), N),
                  V
                );
              })(),
              (() => {
                var V = Fc(),
                  E = V.firstChild,
                  me = E.firstChild,
                  P = E.nextSibling,
                  v = P.firstChild,
                  M = v.firstChild,
                  N = M.nextSibling,
                  re = v.nextSibling,
                  F = re.firstChild,
                  p = F.nextSibling,
                  ee = P.nextSibling,
                  ie = ee.nextSibling,
                  te = ie.firstChild,
                  U = te.nextSibling;
                return (
                  V.addEventListener("submit", (C) => {
                    (C.preventDefault(),
                      R(async () => {
                        (_(
                          await window.jac.configureBackups({ enabled: m(), intervalHours: b(), keep: w() }),
                        ),
                          h("Backup schedule saved."));
                      }));
                  }),
                  me.addEventListener("change", (C) => y(C.currentTarget.checked)),
                  (N.$$input = (C) => j(C.currentTarget.valueAsNumber)),
                  (p.$$input = (C) => L(C.currentTarget.valueAsNumber)),
                  (U.$$click = () => {
                    R(async () => {
                      (_(await window.jac.createBackup()),
                        l(void 0),
                        h("Local backup created and verified."));
                    });
                  }),
                  t(U, () => (a() ? "Working…" : "Create backup now")),
                  x(
                    (C) => {
                      var I = a(),
                        ne = a(),
                        se = a(),
                        ce = a(),
                        ae = a();
                      return (
                        I !== C.e && (me.disabled = C.e = I),
                        ne !== C.t && (N.disabled = C.t = ne),
                        se !== C.a && (p.disabled = C.a = se),
                        ce !== C.o && (te.disabled = C.o = ce),
                        ae !== C.i && (U.disabled = C.i = ae),
                        C
                      );
                    },
                    { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 },
                  ),
                  x(() => (me.checked = m())),
                  x(() => (N.value = b())),
                  x(() => (p.value = w())),
                  V
                );
              })(),
              (() => {
                var V = Jc();
                return (
                  V.firstChild,
                  t(
                    V,
                    r(_e, {
                      get each() {
                        return H().entries;
                      },
                      get fallback() {
                        return Bc();
                      },
                      children: (E) =>
                        (() => {
                          var me = Wc(),
                            P = me.firstChild,
                            v = P.firstChild,
                            M = v.nextSibling,
                            N = M.firstChild,
                            re = N.nextSibling;
                          re.nextSibling;
                          var F = P.nextSibling;
                          return (
                            t(v, () => new Date(E.createdAt).toLocaleString()),
                            t(M, () => E.conversations, N),
                            t(M, () => E.attachments, re),
                            t(M, () => Mn(E.bytes), null),
                            t(
                              P,
                              r(g, {
                                get when() {
                                  return E.partial;
                                },
                                get children() {
                                  var p = Hc(),
                                    ee = p.firstChild,
                                    ie = ee.nextSibling;
                                  return (ie.nextSibling, t(p, () => E.skipped, ie), p);
                                },
                              }),
                              null,
                            ),
                            (F.$$click = () => {
                              R(async () => {
                                l(await window.jac.inspectBackup({ id: E.id }));
                              });
                            }),
                            x(
                              (p) => {
                                var ee = a(),
                                  ie = s()?.entry.id === E.id;
                                return (
                                  ee !== p.e && (F.disabled = p.e = ee),
                                  ie !== p.t && z(F, "aria-expanded", (p.t = ie)),
                                  p
                                );
                              },
                              { e: void 0, t: void 0 },
                            ),
                            me
                          );
                        })(),
                    }),
                    null,
                  ),
                  V
                );
              })(),
              r(g, {
                get when() {
                  return s();
                },
                children: (V) =>
                  (() => {
                    var E = Vc(),
                      me = E.firstChild,
                      P = me.nextSibling,
                      v = P.firstChild,
                      M = v.nextSibling;
                    M.nextSibling;
                    var N = P.nextSibling,
                      re = N.nextSibling,
                      F = re.nextSibling,
                      p = F.nextSibling,
                      ee = p.firstChild,
                      ie = ee.nextSibling;
                    return (
                      t(P, () => new Date(V().entry.createdAt).toLocaleString(), M),
                      t(P, () => Mn(V().entry.bytes), null),
                      t(
                        N,
                        r(_e, {
                          get each() {
                            return V().scopes;
                          },
                          children: (te) =>
                            (() => {
                              var U = Kc();
                              return (t(U, te), U);
                            })(),
                        }),
                      ),
                      t(
                        re,
                        r(_e, {
                          get each() {
                            return V().warnings;
                          },
                          children: (te) =>
                            (() => {
                              var U = Zc();
                              return (t(U, te), U);
                            })(),
                        }),
                      ),
                      (ee.$$click = () => {
                        R(async () => {
                          const te = await window.jac.restoreBackup({ id: V().entry.id, confirmed: !0 });
                          te.restored
                            ? (h(
                                te.restart
                                  ? "Restoration committed. Jac Code is restarting…"
                                  : "Restoration completed.",
                              ),
                              e.onRestored?.())
                            : h("Restoration was cancelled.");
                        });
                      }),
                      (ie.$$click = () => l(void 0)),
                      t(
                        E,
                        r(g, {
                          get when() {
                            return !V().canRestore;
                          },
                          get children() {
                            return Yc();
                          },
                        }),
                        null,
                      ),
                      x(
                        (te) => {
                          var U = a() || !V().canRestore,
                            C = a();
                          return (
                            U !== te.e && (ee.disabled = te.e = U),
                            C !== te.t && (ie.disabled = te.t = C),
                            te
                          );
                        },
                        { e: void 0, t: void 0 },
                      ),
                      E
                    );
                  })(),
              }),
            ],
          }),
          null,
        ),
        x(
          (H) => {
            var V = a(),
              E = a();
            return (V !== H.e && z(A, "aria-busy", (H.e = V)), E !== H.t && (B.disabled = H.t = E), H);
          },
          { e: void 0, t: void 0 },
        ),
        A
      );
    })()
  );
}
Oe(["click", "input"]);