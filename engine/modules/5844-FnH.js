
function FnH(e, t, r) {
  return ft(function* () {
    let s = yield* UnH(r);
    if (s.type === "remote") return Rwe.Remote({ request: e, workspace: r, target: s, url: t });
    return Rwe.Local({ directory: s.directory, workspaceID: r.id });
  });
}