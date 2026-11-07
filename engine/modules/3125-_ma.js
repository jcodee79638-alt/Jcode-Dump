
function _ma(e, t) {
  let r = [],
    s = t;
  while (s < e.length && !e[s].startsWith("***")) {
    if (!e[s].startsWith("+")) throw Error(`Invalid add file line: ${e[s]}`);
    (r.push(e[s].slice(1)), s++);
  }
  return {
    content: r.join(`
`),
    next: s,
  };
}