
function va(...e) {
  let n = !1;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    ((n = n || (!!d && kr in d)), (e[c] = typeof d == "function" ? ((n = !0), Pe(d)) : d));
  }
  if (ia && n)
    return new Proxy(
      {
        get(c) {
          for (let d = e.length - 1; d >= 0; d--) {
            const f = mr(e[d])[c];
            if (f !== void 0) return f;
          }
        },
        has(c) {
          for (let d = e.length - 1; d >= 0; d--) if (c in mr(e[d])) return !0;
          return !1;
        },
        keys() {
          const c = [];
          for (let d = 0; d < e.length; d++) c.push(...Object.keys(mr(e[d])));
          return [...new Set(c)];
        },
      },
      ga,
    );
  const i = {},
    s = Object.create(null);
  for (let c = e.length - 1; c >= 0; c--) {
    const d = e[c];
    if (!d) continue;
    const f = Object.getOwnPropertyNames(d);
    for (let u = f.length - 1; u >= 0; u--) {
      const h = f[u];
      if (h === "__proto__" || h === "constructor") continue;
      const m = Object.getOwnPropertyDescriptor(d, h);
      if (!s[h])
        s[h] = m.get
          ? { enumerable: !0, configurable: !0, get: fa.bind((i[h] = [m.get.bind(d)])) }
          : m.value !== void 0
            ? m
            : void 0;
      else {
        const y = i[h];
        y && (m.get ? y.push(m.get.bind(d)) : m.value !== void 0 && y.push(() => m.value));
      }
    }
  }
  const l = {},
    a = Object.keys(s);
  for (let c = a.length - 1; c >= 0; c--) {
    const d = a[c],
      f = s[d];
    f && f.get ? Object.defineProperty(l, d, f) : (l[d] = f ? f.value : void 0);
  }
  return l;
}