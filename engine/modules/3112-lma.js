
function lma(e, t) {
  if (t.stripTrailingCr)
    e = e.replace(
      /\r\n/g,
      `
`,
    );
  let r = [],
    s = e.split(/(\n|\r\n)/);
  if (!s[s.length - 1]) s.pop();
  for (let a = 0; a < s.length; a++) {
    let H = s[a];
    if (a % 2 && !t.newlineIsToken) r[r.length - 1] += H;
    else r.push(H);
  }
  return r;
}