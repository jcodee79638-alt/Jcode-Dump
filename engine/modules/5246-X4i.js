
function X4i(e, t, r, s) {
  if (e.length < 2)
    throw Error(
      `Wrong number of arguments to \`#${r}\` predicate. Expected at least 1. Got ${e.length - 1}.`,
    );
  if (e[1].type !== "capture")
    throw Error(`First argument of \`#${r}\` predicate must be a capture. Got "${e[1].value}".`);
  let a = r === "any-of?",
    H = e[1].name,
    u = e.slice(2);
  if (!u.every(Xbr)) throw Error(`Arguments to \`#${r}\` predicate must be strings.".`);
  let f = u.map((d) => d.value);
  s[t].push((d) => {
    let _ = [];
    for (let L of d) if (L.name === H) _.push(L.node.text);
    if (_.length === 0) return !a;
    return _.every((L) => f.includes(L)) === a;
  });
}