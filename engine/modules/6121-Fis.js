
async function Fis(e) {
  if (e.activity.size > 0)
    throw Error("Wait for the current work to finish before branching a conversation.");
  let [t, r] = await Promise.all([Vwr(e.directory), Vwr(e.destination)]);
  if (
    [mYe.relative(t, r), mYe.relative(r, t)].some(
      (L) => !L || (L !== ".." && !L.startsWith(`..${mYe.sep}`) && !mYe.isAbsolute(L)),
    )
  )
    throw Error("Choose a separate project folder for this branch.");
  await Oce();
  await wCe();
  await Promise.resolve().then(() => Gw());
  await e$();
  await jI();
  await Promise.resolve().then(() => Gt());
  let _ = await KPt({ directory: r });
  return o9.runPromise(
    ft(function* () {
      let L = yield* Mg,
        I = yield* L.get(Ec.make(e.id));
      if (mYe.relative(yield* nA(() => Vwr(I.directory)), t))
        throw Error("Choose this conversation's project first.");
      if (
        (yield* L.messages({ sessionID: I.id })).some((T) =>
          T.parts.some(
            (C) => C.type === "tool" && (C.state.status === "pending" || C.state.status === "running"),
          ),
        )
      )
        throw Error("Finish or stop unfinished tools before branching this conversation.");
      if (e.activity.size > 0)
        throw Error("Wait for the current work to finish before branching a conversation.");
      let S = yield* L.fork({ sessionID: I.id });
      return (
        yield* L.setPermission({ sessionID: S.id, permission: gAt("ask") }),
        yield* L.setMetadata({
          sessionID: S.id,
          metadata: { ...S.metadata, jac_access_mode: "ask", jac_branch_source: { id: I.id, directory: t } },
        }),
        yield* L.get(S.id)
      );
    }).pipe(IA(Fh, _)),
  );
}