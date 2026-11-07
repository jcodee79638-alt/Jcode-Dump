
function yJa(e, t) {
  let r = e.split(`
`),
    s = t.split(`
`),
    a = `@@ -1 +1 @@
`,
    H = Math.max(r.length, s.length),
    u = !1;
  for (let f = 0; f < H; f++) {
    let d = r[f] || "",
      _ = s[f] || "";
    if (d !== _) {
      if (d)
        a += `-${d}
`;
      if (_)
        a += `+${_}
`;
      u = !0;
    } else if (d)
      a += ` ${d}
`;
  }
  return u ? a : "";
}