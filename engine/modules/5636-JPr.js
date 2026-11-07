
var JPr = 2147483647,
  dQi = 1e7,
  zPr = 1e7,
  cwt = (e) => Zae(ehe(e, e, "", "", "", "", { context: 0 })),
  mQi = (e) => new Map(e.map((t) => [t.file, { additions: t.additions, deletions: t.deletions }])),
  DYa = (...e) => {
    let t = new Map();
    return (
      e.flat().forEach((r) => {
        if (!t.has(r.file)) t.set(r.file, r);
      }),
      [...t.values()]
    );
  },
  yYa = () => ({ patches: new Map(), capped: !1 }),
  KPr = (e) => {
    let t = "";
    for (let r = 1; r < e.length; r++) {
      let s = e[r];
      if (s === '"') return { value: t, end: r + 1 };
      if (s !== "\\") {
        t += s;
        continue;
      }
      let a = e[++r];
      if (a === "t") t += "\t";
      else if (a === "n")
        t += `
`;
      else if (a === "r") t += "\r";
      else if (a === '"' || a === "\\") t += a;
      else t += a ?? "";
    }
  },
  MYa = (e) => {
    if (!e.startsWith('"')) return e.split("\t")[0];
    return KPr(e)?.value ?? e;
  },
  TQe = (e) => {
    if (!e || e === "/dev/null") return;
    let t = MYa(e);
    if (t.startsWith("a/") || t.startsWith("b/")) return t.slice(2);
    return t;
  },
  xYa = (e) => {
    if (e.startsWith('"')) {
      let r = KPr(e),
        s = r ? e.slice(r.end).trimStart() : void 0;
      if (!s) return;
      if (!s.startsWith('"')) return TQe(s);
      return TQe(KPr(s)?.value);
    }
    let t = e.indexOf(" b/");
    if (t === -1) return;
    return TQe(e.slice(t + 1));
  },
  SYa = (e) => {
    let t = /^\+\+\+ (.+)$/m.exec(e)?.[1],
      r = /^--- (.+)$/m.exec(e)?.[1],
      s = TQe(t) ?? TQe(r);
    if (s) return s;
    let a = /^diff --git (.+)$/m.exec(e)?.[1];
    return xYa(a ?? "");
  },
  TYa = (e) => {
    let t = [...e.text.matchAll(/(?:^|\n)diff --git /g)].map((s) =>
        s[0].startsWith(`
`)
          ? s.index + 1
          : s.index,
      ),
      r = t.map((s, a) => e.text.slice(s, t[a + 1] ?? e.text.length));
    if (!e.truncated) return r;
    return r.slice(0, -1);
  },
  vYa,
  bYa,
  jYa = (e, t, r) => {
    if (r + Buffer.byteLength(t) <= zPr) return { patch: t, capped: !1 };
    return { patch: cwt(e), capped: !0 };
  },
  PYa,
  _Qi,
  hQi,
  CYa,
  wYa,
  kYa,
  OYa,
  UYa,
  NYa,
  FYa,
  BYa,
  Awt,
  iAe,
  RYa,
  vQe;