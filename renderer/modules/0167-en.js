
function en(e) {
  let n, i;
  const s = () => {
    n?.open && document.visibilityState === "visible" && dt() === n && e.onShown?.();
  };
  return (
    Ie(() => {
      e.shownKey;
      const l = dt();
      if (!e.onShown || l !== n) return;
      const a = requestAnimationFrame(s),
        c = setInterval(s, 6e4);
      Me(() => {
        (cancelAnimationFrame(a), clearInterval(c));
      });
    }),
    vn(() => {
      ((i = document.activeElement),
        n?.showModal(),
        n && Dn.push(n),
        ci(n),
        document.addEventListener("visibilitychange", s));
    }),
    Me(() => document.removeEventListener("visibilitychange", s)),
    Me(() => {
      const l = dt() === n;
      n?.close();
      const a = n ? Dn.indexOf(n) : -1;
      (a >= 0 && Dn.splice(a, 1),
        ci(Dn.filter((c) => c.open).at(-1)),
        l && i instanceof HTMLElement && i.isConnected && i.focus());
    }),
    (() => {
      var l = ih(),
        a = l.firstChild,
        c = a.firstChild,
        d = a.nextSibling;
      ((l.$$click = (u) => {
        if (dt() === n && u.target === n && !e.required) {
          const h = n.getBoundingClientRect();
          (u.clientX < h.left || u.clientX > h.right || u.clientY < h.top || u.clientY > h.bottom) &&
            e.close();
        }
      }),
        l.addEventListener("cancel", (u) => {
          (u.preventDefault(), dt() === n && !e.required && e.close());
        }),
        (l.$$keydown = (u) => {
          if (u.key !== "Tab" || dt() !== n || !n) return;
          const h = Array.from(
              n.querySelectorAll(
                'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
              ),
            ).filter((b) => b.getClientRects().length && b.tabIndex >= 0),
            m = h[0],
            y = h.at(-1);
          if (!m || !y) {
            u.preventDefault();
            return;
          }
          if (u.shiftKey && (document.activeElement === m || !n.contains(document.activeElement))) {
            (u.preventDefault(), y.focus());
            return;
          }
          !u.shiftKey &&
            (document.activeElement === y || !n.contains(document.activeElement)) &&
            (u.preventDefault(), m.focus());
        }));
      var f = n;
      return (
        typeof f == "function" ? Rt(f, l) : (n = l),
        t(c, () => e.title),
        t(
          a,
          r(g, {
            get when() {
              return !e.required;
            },
            get children() {
              return r(Xe, {
                name: "close",
                get label() {
                  return $.close;
                },
                get onClick() {
                  return e.close;
                },
              });
            },
          }),
          null,
        ),
        t(
          l,
          r(g, {
            get when() {
              return dt() === n;
            },
            get children() {
              return r(Ar, {
                get value() {
                  return e.notice;
                },
                dismiss: () => e.dismissNotice?.(),
                inline: !0,
              });
            },
          }),
          d,
        ),
        t(d, () => e.children),
        x(
          (u) => {
            var h = `modal ${e.wide ? "modal-wide" : ""} ${e.title === $.settings ? "preferences-modal" : e.title === $.announcement ? "announcement-modal" : ""}`,
              m = e.title;
            return (h !== u.e && Be(l, (u.e = h)), m !== u.t && z(l, "aria-label", (u.t = m)), u);
          },
          { e: void 0, t: void 0 },
        ),
        l
      );
    })()
  );
}