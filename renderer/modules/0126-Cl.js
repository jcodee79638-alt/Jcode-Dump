
function Cl(e) {
  const [n, i] = S(),
    [s, l] = S(""),
    [a, c] = S(!1),
    [d, f] = S(!1),
    [u, h] = S(),
    [m, y] = S([]),
    [b, j] = S([]),
    [w, L] = S(!1),
    [O, _] = S(!1),
    [R, A] = S(""),
    J = () => n()?.kind === "html" && !!n()?.nonce,
    D = Pe(() =>
      m().reduce((P, v) => ({ ...P, [v.kind]: P[v.kind] + 1 }), { error: 0, rejection: 0, resource: 0 }),
    );
  let B,
    H = 0,
    V = 0;
  async function E() {
    const P = ++H,
      v = e.directory,
      M = s().trim();
    ((V = 0),
      _(!0),
      A(""),
      f(!1),
      h(void 0),
      y([]),
      j([]),
      L(!1),
      i(void 0),
      await window.jac
        .preview({ directory: v, ...(M ? (/^https?:\/\//i.test(M) ? { url: M } : { path: M }) : {}) })
        .then((N) => {
          P === H && i(N);
        })
        .catch((N) => {
          P === H && A(nn(N instanceof Error ? N.message : "Preview is unavailable.").slice(0, 1e3));
        })
        .finally(() => {
          P === H && _(!1);
        }));
  }
  (Ie(() => {
    (e.directory, l(e.path), Ze(E));
  }),
    Ie(() => {
      const P = { type: "jac-preview-inspect", nonce: n()?.nonce, enabled: d() };
      B?.contentWindow?.postMessage(P, "*");
    }));
  const me = (P) => {
    if (
      !J() ||
      P.source !== B?.contentWindow ||
      !P.data ||
      typeof P.data != "object" ||
      Array.isArray(P.data)
    )
      return;
    const v = P.data;
    if (v.nonce !== n()?.nonce) return;
    if (v.type === "jac-preview-selection") {
      if (
        !d() ||
        !Ht(v.tag, 40) ||
        !/^[a-z][a-z0-9-]*$/i.test(v.tag) ||
        !Ht(v.selector, 500) ||
        !v.selector ||
        !Ht(v.text, 1e3) ||
        (v.label !== void 0 && !Ht(v.label, 200)) ||
        (v.path !== void 0 && !Ht(v.path, 400)) ||
        !Number.isSafeInteger(v.matches) ||
        Number(v.matches) < 0 ||
        Number(v.matches) > 1e6
      )
        return;
      (h({
        tag: v.tag,
        selector: nn(v.selector),
        text: nn(v.text),
        ...(typeof v.label == "string" ? { label: nn(v.label) } : {}),
        ...(typeof v.path == "string" ? { path: ri(v.path) } : {}),
        matches: Number(v.matches),
      }),
        f(!1));
      return;
    }
    if (
      v.type !== "jac-preview-diagnostic" ||
      V >= 100 ||
      typeof v.kind != "string" ||
      !["error", "rejection", "resource"].includes(v.kind) ||
      !Ht(v.message, 1e3) ||
      !v.message.trim() ||
      (v.path !== void 0 && !Ht(v.path, 400)) ||
      (v.line !== void 0 && (!Number.isSafeInteger(v.line) || Number(v.line) < 1 || Number(v.line) > 1e7)) ||
      (v.column !== void 0 &&
        (!Number.isSafeInteger(v.column) || Number(v.column) < 1 || Number(v.column) > 1e7))
    )
      return;
    const M = {
      id: `${H}:${++V}`,
      kind: v.kind,
      message: nn(v.message),
      ...(typeof v.path == "string" ? { path: ri(v.path) } : {}),
      ...(typeof v.line == "number" ? { line: v.line } : {}),
      ...(typeof v.column == "number" ? { column: v.column } : {}),
      at: Date.now(),
    };
    (y((N) => [...N, M].slice(-30)),
      j((N) => N.filter((re) => m().some((F) => F.id === re))),
      V === 100 && L(!0));
  };
  return (
    window.addEventListener("message", me),
    Me(() => {
      (H++, window.removeEventListener("message", me));
    }),
    (() => {
      var P = $l(),
        v = P.firstChild,
        M = v.firstChild,
        N = v.nextSibling,
        re = N.firstChild,
        F = re.nextSibling;
      return (
        (P.$$keydown = (p) => {
          p.key === "Escape" && f(!1);
        }),
        v.addEventListener("submit", (p) => {
          (p.preventDefault(), E());
        }),
        (M.$$input = (p) => l(p.currentTarget.value)),
        t(
          v,
          r(Xe, {
            name: "refresh",
            label: "Refresh preview",
            get disabled() {
              return O();
            },
            onClick: () => {
              E();
            },
          }),
          null,
        ),
        (re.$$click = () => c(!1)),
        (F.$$click = () => c(!0)),
        t(
          N,
          r(g, {
            get when() {
              return J();
            },
            get children() {
              var p = ul(),
                ee = p.firstChild;
              return (
                (p.$$click = () => {
                  (h(void 0), f((ie) => !ie));
                }),
                t(p, r(Z, { name: "eye", size: 14 }), ee),
                x(() => z(p, "aria-pressed", d())),
                p
              );
            },
          }),
          null,
        ),
        t(
          P,
          r(g, {
            get when() {
              return R();
            },
            get children() {
              var p = hl();
              return (t(p, R), p);
            },
          }),
          null,
        ),
        t(
          P,
          r(g, {
            get when() {
              return n()?.kind === "local";
            },
            get children() {
              return gl();
            },
          }),
          null,
        ),
        t(
          P,
          r(g, {
            get when() {
              return d();
            },
            get children() {
              return fl();
            },
          }),
          null,
        ),
        t(
          P,
          r(g, {
            get when() {
              return u();
            },
            children: (p) =>
              (() => {
                var ee = bl(),
                  ie = ee.firstChild,
                  te = ie.firstChild,
                  U = ie.nextSibling,
                  C = U.nextSibling,
                  I = C.nextSibling;
                return (
                  t(te, () => p().label || p().text.slice(0, 100) || `<${p().tag}>`),
                  t(
                    ie,
                    r(Xe, { name: "close", label: "Dismiss selected element", onClick: () => h(void 0) }),
                    null,
                  ),
                  t(U, () => p().selector),
                  t(
                    C,
                    (() => {
                      var ne = G(() => p().matches === 1);
                      return () =>
                        ne()
                          ? "1 matching element"
                          : `${p().matches} matching elements — select a more specific element.`;
                    })(),
                    null,
                  ),
                  t(
                    C,
                    r(g, {
                      get when() {
                        return p().path;
                      },
                      get children() {
                        return [" · ", G(() => p().path)];
                      },
                    }),
                    null,
                  ),
                  t(
                    ee,
                    r(g, {
                      get when() {
                        return p().text;
                      },
                      get children() {
                        var ne = pl();
                        return (t(ne, () => p().text), ne);
                      },
                    }),
                    I,
                  ),
                  (I.$$click = () => {
                    (e.draft(`Please change this selected preview element.
Element: ${p().tag}
Selector: ${p().selector}
${
  p().label
    ? `Accessible label: ${p().label}
`
    : ""
}${
                      p().path
                        ? `Preview file: ${p().path}
`
                        : ""
                    }Visible text: ${p().text}
Requested change: `),
                      h(void 0));
                  }),
                  x(() => (I.disabled = p().matches !== 1)),
                  ee
                );
              })(),
          }),
          null,
        ),
        t(
          P,
          r(g, {
            get when() {
              return J();
            },
            get children() {
              var p = ml(),
                ee = p.firstChild,
                ie = ee.firstChild,
                te = ie.nextSibling,
                U = te.firstChild,
                C = U.nextSibling,
                I = C.nextSibling,
                ne = I.nextSibling,
                se = ne.nextSibling,
                ce = se.nextSibling,
                ae = ce.nextSibling,
                de = ae.nextSibling;
              de.nextSibling;
              var ve = ee.nextSibling,
                ke = ve.nextSibling,
                le = ke.nextSibling,
                be = le.firstChild,
                Te = be.nextSibling;
              return (
                t(te, () => D().error, U),
                t(te, () => (D().error === 1 ? "error" : "errors"), C),
                t(te, () => D().rejection, ne),
                t(te, () => (D().rejection === 1 ? "rejection" : "rejections"), ce),
                t(te, () => D().resource, de),
                t(te, () => (D().resource === 1 ? "resource issue" : "resource issues"), null),
                t(ee, r(Z, { name: "down", size: 14 }), null),
                t(
                  p,
                  r(g, {
                    get when() {
                      return w();
                    },
                    get children() {
                      return vl();
                    },
                  }),
                  ke,
                ),
                t(
                  ke,
                  r(_e, {
                    get each() {
                      return m();
                    },
                    get fallback() {
                      return wl();
                    },
                    children: ($e) =>
                      (() => {
                        var pe = yl(),
                          Re = pe.firstChild,
                          De = Re.nextSibling,
                          st = De.firstChild,
                          ue = st.nextSibling;
                        return (
                          Re.addEventListener("change", (Ue) =>
                            j(($t) =>
                              Ue.currentTarget.checked ? [...$t, $e.id] : $t.filter((Fe) => Fe !== $e.id),
                            ),
                          ),
                          t(
                            st,
                            (() => {
                              var Ue = G(() => $e.kind === "error");
                              return () =>
                                Ue()
                                  ? "Runtime error"
                                  : $e.kind === "rejection"
                                    ? "Unhandled rejection"
                                    : "Resource error";
                            })(),
                          ),
                          t(ue, () => $e.message),
                          t(
                            De,
                            r(g, {
                              get when() {
                                return $e.path;
                              },
                              get children() {
                                var Ue = _l();
                                return (
                                  t(Ue, () => $e.path, null),
                                  t(
                                    Ue,
                                    (() => {
                                      var $t = G(() => !!$e.line);
                                      return () =>
                                        $t() ? `:${$e.line}${$e.column ? `:${$e.column}` : ""}` : "";
                                    })(),
                                    null,
                                  ),
                                  Ue
                                );
                              },
                            }),
                            null,
                          ),
                          x(() => z(Re, "aria-label", `Select diagnostic ${$e.id}`)),
                          x(() => (Re.checked = b().includes($e.id))),
                          pe
                        );
                      })(),
                  }),
                ),
                (be.$$click = () => {
                  (y([]), j([]));
                }),
                (Te.$$click = () => {
                  (e.draft(`Please inspect these captured preview diagnostics and fix their causes.
${m()
  .filter(($e) => b().includes($e.id))
  .map(
    ($e) =>
      `- ${$e.kind}: ${$e.message}${$e.path ? ` (${$e.path}${$e.line ? `:${$e.line}${$e.column ? `:${$e.column}` : ""}` : ""})` : ""}`,
  ).join(`
`)}
Requested change: `),
                    j([]));
                }),
                x(
                  ($e) => {
                    var pe = !m().length,
                      Re = !b().length;
                    return (
                      pe !== $e.e && (be.disabled = $e.e = pe),
                      Re !== $e.t && (Te.disabled = $e.t = Re),
                      $e
                    );
                  },
                  { e: void 0, t: void 0 },
                ),
                p
              );
            },
          }),
          null,
        ),
        t(
          P,
          r(g, {
            get when() {
              return n();
            },
            get fallback() {
              return (() => {
                var p = kl(),
                  ee = p.firstChild;
                return (
                  t(p, r(Z, { name: "eye", size: 28 }), ee),
                  t(ee, () => (O() ? "Preparing preview…" : "No web preview found")),
                  x(() => ee.classList.toggle("tools-loading", !!O())),
                  p
                );
              })();
            },
            children: (p) =>
              (() => {
                var ee = xl(),
                  ie = ee.firstChild;
                ie.addEventListener("load", () =>
                  B?.contentWindow?.postMessage(
                    { type: "jac-preview-inspect", nonce: n()?.nonce, enabled: d() },
                    "*",
                  ),
                );
                var te = B;
                return (
                  typeof te == "function" ? Rt(te, ie) : (B = ie),
                  x(
                    (U) => {
                      var C = !!a(),
                        I = p().url;
                      return (
                        C !== U.e && ee.classList.toggle("mobile", (U.e = C)),
                        I !== U.t && z(ie, "src", (U.t = I)),
                        U
                      );
                    },
                    { e: void 0, t: void 0 },
                  ),
                  ee
                );
              })(),
          }),
          null,
        ),
        x(
          (p) => {
            var ee = O(),
              ie = !a(),
              te = a();
            return (
              ee !== p.e && z(P, "aria-busy", (p.e = ee)),
              ie !== p.t && z(re, "aria-pressed", (p.t = ie)),
              te !== p.a && z(F, "aria-pressed", (p.a = te)),
              p
            );
          },
          { e: void 0, t: void 0, a: void 0 },
        ),
        x(() => (M.value = s())),
        P
      );
    })()
  );
}