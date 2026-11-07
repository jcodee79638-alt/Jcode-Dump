
function cQe(e) {
  let r = gJa(e.trim()).split(`
`),
    s = [],
    a = 0,
    H = "*** Begin Patch",
    u = "*** End Patch",
    f = r.findIndex((_) => _.trim() === H),
    d = r.findIndex((_) => _.trim() === u);
  if (f === -1 || d === -1 || f >= d) throw Error("Invalid patch format: missing Begin/End markers");
  a = f + 1;
  while (a < d) {
    let _ = hJa(r, a);
    if (!_) {
      a++;
      continue;
    }
    if (r[a].startsWith("*** Add File:")) {
      let { content: L, nextIdx: I } = $Ja(r, _.nextIdx);
      (s.push({ type: "add", path: _.filePath, contents: L }), (a = I));
    } else if (r[a].startsWith("*** Delete File:"))
      (s.push({ type: "delete", path: _.filePath }), (a = _.nextIdx));
    else if (r[a].startsWith("*** Update File:")) {
      let { chunks: L, nextIdx: I } = LJa(r, _.nextIdx);
      (s.push({ type: "update", path: _.filePath, move_path: _.movePath, chunks: L }), (a = I));
    } else a++;
  }
  return { hunks: s };
}