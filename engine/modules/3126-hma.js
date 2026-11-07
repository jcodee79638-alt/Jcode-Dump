
function hma(e, t) {
  let r = [],
    s = t;
  while (s < e.length && !e[s].startsWith("***")) {
    if (!e[s].startsWith("@@")) throw Error(`Invalid update file line: ${e[s]}`);
    let a = e[s].slice(2).trim() || void 0,
      H = [],
      u = [],
      f = !1;
    s++;
    while (s < e.length && !e[s].startsWith("@@")) {
      let d = e[s];
      if (d === "*** End of File") {
        ((f = !0), s++);
        break;
      }
      if (d.startsWith("***")) break;
      if (d.startsWith(" ")) (H.push(d.slice(1)), u.push(d.slice(1)));
      else if (d.startsWith("-")) H.push(d.slice(1));
      else if (d.startsWith("+")) u.push(d.slice(1));
      else throw Error(`Invalid update chunk line: ${d}`);
      s++;
    }
    r.push({ oldLines: H, newLines: u, changeContext: a, endOfFile: f || void 0 });
  }
  return { chunks: r, next: s };
}