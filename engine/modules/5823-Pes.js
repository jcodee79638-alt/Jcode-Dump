
function Pes(e, t, r) {
  return ft(function* () {
    (yield* fH("waiting for state", { workspaceID: e, state: t }),
      yield* DR.use((s) => s.waitForSync(e, t, r)),
      yield* fH("state fully synced", { workspaceID: e, state: t }));
  });
}