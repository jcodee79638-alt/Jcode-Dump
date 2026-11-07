
function $Ja(e, t) {
  let r = "",
    s = t;
  while (s < e.length && !e[s].startsWith("***")) {
    if (e[s].startsWith("+"))
      r +=
        e[s].substring(1) +
        `
`;
    s++;
  }
  if (
    r.endsWith(`
`)
  )
    r = r.slice(0, -1);
  return { content: r, nextIdx: s };
}