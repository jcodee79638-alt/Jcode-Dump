
function fma(e) {
  let t = e.endsWith(`
`),
    r = e
      .split(
        `
`,
      )
      .map(
        (s) =>
          s +
          `
`,
      );
  if (t) r.pop();
  else r.push(r.pop().slice(0, -1));
  return r;
}