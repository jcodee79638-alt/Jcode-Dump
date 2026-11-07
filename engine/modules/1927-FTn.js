
function FTn(e, t) {
  if (
    e.modified_ &&
    !e.finalized_ &&
    (e.type_ === 3 || (e.type_ === 1 && e.allIndicesReassigned_) || (e.assigned_?.size ?? 0) > 0)
  ) {
    let { patchPlugin_: s } = t;
    if (s) {
      let a = s.getPath(e);
      if (a) s.generatePatches_(e, a, t);
    }
    UTn(e);
  }
}