
async function Wis(e) {
  await Oce();
  await wCe();
  await Promise.resolve().then(() => Gw());
  await e$();
  await jI();
  await Promise.resolve().then(() => Gt());
  let f = await KPt({ directory: e.directory });
  return o9.runPromise(
    ft(function* () {
      let d = yield* Mg,
        _ = yield* d.get(Ec.make(e.id));
      if (Ris.resolve(_.directory).toLowerCase() !== Ris.resolve(e.directory).toLowerCase())
        throw Error("Choose this conversation's project first.");
      let L = e.mode ?? vFe(_.metadata?.jac_access_mode) ?? e.defaultMode,
        I = gAt(L);
      if (JSON.stringify(_.permission) === JSON.stringify(I) && _.metadata?.jac_access_mode === L)
        return { mode: L };
      if (e.mode === void 0 ? e.activity.has(e.id) : e.activity.size > 0)
        throw Error("Wait for the current work to finish before changing access.");
      return (
        yield* d.setPermission({ sessionID: _.id, permission: I }),
        yield* d.setMetadata({ sessionID: _.id, metadata: { ..._.metadata, jac_access_mode: L } }),
        { mode: L }
      );
    }).pipe(IA(Fh, f)),
  );
}