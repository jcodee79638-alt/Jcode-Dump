
function BnH(e, t) {
  return ft(function* () {
    let r = Bes(e),
      s = bnH(),
      a = r.pathname.startsWith("/api/") ? PnH(r, t?.workspaceID) : jnH(r, t?.workspaceID);
    if (a === Fes) return Rwe.InvalidWorkspace();
    let H = yield* knH(a, s);
    if (a && H === void 0 && !s) return Rwe.MissingWorkspace({ workspaceID: a });
    if (H !== void 0 && !s && !wnH(e, r)) return yield* FnH(e, r, H);
    return Rwe.Local({ directory: t?.directory || CnH(e, r), workspaceID: s ?? a });
  });
}