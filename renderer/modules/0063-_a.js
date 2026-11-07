
function _a(e) {
  let n = e.target;
  const i = `$$${e.type}`,
    s = e.target,
    l = e.currentTarget,
    a = (f) => Object.defineProperty(e, "target", { configurable: !0, value: f }),
    c = () => {
      const f = n[i];
      if (f && !n.disabled) {
        const u = n[`${i}Data`];
        if ((u !== void 0 ? f.call(n, u, e) : f.call(n, e), e.cancelBubble)) return;
      }
      return (n.host && typeof n.host != "string" && !n.host._$host && n.contains(e.target) && a(n.host), !0);
    },
    d = () => {
      for (; c() && (n = n._$host || n.parentNode || n.host););
    };
  if (
    (Object.defineProperty(e, "currentTarget", {
      configurable: !0,
      get() {
        return n || document;
      },
    }),
    e.composedPath)
  ) {
    const f = e.composedPath();
    a(f[0]);
    for (let u = 0; u < f.length - 2 && ((n = f[u]), !!c()); u++) {
      if (n._$host) {
        ((n = n._$host), d());
        break;
      }
      if (n.parentNode === l) break;
    }
  } else d();
  a(s);
}