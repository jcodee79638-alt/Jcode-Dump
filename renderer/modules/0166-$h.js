
function $h(e) {
  let n, i;
  return (
    vn(() => {
      ((i = document.activeElement), n?.focus({ preventScroll: !0 }));
    }),
    Me(() => {
      if (
        i instanceof HTMLElement &&
        i.isConnected &&
        i.getClientRects().length &&
        getComputedStyle(i).visibility !== "hidden"
      ) {
        i.focus({ preventScroll: !0 });
        return;
      }
      document.querySelector(".workspace-header .mobile-sidebar-toggle")?.focus({ preventScroll: !0 });
    }),
    (() => {
      var s = rh(),
        l = s.firstChild,
        a = l.firstChild,
        c = a.nextSibling;
      _t(a, "click", e.back);
      var d = n;
      return (
        typeof d == "function" ? Rt(d, a) : (n = a),
        t(a, r(Z, { name: "back", size: 18 }), null),
        t(a, () => $.backToChat, null),
        t(c, () => e.title),
        t(s, () => e.children, null),
        x(() => z(s, "aria-label", e.title)),
        s
      );
    })()
  );
}