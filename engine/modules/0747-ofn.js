
var ofn = "~effect/unstable/process/ChildProcess",
  b3s,
  Vpt = (e, t, r) =>
    Object.assign(Object.create(b3s), { _tag: "StandardCommand", command: e, args: t, options: r }),
  Lh = function (...t) {
    if (afn(t[0])) {
      let [H, ...u] = t,
        f = Hfn(H, u);
      return Vpt(f[0] ?? "", f.slice(1), {});
    }
    if (typeof t[0] === "object" && !Array.isArray(t[0]) && !afn(t[0])) {
      let H = t[0];
      return function (u, ...f) {
        let d = Hfn(u, f);
        return Vpt(d[0] ?? "", d.slice(1), H);
      };
    }
    if (typeof t[0] === "string" && !Array.isArray(t[1])) {
      let [H, u = {}] = t;
      return Vpt(H, [], u);
    }
    let [r, s = [], a = {}] = t;
    return Vpt(r, s, a);
  },
  afn = (e) => Array.isArray(e) && "raw" in e && Array.isArray(e.raw),
  cse = (e) => {
    let t = /^fd(\d+)$/.exec(e);
    if (t === null) return;
    let r = parseInt(t[1], 10);
    return r >= 3 ? r : void 0;
  },
  qpt = (e) => `fd${e}`,
  Hfn = (e, t) => {
    let r = [];
    for (let [s, a] of e.entries()) r = j3s(e, t, r, a, s);
    return r;
  },
  j3s = (e, t, r, s, a) => {
    let H = e.raw[a];
    if (H === void 0) throw Error(`Invalid backslash sequence: ${e.raw[a]}`);
    let { hasLeadingWhitespace: u, hasTrailingWhitespace: f, tokens: d } = C3s(s, H),
      _ = ufn(r, d, u);
    if (a === t.length) return _;
    let L = t[a],
      I = Array.isArray(L) ? L.map((D) => cfn(D)) : [cfn(L)];
    return ufn(_, I, f);
  },
  cfn = (e) => {
    if (typeof e === "string") return e;
    return String(e);
  },
  Afn,
  P3s,
  C3s = (e, t) => {
    if (t.length === 0) return { tokens: [], hasLeadingWhitespace: !1, hasTrailingWhitespace: !1 };
    let r = Afn.has(t[0]),
      s = [],
      a = 0;
    for (let u = 0, f = 0; u < e.length; u += 1, f += 1) {
      let d = t[f];
      if (Afn.has(d)) {
        if (a !== u) s.push(e.slice(a, u));
        a = u + 1;
      } else if (d === "\\") {
        let _ = t[f + 1];
        if (
          _ ===
          `
`
        )
          ((u -= 1), (f += 1));
        else if (_ === "u" && t[f + 2] === "{") f = t.indexOf("}", f + 3);
        else f += P3s[_] ?? 1;
      }
    }
    let H = a === e.length;
    if (!H) s.push(e.slice(a));
    return { tokens: s, hasLeadingWhitespace: r, hasTrailingWhitespace: H };
  },
  ufn = (e, t, r) =>
    r || e.length === 0 || t.length === 0
      ? [...e, ...t]
      : [...e.slice(0, -1), `${e.at(-1)}${t.at(0)}`, ...t.slice(1)];