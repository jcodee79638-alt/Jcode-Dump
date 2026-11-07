
function Us(e) {
  const [n, i] = S(""),
    [s, l] = S(),
    [a, c] = S(!1),
    [d, f] = S(""),
    [u, h] = S("");
  async function m() {
    if (a()) return;
    const y = s();
    (c(!0), f(""), h(""));
    try {
      const b = await window.jac.planKey(
        y
          ? {
              code: n(),
              confirm: !0,
              expectedPlanId: y.currentPlanId,
              expectedPlanExpiresAt: y.currentPlanExpiresAt,
            }
          : { code: n() },
      );
      if (y || b.alreadyClaimed) {
        (i(""),
          l(void 0),
          h(
            b.alreadyClaimed
              ? "This key was already claimed by your account."
              : `${b.planName} activated. Your plan is ready.`,
          ),
          await e.onClaimed().catch(() => h("Key activated. Refresh your account to see the updated plan.")));
        return;
      }
      l(b);
    } catch (b) {
      (l(void 0), f(b instanceof Error ? b.message : "Could not check this key. Try again."));
    } finally {
      c(!1);
    }
  }
  return (() => {
    var y = Ns(),
      b = y.firstChild,
      j = b.nextSibling,
      w = j.nextSibling,
      L = w.firstChild,
      O = L.nextSibling,
      _ = O.nextSibling,
      R = _.firstChild;
    return (
      w.addEventListener("submit", (A) => {
        (A.preventDefault(), m());
      }),
      (O.$$input = (A) => {
        (i(A.currentTarget.value), l(void 0), f(""), h(""));
      }),
      z(O, "spellcheck", !1),
      t(
        w,
        r(g, {
          get when() {
            return s();
          },
          children: (A) =>
            (() => {
              var J = Os(),
                D = J.firstChild,
                B = D.firstChild,
                H = D.nextSibling;
              return (
                t(D, () => A().planName, B),
                t(
                  D,
                  (() => {
                    var V = G(() => !!A().durationDays);
                    return () => (V() ? `${A().durationDays} days` : "Permanent");
                  })(),
                  null,
                ),
                t(
                  H,
                  (() => {
                    var V = G(() => !!A().planExpiresAt);
                    return () => (V() ? `Access ends in ${Bn(A().planExpiresAt)}` : "No plan expiry.");
                  })(),
                ),
                t(
                  J,
                  r(g, {
                    get when() {
                      return A().replacesPaidPlan;
                    },
                    get children() {
                      return zs();
                    },
                  }),
                  null,
                ),
                J
              );
            })(),
        }),
        _,
      ),
      t(
        w,
        r(g, {
          get when() {
            return d();
          },
          get children() {
            var A = Ls();
            return (t(A, d), A);
          },
        }),
        _,
      ),
      t(
        w,
        r(g, {
          get when() {
            return u();
          },
          get children() {
            var A = Ms();
            return (t(A, u), A);
          },
        }),
        _,
      ),
      t(
        R,
        (() => {
          var A = G(() => !!a());
          return () => (A() ? "Checking…" : s() ? "Activate plan" : "Check key");
        })(),
      ),
      t(
        _,
        r(g, {
          get when() {
            return s();
          },
          get children() {
            var A = Ds();
            return (
              (A.$$click = () => {
                (l(void 0), i(""));
              }),
              x(() => (A.disabled = a())),
              A
            );
          },
        }),
        null,
      ),
      x(
        (A) => {
          var J = a(),
            D = a() || !n().trim();
          return (J !== A.e && (O.disabled = A.e = J), D !== A.t && (R.disabled = A.t = D), A);
        },
        { e: void 0, t: void 0 },
      ),
      x(() => (O.value = n())),
      y
    );
  })();
}
Oe(["input", "click"]);