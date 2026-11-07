
function q4i(e, t, r, s) {
  if (e.length !== 3)
    throw Error(`Wrong number of arguments to \`#${r}\` predicate. Expected 2, got ${e.length - 1}`);
  if (!F4i(e[1])) throw Error(`First argument of \`#${r}\` predicate must be a capture. Got "${e[1].value}"`);
  let a = r === "eq?" || r === "any-eq?",
    H = !r.startsWith("any-");
  if (F4i(e[2])) {
    let u = e[1].name,
      f = e[2].name;
    s[t].push((d) => {
      let _ = [],
        L = [];
      for (let D of d) {
        if (D.name === u) _.push(D.node);
        if (D.name === f) L.push(D.node);
      }
      let I = gs((D, S, T) => (T ? D.text === S.text : D.text !== S.text), "compare");
      return H ? _.every((D) => L.some((S) => I(D, S, a))) : _.some((D) => L.some((S) => I(D, S, a)));
    });
  } else {
    let u = e[1].name,
      f = e[2].value,
      d = gs((L) => L.text === f, "matches"),
      _ = gs((L) => L.text !== f, "doesNotMatch");
    s[t].push((L) => {
      let I = [];
      for (let S of L) if (S.name === u) I.push(S.node);
      let D = a ? d : _;
      return H ? I.every(D) : I.some(D);
    });
  }
}