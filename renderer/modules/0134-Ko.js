
function Ko(e) {
  const n = Pe(() => e.directory),
    [i, s] = S(),
    [l, a] = S(""),
    [c, d] = S(!1),
    [f, u] = S(""),
    [h, m] = S(!1);
  return (
    Ie(() => {
      const y = n();
      let b = !1;
      (s(void 0),
        a(""),
        u(""),
        m(!1),
        window.jac
          .projectContext({ directory: y })
          .then((j) => {
            b || (s(j), a(j.notes));
          })
          .catch((j) => {
            b || u(Ke(j instanceof Error ? j.message : "Could not read project context."));
          }),
        Me(() => {
          b = !0;
        }));
    }),
    (() => {
      var y = Ho(),
        b = y.firstChild,
        j = b.nextSibling,
        w = j.firstChild,
        L = w.nextSibling,
        O = j.nextSibling,
        _ = O.firstChild,
        R = _.firstChild,
        A = _.nextSibling,
        J = O.nextSibling,
        D = J.firstChild,
        B = D.nextSibling;
      return (
        y.addEventListener("submit", (H) => {
          H.preventDefault();
          const V = e.directory;
          (d(!0),
            u(""),
            window.jac
              .saveContext({ directory: V, notes: l() })
              .then((E) => {
                e.directory === V && (s(E), m(!0));
              })
              .catch((E) => u(Ke(E instanceof Error ? E.message : "Could not save your notes.")))
              .finally(() => d(!1)));
        }),
        t(
          y,
          r(g, {
            get when() {
              return f();
            },
            get children() {
              var H = Fo();
              return (t(H, f), H);
            },
          }),
          j,
        ),
        (L.$$input = (H) => {
          (a(H.currentTarget.value), m(!1));
        }),
        t(_, () => l().length.toLocaleString(), R),
        t(A, () => (c() ? "Saving…" : "Save notes")),
        t(
          y,
          r(g, {
            get when() {
              return h();
            },
            get children() {
              return Jo();
            },
          }),
          J,
        ),
        t(B, () => i()?.summary || "A summary will appear after task activity is saved."),
        t(
          J,
          r(g, {
            get when() {
              return i()?.updatedAt;
            },
            get children() {
              var H = Bo();
              return (H.firstChild, t(H, () => new Date(i().updatedAt).toLocaleString(), null), H);
            },
          }),
          null,
        ),
        x(
          (H) => {
            var V = c() || !i(),
              E = c() || !i();
            return (V !== H.e && (L.disabled = H.e = V), E !== H.t && (A.disabled = H.t = E), H);
          },
          { e: void 0, t: void 0 },
        ),
        x(() => (L.value = l())),
        y
      );
    })()
  );
}