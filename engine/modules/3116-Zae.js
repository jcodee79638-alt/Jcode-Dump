
function Zae(e, t) {
  if (!t) t = VDi;
  if (Array.isArray(e)) {
    if (e.length > 1 && !t.includeFileHeaders)
      throw Error(
        "Cannot omit file headers on a multi-file patch. (The result would be unparseable; how would a tool trying to apply the patch know which changes are to which file?)",
      );
    return e.map((s) => Zae(s, t)).join(`
`);
  }
  let r = [];
  if (t.includeIndex && e.oldFileName == e.newFileName) r.push("Index: " + e.oldFileName);
  if (t.includeUnderline) r.push("===================================================================");
  if (t.includeFileHeaders)
    (r.push("--- " + e.oldFileName + (typeof e.oldHeader > "u" ? "" : "\t" + e.oldHeader)),
      r.push("+++ " + e.newFileName + (typeof e.newHeader > "u" ? "" : "\t" + e.newHeader)));
  for (let s = 0; s < e.hunks.length; s++) {
    let a = e.hunks[s];
    if (a.oldLines === 0) a.oldStart -= 1;
    if (a.newLines === 0) a.newStart -= 1;
    r.push("@@ -" + a.oldStart + "," + a.oldLines + " +" + a.newStart + "," + a.newLines + " @@");
    for (let H of a.lines) r.push(H);
  }
  return (
    r.join(`
`) +
    `
`
  );
}