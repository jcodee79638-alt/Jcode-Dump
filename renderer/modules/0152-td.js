
function td(e) {
  const [n, i] = S(),
    [s, l] = S(!1),
    [a, c] = S("");
  let d = 0;
  (Ie(() => {
    (e.taskId, d++, i(void 0), c(""), l(!1));
  }),
    Me(() => {
      d++;
    }));
  async function f() {
    const h = e.taskId,
      m = ++d;
    (l(!0),
      c(""),
      i(void 0),
      await window.jac
        .supportReport(h ? { taskId: h } : void 0)
        .then((y) => {
          m === d && i(y);
        })
        .catch(() => {
          m === d && c("The local support report could not be prepared. Try again.");
        })
        .finally(() => {
          m === d && l(!1);
        }));
  }
  async function u() {
    if (!n() || s()) return;
    const h = e.taskId,
      m = ++d;
    (l(!0),
      c(""),
      await window.jac
        .exportSupportReport(h ? { taskId: h } : void 0)
        .then((y) => {
          m === d &&
            c(y.saved ? "Support report saved on this computer." : "Export cancelled. No report was saved.");
        })
        .catch(() => {
          m === d && c("The support report could not be saved. Try again.");
        })
        .finally(() => {
          m === d && l(!1);
        }));
  }
  return (() => {
    var h = Xc(),
      m = h.firstChild,
      y = m.nextSibling,
      b = y.nextSibling,
      j = b.firstChild;
    return (
      (j.$$click = () => {
        f();
      }),
      t(
        j,
        (() => {
          var w = G(() => !!s());
          return () => (w() ? "Preparing…" : n() ? "Refresh report preview" : "Preview support report");
        })(),
      ),
      t(
        h,
        r(g, {
          get when() {
            return n();
          },
          children: (w) =>
            (() => {
              var L = ed(),
                O = L.firstChild,
                _ = O.nextSibling,
                R = _.nextSibling,
                A = R.nextSibling;
              return (
                t(_, () => JSON.stringify(w(), null, 2)),
                (A.$$click = () => {
                  u();
                }),
                x(() => (A.disabled = s())),
                L
              );
            })(),
        }),
        null,
      ),
      t(
        h,
        r(g, {
          get when() {
            return a();
          },
          get children() {
            var w = Qc();
            return (t(w, a), w);
          },
        }),
        null,
      ),
      x(
        (w) => {
          var L = s(),
            O = s();
          return (L !== w.e && z(h, "aria-busy", (w.e = L)), O !== w.t && (j.disabled = w.t = O), w);
        },
        { e: void 0, t: void 0 },
      ),
      h
    );
  })();
}
Oe(["click"]);