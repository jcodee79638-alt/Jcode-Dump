
function J4i(e, t, r, s, a) {
  if (e.length < 2 || e.length > 3)
    throw Error(`Wrong number of arguments to \`#${r}\` predicate. Expected 1 or 2. Got ${e.length - 1}.`);
  if (!e.every(Xbr)) throw Error(`Arguments to \`#${r}\` predicate must be strings.".`);
  let H = r === "is?" ? s : a;
  if (!H[t]) H[t] = {};
  H[t][e[1].value] = e[2]?.value ?? null;
}