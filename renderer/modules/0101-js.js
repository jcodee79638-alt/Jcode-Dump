
function js(e) {
  const n = () =>
      typeof e.update.progress == "number" && Number.isFinite(e.update.progress)
        ? Math.max(0, Math.min(100, Math.floor(e.update.progress)))
        : void 0,
    i = () => e.update.status === "downloading",
    s = () => e.update.status === "error",
    l = () =>
      s()
        ? "Update interrupted"
        : e.update.status === "ready"
          ? "Opening Jac Code"
          : e.update.status === "verifying"
            ? "Verifying update"
            : i()
              ? "Updating Jac Code"
              : "Preparing Jac Code",
    a = () =>
      s()
        ? "Update paused"
        : i()
          ? "Downloading update"
          : e.update.status === "verifying"
            ? "Verifying update"
            : e.update.status === "ready"
              ? "Restarting Jac Code"
              : e.update.status === "available"
                ? "Preparing update"
                : "Checking for updates";
  return (() => {
    var c = Cs(),
      d = c.firstChild,
      f = d.firstChild,
      u = f.nextSibling;
    u.firstChild;
    var h = u.nextSibling,
      m = h.nextSibling,
      y = m.nextSibling,
      b = y.firstChild,
      j = y.nextSibling;
    return (
      t(
        u,
        r(g, {
          get when() {
            return e.update.latest;
          },
          get children() {
            var w = ys();
            return (w.firstChild, t(w, () => e.update.latest, null), w);
          },
        }),
        null,
      ),
      t(h, l),
      t(m, () =>
        s()
          ? "Your installation and saved work are kept. Check your connection and retry."
          : "Your projects, chats and sign-in will be preserved.",
      ),
      t(b, a),
      t(
        y,
        r(g, {
          get when() {
            return G(() => !!i())() && n() !== void 0;
          },
          get children() {
            var w = ks(),
              L = w.firstChild;
            return (t(w, n, L), w);
          },
        }),
        null,
      ),
      Rt(
        (w) =>
          Ie(() => {
            const L = s() ? 0 : i() ? n() : void 0;
            if (L === void 0) return w.removeAttribute("value");
            w.setAttribute("value", String(L));
          }),
        j,
      ),
      t(
        d,
        r(g, {
          get when() {
            return !s();
          },
          get fallback() {
            return (() => {
              var w = Ss(),
                L = w.firstChild,
                O = L.nextSibling;
              return (
                _t(L, "click", e.retry),
                t(L, () => (e.pending ? "Checking…" : "Try again")),
                _t(O, "click", e.close),
                x(() => (L.disabled = e.pending)),
                w
              );
            })();
          },
          get children() {
            return xs();
          },
        }),
        null,
      ),
      x(
        (w) => {
          var L = !s(),
            O = a();
          return (L !== w.e && z(c, "aria-busy", (w.e = L)), O !== w.t && z(j, "aria-label", (w.t = O)), w);
        },
        { e: void 0, t: void 0 },
      ),
      c
    );
  })();
}
Oe(["click"]);