
var oun = "~effect/http/UrlParams",
  BBs,
  aun = (e) => {
    let t = Object.create(BBs);
    return ((t.params = e), t);
  },
  zW = (e) => {
    let t = Hun(e),
      r = [];
    for (let s = 0; s < t.length; s++)
      if (Array.isArray(t[s][0])) {
        let [a, H] = t[s];
        r.push([`${a[0]}[${a.slice(1).join("][")}]`, H]);
      } else r.push(t[s]);
    return aun(r);
  },
  Hun = (e) => {
    let t = typeof e[Symbol.iterator] === "function" ? Xg(e) : Object.entries(e),
      r = [];
    for (let [s, a] of t)
      if (Array.isArray(a)) {
        for (let H = 0; H < a.length; H++) if (a[H] !== void 0) r.push([s, String(a[H])]);
      } else if (typeof a === "object") {
        let H = Hun(a);
        for (let [u, f] of H) r.push([[s, ...(typeof u === "string" ? [u] : u)], f]);
      } else if (a !== void 0) r.push([s, String(a)]);
    return r;
  },
  RBs,
  WBs,
  UZt,
  cun,
  NZt,
  FZt = (e, t, r) => {
    try {
      let s = new URL(e, VBs());
      for (let a = 0; a < t.params.length; a++) {
        let [H, u] = t.params[a];
        if (u !== void 0) s.searchParams.append(H, u);
      }
      if (r !== void 0) s.hash = r;
      return D$(s);
    } catch (s) {
      return dh(new NZt({ cause: s }));
    }
  },
  Aun = (e) => new URLSearchParams(e.params).toString(),
  VBs = () => {
    if (
      "location" in globalThis &&
      globalThis.location !== void 0 &&
      globalThis.location.origin !== void 0 &&
      globalThis.location.pathname !== void 0
    )
      return location.origin + location.pathname;
    return;
  },
  uun = (e) => {
    let t = {};
    for (let [r, s] of e.params) {
      let a = t[r];
      if (a === void 0) t[r] = s;
      else if (typeof a === "string") t[r] = [a, s];
      else a.push(s);
    }
    return t;
  };