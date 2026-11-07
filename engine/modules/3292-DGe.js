
function DGe(e = []) {
  return Es(
    Xj,
    xWs(
      (t) => {
        let r = e.concat([[KS, JQs(t)]]),
          s = cVs(j0a, Ase.values.global, r);
        return rdt(s.node).pipe(
          rsn,
          KUs(() => fH("booting location services", { directory: t.directory, workspaceID: t.workspaceID })),
          ou(rdt(s.hoisted)),
        );
      },
      { idleTimeToLive: "60 minutes" },
    ),
  );
}