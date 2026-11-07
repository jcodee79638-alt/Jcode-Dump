
var cIi = 2000,
  AIi = 51200,
  Gua,
  Xua = "tool-output",
  MMt,
  z_e,
  uIi = (e, t) => {
    let r = 0,
      s = "";
    for (let a of e) {
      let H = Buffer.byteLength(a, "utf-8");
      if (r + H > t) break;
      ((s += a), (r += H));
    }
    return s;
  },
  Jua = (e, t) => {
    let r = 0,
      s = [];
    for (let a of Array.from(e).toReversed()) {
      let H = Buffer.byteLength(a, "utf-8");
      if (r + H > t) break;
      (s.unshift(a), (r += H));
    }
    return s.join("");
  },
  Kua = (e, t, r) => {
    let s = e.split(`
`),
      a = Math.ceil(t / 2),
      H = Math.floor(t / 2),
      u =
        s.length <= t
          ? e
          : [
              s.slice(0, a).join(`
`),
              ...(H > 0
                ? [
                    s.slice(s.length - H).join(`
`),
                  ]
                : []),
            ].join(`
`);
    if (Buffer.byteLength(u, "utf-8") <= r)
      return s.length <= t
        ? { head: u, tail: "" }
        : {
            head: s.slice(0, a).join(`
`),
            tail:
              H > 0
                ? s.slice(s.length - H).join(`
`)
                : "",
          };
    let f = Math.ceil(r / 2),
      d = Math.floor(r / 2);
    return { head: uIi(u, f), tail: Jua(u, d) };
  },
  zua = (e, t, r, s) => {
    let a = uIi(t, s)
        .split(
          `
`,
        )
        .slice(0, r).join(`
`),
      H = Buffer.byteLength(t, "utf-8");
    if (r <= 4 || s <= H + 4) return a;
    let u = Kua(e, r - 4, s - H - 4);
    return u.tail
      ? `${u.head}

${t}

${u.tail}`
      : `${u.head}

${t}`;
  },
  Qua = (e) => {
    let t = 1;
    for (let r of e)
      if (
        r ===
        `
`
      )
        t++;
    return t;
  },
  xMt,
  SLr,
  bDc,
  Yua,
  jDc;