
function Yd(e) {
  const [n, i] = S(""),
    [s, l] = S(),
    [a, c] = S(!1),
    [d, f] = S("");
  let u = 0;
  (Ie(() => {
    (e.directory, u++, i(""), l(void 0), c(!1), f(""));
  }),
    Me(() => u++));
  async function h() {
    const m = ++u,
      y = e.directory,
      b = n();
    b.trim() &&
      (c(!0),
      f(""),
      l(void 0),
      await window.jac
        .searchProject({ directory: y, query: b })
        .then((j) => {
          m === u && l(j);
        })
        .catch(() => {
          m === u && f("Project search could not finish. Check the folder and try again.");
        })
        .finally(() => {
          m === u && c(!1);
        }));
  }
  return (() => {
    var m = Jd(),
      y = m.firstChild,
      b = y.nextSibling,
      j = b.firstChild,
      w = j.nextSibling,
      L = w.nextSibling;
    return (
      b.nextSibling,
      b.addEventListener("submit", (O) => {
        (O.preventDefault(), h());
      }),
      (w.$$input = (O) => i(O.currentTarget.value)),
      t(
        m,
        r(g, {
          get when() {
            return a();
          },
          get children() {
            return Ud();
          },
        }),
        null,
      ),
      t(
        m,
        r(g, {
          get when() {
            return d();
          },
          get children() {
            var O = Fd();
            return (t(O, d), O);
          },
        }),
        null,
      ),
      t(
        m,
        r(g, {
          get when() {
            return s();
          },
          children: (O) => [
            (() => {
              var _ = Bd(),
                R = _.firstChild,
                A = R.nextSibling,
                J = A.nextSibling,
                D = J.nextSibling;
              return (
                D.nextSibling,
                t(_, () => O().matches.length, R),
                t(_, () => O().filesScanned, A),
                t(_, () => O().query, D),
                t(
                  _,
                  () => (O().truncated ? " · Search limit reached; refine the text to narrow results." : ""),
                  null,
                ),
                _
              );
            })(),
            r(_e, {
              get each() {
                return O().matches;
              },
              get fallback() {
                return Hd();
              },
              children: (_) =>
                (() => {
                  var R = Wd(),
                    A = R.firstChild,
                    J = A.firstChild,
                    D = A.nextSibling;
                  return (
                    (R.$$click = () => e.onSelect(_.path, _.line)),
                    t(A, () => _.path, J),
                    t(A, () => _.line, null),
                    t(D, () => _.text),
                    R
                  );
                })(),
            }),
          ],
        }),
        null,
      ),
      x(
        (O) => {
          var _ = a(),
            R = a() || !n().trim();
          return (_ !== O.e && z(m, "aria-busy", (O.e = _)), R !== O.t && (L.disabled = O.t = R), O);
        },
        { e: void 0, t: void 0 },
      ),
      x(() => (w.value = n())),
      m
    );
  })();
}
Oe(["input", "click"]);