
var Dis = ne(async () => {
  Ql();
  Gt();
  $H();
  Sx();
  await Jn([wwt(), rte(), tte(), Jy(), AYe(), swr()]);
  Iis = Kd(eh, "workspace", (e) =>
    ft(function* () {
      let t = yield* DR,
        r = Ge("WorkspaceHttpApi.adapters")(function* () {
          let _ = yield* Jc;
          return yield* jn(() => bZi(_.project.id));
        }),
        s = Ge("WorkspaceHttpApi.list")(function* () {
          return yield* t.list((yield* Jc).project);
        }),
        a = Ge("WorkspaceHttpApi.create")(function* (_) {
          let L = yield* Jc;
          return yield* t
            .create({ ..._.payload, extra: _.payload.extra ?? null, projectID: L.project.id })
            .pipe(
              jf((I) => {
                let D = I.reasons.find(eQt),
                  S = I.reasons.find(Pin),
                  T = D?.defect ?? S?.error,
                  C = T instanceof Error ? T.message : "Workspace creation failed";
                return bn(new lkt({ name: "WorkspaceCreateError", data: { message: C } }));
              }),
            );
        }),
        H = Ge("WorkspaceHttpApi.syncList")(function* () {
          yield* t.syncList((yield* Jc).project);
        }),
        u = Ge("WorkspaceHttpApi.status")(function* () {
          let _ = new Set((yield* t.list((yield* Jc).project)).map((L) => L.id));
          return (yield* t.status()).filter((L) => _.has(L.workspaceID));
        }),
        f = Ge("WorkspaceHttpApi.remove")(function* (_) {
          return yield* t.remove(_.params.id);
        }),
        d = Ge("WorkspaceHttpApi.warp")(function* (_) {
          yield* t
            .sessionWarp({
              workspaceID: _.payload.id,
              sessionID: _.payload.sessionID,
              copyChanges: _.payload.copyChanges,
            })
            .pipe(
              Zo((L) => {
                if (L instanceof DCr) return tkt(L.message);
                if (L instanceof Awt)
                  return new lAe({ name: "VcsApplyError", data: { message: L.message, reason: L.reason } });
                return new ukt({ name: "WorkspaceWarpError", data: { message: L.message } });
              }),
            );
        });
      return e
        .handle("adapters", r)
        .handle("list", s)
        .handle("create", a)
        .handle("syncList", H)
        .handle("status", u)
        .handle("remove", f)
        .handle("warp", d);
    }),
  );
});
import { deflateSync as JoH, gzipSync as KoH } from "zlib";