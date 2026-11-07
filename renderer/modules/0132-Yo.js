
function Yo(e) {
  const [n, i] = S(),
    [s, l] = S(!1),
    [a, c] = S(),
    d = Pe(() => e.task.id);
  return (
    Ie(() => {
      (d(), i(void 0), l(!1), c(void 0));
    }),
    (() => {
      var f = io(),
        u = f.firstChild,
        h = u.firstChild,
        m = h.nextSibling,
        y = m.firstChild,
        b = u.nextSibling,
        j = b.firstChild;
      return (
        (m.$$click = () => {
          e.act(async () => l((await window.jac.exportArtifacts({ taskId: e.task.id })).saved));
        }),
        t(m, r(Z, { name: "download", size: 15 }), y),
        t(b, () => e.task.files.length, j),
        t(
          f,
          r(_e, {
            get each() {
              return e.task.files;
            },
            get fallback() {
              return ao();
            },
            children: (w) =>
              (() => {
                var L = so(),
                  O = L.firstChild,
                  _ = O.firstChild,
                  R = _.nextSibling,
                  A = O.nextSibling,
                  J = A.firstChild,
                  D = J.nextSibling;
                return (
                  t(
                    _,
                    (() => {
                      var B = G(() => w.status === "added");
                      return () => (B() ? "+" : w.status === "deleted" ? "−" : "~");
                    })(),
                  ),
                  t(R, () => w.path),
                  (J.$$click = () => {
                    e.act(async () => i(await window.jac.taskDiff({ taskId: e.task.id, path: w.path })));
                  }),
                  (D.$$click = () => {
                    e.act(() => window.jac.openArtifact({ taskId: e.task.id, path: w.path, action: "open" }));
                  }),
                  t(
                    A,
                    r(Xe, {
                      name: "folder",
                      get label() {
                        return `Show folder ${w.path}`;
                      },
                      get disabled() {
                        return e.pending;
                      },
                      onClick: () => {
                        e.act(() =>
                          window.jac.openArtifact({ taskId: e.task.id, path: w.path, action: "folder" }),
                        );
                      },
                    }),
                    null,
                  ),
                  x(
                    (B) => {
                      var H = `file-status ${w.status}`,
                        V = w.path,
                        E = `Compare ${w.path}`,
                        me = e.pending,
                        P = `Open ${w.path}`,
                        v = e.pending || w.status === "deleted";
                      return (
                        H !== B.e && Be(_, (B.e = H)),
                        V !== B.t && z(R, "title", (B.t = V)),
                        E !== B.a && z(J, "aria-label", (B.a = E)),
                        me !== B.o && (J.disabled = B.o = me),
                        P !== B.i && z(D, "aria-label", (B.i = P)),
                        v !== B.n && (D.disabled = B.n = v),
                        B
                      );
                    },
                    { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0 },
                  ),
                  L
                );
              })(),
          }),
          null,
        ),
        t(
          f,
          r(g, {
            get when() {
              return s();
            },
            get children() {
              return ro();
            },
          }),
          null,
        ),
        t(
          f,
          r(g, {
            get when() {
              return n();
            },
            children: (w) =>
              (() => {
                var L = oo(),
                  O = L.firstChild,
                  _ = O.firstChild,
                  R = O.nextSibling,
                  A = R.nextSibling;
                return (
                  A.nextSibling,
                  t(_, () => w().path),
                  t(O, r(Xe, { name: "close", label: "Close comparison", onClick: () => i(void 0) }), null),
                  t(
                    L,
                    r(ji, {
                      get diff() {
                        return w();
                      },
                    }),
                    A,
                  ),
                  (A.$$click = () => {
                    e.act(async () => {
                      const J = await window.jac.restoreTaskFile({
                        id: e.task.id,
                        path: w().path,
                        fingerprint: w().fingerprint,
                        confirmed: !0,
                      });
                      (c(J),
                        i(await window.jac.taskDiff({ taskId: e.task.id, path: w().path })),
                        await e.refresh());
                    });
                  }),
                  t(
                    L,
                    r(g, {
                      get when() {
                        return !w().canRestore;
                      },
                      get children() {
                        return lo();
                      },
                    }),
                    null,
                  ),
                  t(
                    L,
                    r(g, {
                      get when() {
                        return a();
                      },
                      children: (J) =>
                        (() => {
                          var D = co();
                          return (
                            t(
                              D,
                              (() => {
                                var B = G(() => !!J().restored);
                                return () =>
                                  B()
                                    ? "File restored."
                                    : J().conflicts.length
                                      ? "The file changed. Your later edits were kept; review its latest state."
                                      : "No file was changed.";
                              })(),
                            ),
                            D
                          );
                        })(),
                    }),
                    null,
                  ),
                  x(
                    (J) => {
                      var D = `Undo task change ${w().path}`,
                        B = e.pending || e.locked || !w().canRestore;
                      return (
                        D !== J.e && z(A, "aria-label", (J.e = D)),
                        B !== J.t && (A.disabled = J.t = B),
                        J
                      );
                    },
                    { e: void 0, t: void 0 },
                  ),
                  L
                );
              })(),
          }),
          null,
        ),
        x(() => (m.disabled = e.pending || !e.task.files.length)),
        f
      );
    })()
  );
}