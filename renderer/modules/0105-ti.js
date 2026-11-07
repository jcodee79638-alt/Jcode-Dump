
function ti(e) {
  const [n, i] = S(!1),
    [s, l] = S("");
  async function a() {
    if (!n()) {
      (i(!0), l(""));
      try {
        await window.jac.openPlans();
      } catch {
        l("Could not open Jaccode.net. Please try again.");
      } finally {
        i(!1);
      }
    }
  }
  return r(g, {
    get when() {
      return Tr(e.account);
    },
    children: (c) =>
      (() => {
        var d = Is(),
          f = d.firstChild,
          u = f.firstChild,
          h = u.firstChild,
          m = h.nextSibling,
          y = m.firstChild,
          b = y.firstChild,
          j = y.nextSibling,
          w = u.nextSibling,
          L = f.nextSibling,
          O = L.firstChild;
        return (
          t(h, r(Z, { name: "arrow", size: 18 })),
          t(y, () => e.account.plan, b),
          t(j, () => c().title),
          t(w, () => c().message),
          t(
            f,
            r(g, {
              get when() {
                return G(() => !e.compact)() && c().plans.length;
              },
              get children() {
                var _ = Ts();
                return (
                  t(
                    _,
                    r(_e, {
                      get each() {
                        return c().plans;
                      },
                      children: (R) =>
                        (() => {
                          var A = qs();
                          return (t(A, R), A);
                        })(),
                    }),
                  ),
                  _
                );
              },
            }),
            null,
          ),
          (O.$$click = () => {
            a();
          }),
          t(
            O,
            (() => {
              var _ = G(() => !!n());
              return () => (_() ? "Opening…" : G(() => !!e.compact)() ? "Get more usage" : c().cta);
            })(),
            null,
          ),
          t(O, r(Z, { name: "external", size: 15 }), null),
          t(
            L,
            r(g, {
              get when() {
                return G(() => !!e.compact)() && e.onAccount;
              },
              get children() {
                var _ = As();
                return (_t(_, "click", e.onAccount), _);
              },
            }),
            null,
          ),
          t(
            L,
            r(g, {
              get when() {
                return G(() => !!(!e.compact && e.onReset))() && e.account.bankedResets > 0;
              },
              get children() {
                var _ = Es(),
                  R = _.firstChild,
                  A = R.nextSibling;
                return (_t(_, "click", e.onReset), t(A, () => e.account.bankedResets), _);
              },
            }),
            null,
          ),
          t(
            d,
            r(g, {
              get when() {
                return !e.compact;
              },
              get children() {
                return Ps();
              },
            }),
            null,
          ),
          t(
            d,
            r(g, {
              get when() {
                return s();
              },
              get children() {
                var _ = Rs();
                return (t(_, s), _);
              },
            }),
            null,
          ),
          x(
            (_) => {
              var R = !!e.compact,
                A = n();
              return (
                R !== _.e && d.classList.toggle("usage-upgrade-compact", (_.e = R)),
                A !== _.t && (O.disabled = _.t = A),
                _
              );
            },
            { e: void 0, t: void 0 },
          ),
          d
        );
      })(),
  });
}
Oe(["click"]);