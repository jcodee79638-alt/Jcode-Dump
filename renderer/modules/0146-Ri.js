
function Ri(e) {
  const [n, i] = S(!1),
    [s, l] = S(),
    [a, c] = S(),
    [d, f] = S(!1),
    [u, h] = S("");
  let m = 0;
  (Ie(() => {
    const b = e.attachment.id,
      j = n(),
      w = ++m;
    (l(void 0),
      c(void 0),
      h(""),
      f(j),
      j &&
        (window.jac
          .attachmentReferences({ id: b })
          .then((L) => {
            if (w === m) {
              if (
                L.attachmentId !== b ||
                L.references.length > 5 ||
                L.references.some((O) => O.attachmentId !== b)
              )
                throw new Error("Unavailable");
              l(L);
            }
          })
          .catch(() => {
            w === m &&
              h(
                "The original attachment is unavailable. Earlier messages may not retain their original file identity.",
              );
          })
          .finally(() => {
            w === m && f(!1);
          }),
        Me(() => {
          m++;
        })));
  }),
    Me(() => {
      m++;
    }));
  async function y(b) {
    const j = e.attachment.id,
      w = ++m;
    (f(!0),
      c(void 0),
      h(""),
      await window.jac
        .attachmentContent({ id: j, referenceId: b.id })
        .then((L) => {
          if (w === m) {
            if (
              L.reference.id !== b.id ||
              L.reference.attachmentId !== j ||
              L.reference.kind !== b.kind ||
              L.reference.page !== b.page
            )
              throw new Error("Unavailable");
            if (L.mime === "image/jpeg" && L.url && yc(L.url).mime === "image/jpeg") {
              c({ reference: b, filename: L.filename, mime: L.mime, url: L.url });
              return;
            }
            if (
              L.mime === "text/plain" &&
              typeof L.text == "string" &&
              new TextEncoder().encode(L.text).length <= 2e5
            ) {
              c({ reference: b, filename: L.filename, mime: L.mime, text: L.text });
              return;
            }
            throw new Error("Unavailable");
          }
        })
        .catch(() => {
          w === m && h("This attachment reference could not be opened safely.");
        })
        .finally(() => {
          w === m && f(!1);
        }));
  }
  return (() => {
    var b = Cc(),
      j = b.firstChild,
      w = j.firstChild;
    return (
      (j.$$click = () => i((L) => !L)),
      t(j, () => (n() ? "Close" : "View"), w),
      t(j, () => e.attachment.filename, null),
      t(
        b,
        r(g, {
          get when() {
            return n();
          },
          get children() {
            var L = xc(),
              O = L.firstChild;
            return (
              t(
                L,
                r(g, {
                  get when() {
                    return d();
                  },
                  get children() {
                    return kc();
                  },
                }),
                O,
              ),
              t(
                L,
                r(g, {
                  get when() {
                    return u();
                  },
                  get children() {
                    var _ = Pi();
                    return (t(_, u), _);
                  },
                }),
                O,
              ),
              t(
                L,
                r(g, {
                  get when() {
                    return s();
                  },
                  children: (_) => [
                    (() => {
                      var R = Sc(),
                        A = R.firstChild,
                        J = A.nextSibling;
                      return (t(J, () => _().attachmentId), R);
                    })(),
                    (() => {
                      var R = jc();
                      return (
                        t(
                          R,
                          r(_e, {
                            get each() {
                              return _().references;
                            },
                            get fallback() {
                              return Ac();
                            },
                            children: (A) =>
                              (() => {
                                var J = Ec();
                                return (
                                  (J.$$click = () => {
                                    y(A);
                                  }),
                                  t(J, () => A.label),
                                  x(
                                    (D) => {
                                      var B = d(),
                                        H = a()?.reference.id === A.id;
                                      return (
                                        B !== D.e && (J.disabled = D.e = B),
                                        H !== D.t && z(J, "aria-pressed", (D.t = H)),
                                        D
                                      );
                                    },
                                    { e: void 0, t: void 0 },
                                  ),
                                  J
                                );
                              })(),
                          }),
                        ),
                        R
                      );
                    })(),
                    r(g, {
                      get when() {
                        return _().truncated;
                      },
                      get children() {
                        return Tc();
                      },
                    }),
                  ],
                }),
                O,
              ),
              t(
                L,
                r(g, {
                  get when() {
                    return a();
                  },
                  children: (_) =>
                    (() => {
                      var R = Ic(),
                        A = R.firstChild,
                        J = A.nextSibling;
                      return (
                        t(A, () => _().reference.label),
                        t(
                          R,
                          r(g, {
                            get when() {
                              return _().url;
                            },
                            get children() {
                              var D = Pc();
                              return (
                                x(
                                  (B) => {
                                    var H = _().url,
                                      V = `${_().filename} — ${_().reference.label}`;
                                    return (
                                      H !== B.e && z(D, "src", (B.e = H)),
                                      V !== B.t && z(D, "alt", (B.t = V)),
                                      B
                                    );
                                  },
                                  { e: void 0, t: void 0 },
                                ),
                                D
                              );
                            },
                          }),
                          J,
                        ),
                        t(
                          R,
                          r(g, {
                            get when() {
                              return _().text !== void 0;
                            },
                            get children() {
                              var D = Rc();
                              return (t(D, () => _().text), D);
                            },
                          }),
                          J,
                        ),
                        (J.$$click = () =>
                          e.onReference(
                            `Attachment ${e.attachment.id}: ${JSON.stringify(s()?.filename ?? e.attachment.filename)}, ${_().reference.label}.`,
                          )),
                        x(() => (J.disabled = d())),
                        R
                      );
                    })(),
                }),
                O,
              ),
              L
            );
          },
        }),
        null,
      ),
      x(
        (L) => {
          var O = `Attachment: ${e.attachment.filename}`,
            _ = n();
          return (
            O !== L.e && z(b, "aria-label", (L.e = O)),
            _ !== L.t && z(j, "aria-expanded", (L.t = _)),
            L
          );
        },
        { e: void 0, t: void 0 },
      ),
      b
    );
  })();
}