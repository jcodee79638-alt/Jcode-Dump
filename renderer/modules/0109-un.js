
function un(e) {
  const n = $a(),
    [i, s] = S(!1),
    [l, a] = S(0),
    [c, d] = S({ left: "0px", top: "0px", width: "240px", "max-height": "280px" }),
    [f, u] = S("below");
  let h = "",
    m,
    y,
    b;
  function j() {
    (b.hidePopover(), s(!1), (h = ""), clearTimeout(m));
  }
  function w(D) {
    if (e.disabled || !e.options.length) return;
    (a(
      D ??
        Math.max(
          0,
          e.options.findIndex((N) => N.value === e.value),
        ),
    ),
      b.showPopover());
    const B = b.getBoundingClientRect().width / b.offsetWidth || 1,
      H = y.getBoundingClientRect(),
      V = Math.min(Math.max(H.width, (e.compact ? 232 : 260) * B), window.innerWidth - 24),
      E = Math.max(0, window.innerHeight - H.bottom - 18),
      me = Math.max(0, H.top - 18),
      P = Math.max(0, Math.min(336 * B, Math.max(E, me), window.innerHeight - 24));
    d({
      left: `${Math.max(12, Math.min(H.left, window.innerWidth - V - 12)) / B}px`,
      top: `${12 / B}px`,
      width: `${V / B}px`,
      "max-height": `${P / B}px`,
    });
    const v = b.getBoundingClientRect().height,
      M = E >= v || E >= me;
    (u(M ? "below" : "above"),
      d((N) => ({
        ...N,
        top: `${Math.max(12, Math.min(M ? H.bottom + 6 : H.top - v - 6, window.innerHeight - v - 12)) / B}px`,
      })),
      s(!0),
      queueMicrotask(O));
  }
  function L(D) {
    if (e.disabled) {
      j();
      return;
    }
    const B = e.options[D];
    B?.disabled || (B && e.onChange(B.value), j(), y.focus());
  }
  function O() {
    const D = b.querySelectorAll('[role="option"]')[l()];
    D &&
      (D.offsetTop < b.scrollTop && (b.scrollTop = D.offsetTop),
      D.offsetTop + D.offsetHeight > b.scrollTop + b.clientHeight &&
        (b.scrollTop = D.offsetTop + D.offsetHeight - b.clientHeight));
  }
  Ie(() => {
    (e.disabled || !e.options.length) && i() && j();
  });
  const _ = (D) => {
      i() && !b.contains(D.target) && !y.contains(D.target) && j();
    },
    R = () => {
      i() && j();
    };
  (document.addEventListener("pointerdown", _), window.addEventListener("resize", R));
  const A = (D) => {
      !b.contains(D.target) && i() && j();
    },
    J = (D) => {
      i() && !b.contains(D.target) && D.target !== y && j();
    };
  return (
    window.addEventListener("scroll", A, !0),
    document.addEventListener("focusin", J),
    Me(() => {
      (clearTimeout(m),
        document.removeEventListener("pointerdown", _),
        window.removeEventListener("resize", R),
        window.removeEventListener("scroll", A, !0),
        document.removeEventListener("focusin", J));
    }),
    (() => {
      var D = Js(),
        B = D.firstChild,
        H = B.firstChild,
        V = B.nextSibling;
      ((B.$$keydown = (P) => {
        if (P.key === "Tab") {
          i() && j();
          return;
        }
        if (P.key === "Escape" && i()) {
          (P.preventDefault(), P.stopPropagation(), j());
          return;
        }
        if (P.key.length === 1 && P.key !== " " && !P.ctrlKey && !P.metaKey && !P.altKey) {
          (P.preventDefault(),
            i() || w(),
            (h += P.key.toLocaleLowerCase()),
            clearTimeout(m),
            (m = setTimeout(() => {
              h = "";
            }, 650)));
          const v = e.options.findIndex((M) => M.label.toLocaleLowerCase().startsWith(h));
          (v >= 0 && a(v), O());
          return;
        }
        if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(P.key)) {
          if ((P.preventDefault(), !i())) {
            w(P.key === "Home" ? 0 : P.key === "End" ? e.options.length - 1 : void 0);
            return;
          }
          if (P.key === "Enter" || P.key === " ") {
            L(l());
            return;
          }
          (a((v) =>
            P.key === "Home"
              ? 0
              : P.key === "End"
                ? e.options.length - 1
                : (v + (P.key === "ArrowDown" ? 1 : -1) + e.options.length) % e.options.length,
          ),
            O());
        }
      }),
        (B.$$click = () => (i() ? j() : w())));
      var E = y;
      (typeof E == "function" ? Rt(E, B) : (y = B),
        z(B, "aria-controls", n),
        t(
          B,
          r(g, {
            get when() {
              return e.prefix;
            },
            get children() {
              var P = Fs();
              return (t(P, () => e.prefix), P);
            },
          }),
          H,
        ),
        t(H, () => e.options.find((P) => P.value === e.value)?.label ?? e.value),
        t(B, r(Z, { name: "down", size: 14 }), null));
      var me = b;
      return (
        typeof me == "function" ? Rt(me, V) : (b = V),
        z(V, "id", n),
        t(
          V,
          r(_e, {
            get each() {
              return e.options;
            },
            children: (P, v) =>
              (() => {
                var M = Bs(),
                  N = M.firstChild,
                  re = N.firstChild,
                  F = N.nextSibling;
                return (
                  (M.$$click = () => L(v())),
                  (M.$$pointerdown = (p) => p.preventDefault()),
                  (M.$$pointermove = () => a(v())),
                  t(re, () => P.label),
                  t(
                    N,
                    (() => {
                      var p = G(() => !!P.detail);
                      return () =>
                        p() &&
                        (() => {
                          var ee = Hs();
                          return (t(ee, () => P.detail), ee);
                        })();
                    })(),
                    null,
                  ),
                  t(
                    F,
                    (() => {
                      var p = G(() => e.value === P.value);
                      return () => p() && r(Z, { name: "check", size: 16 });
                    })(),
                  ),
                  x(
                    (p) => {
                      var ee = `${n}-${v()}`,
                        ie = e.value === P.value,
                        te = P.disabled || void 0,
                        U = l() === v();
                      return (
                        ee !== p.e && z(M, "id", (p.e = ee)),
                        ie !== p.t && z(M, "aria-selected", (p.t = ie)),
                        te !== p.a && z(M, "aria-disabled", (p.a = te)),
                        U !== p.o && M.classList.toggle("option-active", (p.o = U)),
                        p
                      );
                    },
                    { e: void 0, t: void 0, a: void 0, o: void 0 },
                  ),
                  M
                );
              })(),
          }),
        ),
        x(
          (P) => {
            var v = `select-control ${e.class ?? ""}`,
              M = e.label,
              N = i(),
              re = i() ? `${n}-${l()}` : void 0,
              F = e.disabled,
              p = e.label,
              ee = !!e.compact,
              ie = f(),
              te = c();
            return (
              v !== P.e && Be(D, (P.e = v)),
              M !== P.t && z(B, "aria-label", (P.t = M)),
              N !== P.a && z(B, "aria-expanded", (P.a = N)),
              re !== P.o && z(B, "aria-activedescendant", (P.o = re)),
              F !== P.i && (B.disabled = P.i = F),
              p !== P.n && z(V, "aria-label", (P.n = p)),
              ee !== P.s && V.classList.toggle("select-menu-compact", (P.s = ee)),
              ie !== P.h && z(V, "data-placement", (P.h = ie)),
              (P.r = wa(V, te, P.r)),
              P
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
        D
      );
    })()
  );
}
Oe(["click", "keydown", "pointermove", "pointerdown"]);