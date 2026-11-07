
function Rh(e) {
  return ft(function* () {
    let t = yield* bm;
    return {
      location: new ode({ directory: t.directory, workspaceID: t.workspaceID, project: t.project }),
      data: yield* e,
    };
  });
}