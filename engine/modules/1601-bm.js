
var bm,
  KS,
  XQs = (e) =>
    Es(
      bm,
      ft(function* () {
        let r = yield* (yield* MY).resolve(e.directory);
        return bm.of({
          directory: e.directory,
          workspaceID: e.workspaceID,
          project: { id: r.id, directory: r.directory },
          vcs: r.vcs,
        });
      }),
    ),
  JQs = (e) => Ua({ service: bm, layer: XQs(e), deps: [hWe] });