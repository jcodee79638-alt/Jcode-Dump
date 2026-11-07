
function qnH(e, t) {
  return ft(function* () {
    let r = yield* aYe,
      s = yield* t.load({ directory: VnH(r.directory) });
    return yield* e.pipe(IA(Fh, s), IA(bI, r.workspaceID));
  });
}