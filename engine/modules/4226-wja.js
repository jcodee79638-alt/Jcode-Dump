
function wja(e, t) {
  let r = [Pi(la.project_id, t.projectID)];
  if (t.workspaceID) r.push(Pi(la.workspace_id, t.workspaceID));
  if (t.path !== void 0) {
    if (t.path) {
      let a = [Pi(la.path, t.path), g2(la.path, Zt.param(`${t.path}/%`, la.path))];
      r.push(t.directory ? K0(...a, Gc(FS(la.path), Pi(la.directory, t.directory))) : K0(...a));
    }
  } else if (t.scope !== "project") {
    if (t.directory) r.push(Pi(la.directory, t.directory));
  }
  if (t.roots) r.push(FS(la.parent_id));
  if (t.start) r.push(aV(la.time_updated, t.start));
  if (t.search) r.push(g2(la.title, `%${t.search}%`));
  let s = t.limit ?? 100;
  return e
    .select()
    .from(la)
    .where(Gc(...r))
    .orderBy(TE(la.time_updated))
    .limit(s)
    .all()
    .pipe(
      on,
      Vn((a) => a.map(pXe)),
    );
}