
function K4i(e, t, r) {
  if (e.length < 2 || e.length > 3)
    throw Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${e.length - 1}.`);
  if (!e.every(Xbr)) throw Error('Arguments to `#set!` predicate must be strings.".');
  if (!r[t]) r[t] = {};
  r[t][e[1].value] = e[2]?.value ?? null;
}