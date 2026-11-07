
function ph(e) {
  const [n, i] = S(""),
    [s, l] = S(""),
    [a, c] = S(""),
    [d, f] = S(!1),
    [u, h] = S(""),
    [m, y] = S(Date.now()),
    b = () => Math.max(0, Math.ceil(((e.issue?.retryAt ?? 0) - m()) / 1e3)),
    j = () => e.busy || b() > 0;
  return (
    Ie(() => {
      (e.mode, l(""), c(""), h(""), f(!1));
    }),
    Ie(() => {
      if (!e.issue?.retryAt) return;
      y(Date.now());
      const w = setInterval(() => y(Date.now()), 1e3);
      Me(() => clearInterval(w));
    }),
    (() => {
      var w = hh(),
        L = w.firstChild,
        O = L.firstChild,
        _ = O.nextSibling,
        R = _.nextSibling,
        A = R.nextSibling,
        J = L.nextSibling,
        D = J.firstChild,
        B = D.firstChild,
        H = B.firstChild,
        V = H.firstChild,
        E = V.nextSibling,
        me = B.nextSibling,
        P = D.nextSibling;
      return (
        t(_, () => $.app),
        t(
          R,
          (() => {
            var v = G(() => e.mode === "password");
            return () =>
              v() ? $.passwordChange : G(() => e.mode === "register")() ? $.registerTitle : $.signInTitle;
          })(),
        ),
        t(
          A,
          (() => {
            var v = G(() => e.mode === "password");
            return () => (v() ? $.passwordChangeDetail : $.authDetail);
          })(),
        ),
        t(
          J,
          r(g, {
            get when() {
              return e.mode !== "password";
            },
            get children() {
              var v = sh(),
                M = v.firstChild,
                N = M.nextSibling;
              return (
                (M.$$click = () => e.setMode("login")),
                t(M, () => $.signIn),
                (N.$$click = () => e.setMode("register")),
                t(N, () => $.createAccount),
                x(
                  (re) => {
                    var F = e.mode === "login",
                      p = e.busy,
                      ee = e.mode === "register",
                      ie = e.busy;
                    return (
                      F !== re.e && M.classList.toggle("selected", (re.e = F)),
                      p !== re.t && (M.disabled = re.t = p),
                      ee !== re.a && N.classList.toggle("selected", (re.a = ee)),
                      ie !== re.o && (N.disabled = re.o = ie),
                      re
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 },
                ),
                v
              );
            },
          }),
          D,
        ),
        D.addEventListener("submit", (v) => {
          if ((v.preventDefault(), !j())) {
            if ((h(""), e.mode !== "login" && s() !== a())) {
              h($.passwordMismatch);
              return;
            }
            e.submit({ email: n().trim(), password: s() }).then(() => {
              (l(""), c(""));
            });
          }
        }),
        t(
          D,
          r(g, {
            get when() {
              return e.mode !== "password";
            },
            get children() {
              var v = lh(),
                M = v.firstChild;
              return (
                t(v, () => $.email, M),
                (M.$$input = (N) => i(N.currentTarget.value)),
                x(() => (M.disabled = e.busy)),
                x(() => (M.value = n())),
                v
              );
            },
          }),
          B,
        ),
        t(
          D,
          r(g, {
            get when() {
              return e.mode === "register";
            },
            get children() {
              return oh();
            },
          }),
          B,
        ),
        t(
          B,
          (() => {
            var v = G(() => e.mode === "password");
            return () => (v() ? $.newPassword : $.password);
          })(),
          H,
        ),
        (V.$$input = (v) => l(v.currentTarget.value)),
        (E.$$click = () => f(!d())),
        t(E, () => (d() ? "Hide" : "Show")),
        t(
          D,
          r(g, {
            get when() {
              return e.mode !== "login";
            },
            get children() {
              return [
                (() => {
                  var v = ch(),
                    M = v.firstChild;
                  return (
                    t(
                      v,
                      (() => {
                        var N = G(() => e.mode === "password");
                        return () => (N() ? $.passwordConfirm : "Confirm password");
                      })(),
                      M,
                    ),
                    (M.$$input = (N) => c(N.currentTarget.value)),
                    x(
                      (N) => {
                        var re = d() ? "text" : "password",
                          F = e.busy;
                        return (
                          re !== N.e && z(M, "type", (N.e = re)),
                          F !== N.t && (M.disabled = N.t = F),
                          N
                        );
                      },
                      { e: void 0, t: void 0 },
                    ),
                    x(() => (M.value = a())),
                    v
                  );
                })(),
                dh(),
              ];
            },
          }),
          me,
        ),
        t(
          D,
          r(g, {
            get when() {
              return u() || e.issue;
            },
            get children() {
              var v = Ii();
              return (
                t(v, () => u() || (e.issue?.retryAt ? "Too many sign-in attempts." : e.issue?.message)),
                v
              );
            },
          }),
          me,
        ),
        t(
          D,
          r(g, {
            get when() {
              return b() > 0;
            },
            get children() {
              var v = uh(),
                M = v.firstChild,
                N = M.nextSibling,
                re = N.nextSibling,
                F = re.nextSibling;
              return (F.nextSibling, t(v, () => Math.floor(b() / 60), N), t(v, () => b() % 60, F), v);
            },
          }),
          me,
        ),
        t(
          me,
          r(g, {
            get when() {
              return e.busy;
            },
            get children() {
              return qi();
            },
          }),
          null,
        ),
        t(
          me,
          (() => {
            var v = G(() => !!e.busy);
            return () =>
              v()
                ? $.loading
                : G(() => e.mode === "password")()
                  ? $.save
                  : G(() => e.mode === "register")()
                    ? $.createAccount
                    : $.signIn;
          })(),
          null,
        ),
        t(
          me,
          r(g, {
            get when() {
              return !e.busy;
            },
            get children() {
              return r(Z, { name: "chevron", size: 17 });
            },
          }),
          null,
        ),
        _t(P, "click", e.browse),
        t(P, r(Z, { name: "folder", size: 17 }), null),
        t(P, () => $.browseLocal, null),
        x(
          (v) => {
            var M = e.mode === "password" ? $.newPassword : $.password,
              N = d() ? "text" : "password",
              re = e.mode === "login" ? "current-password" : "new-password",
              F = e.mode === "login" ? void 0 : 8,
              p = e.busy,
              ee = d() ? "Hide password" : "Show password",
              ie = e.busy,
              te = j(),
              U = e.busy;
            return (
              M !== v.e && z(V, "aria-label", (v.e = M)),
              N !== v.t && z(V, "type", (v.t = N)),
              re !== v.a && z(V, "autocomplete", (v.a = re)),
              F !== v.o && z(V, "minlength", (v.o = F)),
              p !== v.i && (V.disabled = v.i = p),
              ee !== v.n && z(E, "aria-label", (v.n = ee)),
              ie !== v.s && (E.disabled = v.s = ie),
              te !== v.h && (me.disabled = v.h = te),
              U !== v.r && (P.disabled = v.r = U),
              v
            );
          },
          {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0,
            i: void 0,
            n: void 0,
            s: void 0,
            h: void 0,
            r: void 0,
          },
        ),
        x(() => (V.value = s())),
        w
      );
    })()
  );
}