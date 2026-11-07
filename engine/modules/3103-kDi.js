
function kDi(e) {
  return e.map(
    (t) => `Instructions from: ${t.path}
${t.content}`,
  ).join(`

`);
}