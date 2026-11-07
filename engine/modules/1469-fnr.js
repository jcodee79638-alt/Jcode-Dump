
var fnr,
  PJs = "!?+*@",
  jde = (e) => ({ t: "lit", ch: e }),
  CJs = (e) => e.replace(/[\\^$.*+?()[\]{}|/]/g, "\\$&"),
  J0n = (e) => new RegExp(`^${CJs(e)}$`, "iu"),
  zmt,
  K0n = (e) => {
    let t = zmt.get(e);
    if (!t) {
      if (((t = J0n(e)), zmt.size >= 1000)) zmt.clear();
      zmt.set(e, t);
    }
    return t;
  },
  pnr = (e, t) => {
    if (t === e.ch) return !0;
    if (!e.re) return !1;
    let r = t.charCodeAt(0);
    if (r >= 128) return e.re.test(t);
    let s = (e.ascii ??= new Uint8Array(128));
    return ((s[r] ||= e.re.test(t) ? 1 : 2), s[r] === 1);
  },
  wJs = (e, t, r, s) => {
    let a = [];
    for (let H = 0; H < e.length;) {
      let u = String.fromCodePoint(e.codePointAt(H));
      if (u === "\\") {
        let f = e.codePointAt(H + 1),
          d = f === void 0 ? u : String.fromCodePoint(f);
        (a.push(jde(d)), (H += 1 + d.length));
        continue;
      }
      if (u === "[") {
        let [f, d] = W0n(e, H, t, s);
        if (d) {
          (a.push({ t: "class", re: f }), (H += d));
          continue;
        }
      }
      if (!r && PJs.includes(u) && e[H + 1] === "(") {
        (a.push({ t: "open", type: u }), (H += 2));
        continue;
      }
      (a.push(
        !r && u === "|"
          ? { t: "bar" }
          : !r && u === ")"
            ? { t: "close" }
            : u === "*"
              ? { t: "star" }
              : u === "?"
                ? { t: "any" }
                : jde(u),
      ),
        (H += u.length));
    }
    return a;
  },
  kJs = (e) => {
    let t = new Map(),
      r = [];
    return (
      e.forEach((s, a) => {
        if (s.t === "open") r.push(a);
        else if (s.t === "close" && r.length) t.set(r.pop(), a);
      }),
      t
    );
  },
  z0n = (e, t, r, s, a) => {
    let H = [],
      u = [H];
    for (let f = r; f < s; f++) {
      let d = e[f],
        _ = t.get(f);
      if (d.t === "open" && _ !== void 0) {
        let L = z0n(e, t, f + 1, _, !1);
        (H.push({ t: "ext", type: d.type, alts: L }), (f = _));
      } else if (d.t === "bar" && !a) u.push((H = []));
      else if (d.t === "open") H.push(jde(d.type), jde("("));
      else if (d.t === "bar") H.push(jde("|"));
      else if (d.t === "close") H.push(jde(")"));
      else H.push(d);
    }
    return u;
  },
  Q0n = (e, t) => {
    let r = [],
      s = "",
      a = () => {
        for (let H of s.normalize(t)) r.push(jde(H));
        s = "";
      };
    for (let H of e) {
      if (H.t === "lit") {
        s += H.ch;
        continue;
      }
      (a(), r.push(H.t === "ext" ? { ...H, alts: H.alts.map((u) => Q0n(u, t)) } : H));
    }
    return (a(), r);
  },
  OJs = (e, t) => {
    let r = 1,
      s = (f) => ({ t: "split", id: r++, out: f }),
      a = (f, d) => f.reduceRight((_, L) => H(L, _), d),
      H = (f, d) => {
        switch (f.t) {
          case "lit":
            let D = t ? K0n(f.ch) : void 0;
            return { t: "lit", id: r++, ch: f.ch, re: D, next: d };
          case "any":
          case "star":
            return { t: f.t, id: r++, next: d };
          case "class":
            return { t: "class", id: r++, re: f.re, next: d };
        }
        let _ = (D) => f.alts.map((S) => a(S, D));
        switch (f.type) {
          case "@":
            return s(_(d));
          case "?":
            return s([d, ..._(d)]);
          case "!":
            return { t: "neg", id: r++, sub: s(_(fnr)), next: d };
        }
        let L = s([]),
          I = s(_(L));
        return (L.out.push(d, I), f.type === "*" ? L : I);
      };
    return [a(e, fnr), r];
  },
  UJs = (e) => {
    let t = [],
      r = new Set(),
      s = (H) => (H.t === "match" ? "match" : String(H.id)),
      a = (H, u) => {
        if (H.t === "match" || r.has(H)) return;
        r.add(H);
        let f = (d) => t.push(`${u}${H.id}: ${d}`);
        switch (H.t) {
          case "split":
            f(`split -> ${H.out.map(s).join(", ")}`);
            for (let d of H.out) a(d, u);
            return;
          case "neg":
            return (f(`!(${s(H.sub)}) -> ${s(H.next)}`), a(H.sub, u + "  "), a(H.next, u));
          case "lit":
            f(`${JSON.stringify(H.ch)} -> ${s(H.next)}`);
            break;
          case "class":
            f(`${H.re} -> ${s(H.next)}`);
            break;
          default:
            f(`${H.t === "any" ? "?" : "*"} -> ${s(H.next)}`);
        }
        a(H.next, u);
      };
    return (
      a(e, ""),
      [`start -> ${s(e)}`, ...t].join(`
`)
    );
  },
  Z0n = (e, t) => {
    if (e.ids.length !== t.ids.length) return !1;
    if (e.runs.length !== t.runs.length) return !1;
    if (e.ids.some((r, s) => r !== t.ids[s])) return !1;
    return e.runs.every((r) => t.runs.some((s) => s.neg === r.neg && Z0n(s.state, r.state)));
  },
  q0n = (e) => ({ has: new Float64Array(e), seen: new Float64Array(e), gen: 0 }),
  eEn = (e) => {
    let t = e.ids.join();
    if (!e.runs.length) return t;
    let r = e.runs.map((s) => `${s.neg.id}(${eEn(s.state)})`);
    return `${t}|${r.sort().join("|")}`;
  },
  NJs = 262144,
  FJs = (e) => {
    let t = [];
    for (let r = e; r.t !== "match"; r = r.next) {
      if (r.t === "split" || r.t === "neg") return;
      t.push(r);
    }
    return t;
  },
  BJs = (e, t, r, s) => {
    let a = 0,
      H = r,
      u = -1,
      f = 0;
    while (H < s) {
      let d = e[a];
      if (d?.t === "star") {
        ((u = a++), (f = H));
        continue;
      }
      let _ = t[H];
      if (d && (d.t === "any" || (d.t === "lit" && pnr(d, _)) || (d.t === "class" && d.re.test(_)))) {
        (a++, H++);
        continue;
      }
      if (u === -1) return !1;
      ((a = u + 1), (H = ++f));
    }
    while (e[a]?.t === "star") a++;
    return a === e.length;
  },
  rEn = (e) => {
    let t = 0,
      r = 0;
    for (let s of e) {
      let [a, H] = RJs(s);
      ((t += a), (r += H));
    }
    return [t, r];
  },
  RJs = (e) => {
    if (e.t === "star") return [0, 1 / 0];
    if (e.t !== "ext") return [1, 1];
    if (e.type === "!") return [0, 1 / 0];
    let t = e.alts.map(rEn),
      r = Math.min(...t.map((H) => H[0])),
      s = Math.max(...t.map((H) => H[1])),
      a = s === 0 ? 0 : 1 / 0;
    return e.type === "@" ? [r, s] : e.type === "?" ? [0, s] : e.type === "*" ? [0, a] : [r, a];
  },
  G0n = (e, t, r) => {
    for (let s = 0; s < e.length; s++) if (!pnr(e[s], t[r + s])) return !1;
    return !0;
  },
  WJs,
  VJs,
  Qmt = (e) => (VJs.test(e) ? [...e] : e),
  X0n = (e) => {
    if (e.includes("/")) throw Error("can only match a single path portion, got: " + e);
  };