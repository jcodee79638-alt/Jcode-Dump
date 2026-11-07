
function pyr(e, t) {
  if (!t.instance && !t.workspace) return e;
  if (!t.instance) return e.pipe(IA(bI, t.workspace));
  if (!t.workspace) return e.pipe(IA(Fh, t.instance));
  return e.pipe(IA(Fh, t.instance), IA(bI, t.workspace));
}