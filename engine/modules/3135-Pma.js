
var Pma = "edit",
  Cma,
  wma,
  l$r = (e) =>
    e.replaceAll(
      `\r
`,
      `
`,
    ),
  kma = (e) =>
    e.includes(`\r
`)
      ? `\r
`
      : `
`,
  zDi = (e, t) =>
    t ===
    `
`
      ? l$r(e)
      : l$r(e).replaceAll(
          `
`,
          `\r
`,
        ),
  Oma = (e) => (e.startsWith("\uFEFF") ? { bom: !0, text: e.slice(1) } : { bom: !1, text: e }),
  Uma = (e, t) => (t ? `\uFEFF${e}` : e),
  Nma = (e) => {
    let t = e[0] === 239 && e[1] === 187 && e[2] === 191;
    return { bom: t, content: e, text: new TextDecoder().decode(t ? e.slice(3) : e) };
  },
  Fma = (e, t) => {
    if (t === "") return e.length + 1;
    let r = 0,
      s = 0;
    while ((s = e.indexOf(t, s)) !== -1) (r++, (s += t.length));
    return r;
  },
  QDi = (e, t) => {
    let r = l$r(e).split(`
`),
      s = r.slice(0, 6).map((a) => `${t}${a.length > 240 ? `${a.slice(0, 240)}...` : a}`);
    if (r.length > s.length) s.push(`${t}...`);
    return s;
  },
  Bma = (e, t, r) =>
    [
      `Edited file successfully: ${e.files[0]?.file}`,
      `Replacements: ${e.replacements}`,
      "```diff",
      ...QDi(t, "-"),
      ...QDi(r, "+"),
      "```",
    ].join(`
`),
  Rma,
  Wma;