
function mh(e) {
  let n;
  const i = (s = !1) => {
    n?.open && ((n.open = !1), s && n.querySelector("summary")?.focus());
  };
  return (
    vn(() => {
      const s = (a) => {
          a.target instanceof Node && !n?.contains(a.target) && i();
        },
        l = (a) => {
          a.target instanceof Element && a.target.closest("button") && i(!0);
        };
      (document.addEventListener("pointerdown", s),
        n?.addEventListener("click", l, !0),
        Me(() => {
          (document.removeEventListener("pointerdown", s), n?.removeEventListener("click", l, !0));
        }));
    }),
    (() => {
      var s = nh(),
        l = s.firstChild,
        a = l.nextSibling;
      ((s.$$keydown = (d) => {
        if (d.key === "Escape" && n?.open) {
          (d.preventDefault(), d.stopPropagation(), i(!0));
          return;
        }
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(d.key) || !n) return;
        (d.preventDefault(), (n.open = !0));
        const f = Array.from(n.querySelectorAll("button:not([disabled])")),
          u = f.indexOf(document.activeElement);
        f[
          d.key === "Home"
            ? 0
            : d.key === "End"
              ? f.length - 1
              : d.key === "ArrowDown"
                ? (u + 1) % f.length
                : (u - 1 + f.length) % f.length
        ]?.focus();
      }),
        (s.$$focusout = (d) => {
          d.relatedTarget instanceof Node && !d.currentTarget.contains(d.relatedTarget) && i();
        }));
      var c = n;
      return (
        typeof c == "function" ? Rt(c, s) : (n = s),
        t(l, r(Z, { name: "more", size: 19 })),
        t(a, () => e.children),
        x(
          (d) => {
            var f = e.label,
              u = e.label;
            return (f !== d.e && z(l, "aria-label", (d.e = f)), u !== d.t && z(l, "title", (d.t = u)), d);
          },
          { e: void 0, t: void 0 },
        ),
        s
      );
    })()
  );
}