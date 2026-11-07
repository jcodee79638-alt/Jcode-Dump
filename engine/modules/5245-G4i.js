
function G4i(e, t, r, s) {
  if (e.length !== 3)
    throw Error(`Wrong number of arguments to \`#${r}\` predicate. Expected 2, got ${e.length - 1}.`);
  if (e[1].type !== "capture")
    throw Error(`First argument of \`#${r}\` predicate must be a capture. Got "${e[1].value}".`);
  if (e[2].type !== "string")
    throw Error(`Second argument of \`#${r}\` predicate must be a string. Got @${e[2].name}.`);
  let a = r === "match?" || r === "any-match?",
    H = !r.startsWith("any-"),
    u = e[1].name,
    f = new RegExp(e[2].value);
  s[t].push((d) => {
    let _ = [];
    for (let I of d) if (I.name === u) _.push(I.node.text);
    let L = gs((I, D) => (D ? f.test(I) : !f.test(I)), "test");
    if (_.length === 0) return !a;
    return H ? _.every((I) => L(I, a)) : _.some((I) => L(I, a));
  });
}