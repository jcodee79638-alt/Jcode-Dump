
var Urs = ne(async () => {
  jX();
  o0();
  Ql();
  Ry();
  aQe();
  Gt();
  p2();
  $H();
  await Jn([XGe(), Jw(), xP(), fJ(), e$(), A$e(), p$e(), Jy(), QCr()]);
  Ors = Kd(eh, "experimental", (e) =>
    ft(function* () {
      let t = yield* Wbe,
        r = yield* DP,
        s = yield* Eg,
        a = yield* MP,
        H = yield* aR,
        u = yield* nAe,
        f = yield* Mwe,
        d = yield* Mg,
        _ = yield* VN,
        L = yield* NE,
        I = Ge("ExperimentalHttpApi.capabilities")(function* () {
          return { backgroundSubagents: L.experimentalBackgroundSubagents };
        }),
        D = Ge("ExperimentalHttpApi.console")(function* () {
          let [Ae, le] = yield* Km([s.getConsoleState(), t.orgsByAccount().pipe($s(() => bn(new aX({}))))], {
            concurrency: "unbounded",
          });
          return {
            consoleManagedProviders: Ae.consoleManagedProviders,
            ...(Ae.activeOrgName ? { activeOrgName: Ae.activeOrgName } : {}),
            switchableOrgCount: le.reduce((Be, Te) => Be + Te.orgs.length, 0),
          };
        }),
        S = Ge("ExperimentalHttpApi.consoleOrgs")(function* () {
          let [Ae, le] = yield* Km(
              [t.orgsByAccount().pipe($s(() => bn(new aX({})))), t.active().pipe($s(() => bn(new aX({}))))],
              { concurrency: "unbounded" },
            ),
            Be = OL(le);
          return {
            orgs: Ae.flatMap((Te) =>
              Te.orgs.map((Lt) => ({
                accountID: Te.account.id,
                accountEmail: Te.account.email,
                accountUrl: Te.account.url,
                orgID: Lt.id,
                orgName: Lt.name,
                active: !!Be && Be.id === Te.account.id && Be.active_org_id === Lt.id,
              })),
            ),
          };
        }),
        T = Ge("ExperimentalHttpApi.consoleSwitch")(function* (Ae) {
          return (
            yield* t.use(Ae.payload.accountID, Lo(Ae.payload.orgID)).pipe($s(() => bn(new PA({})))),
            !0
          );
        }),
        C = Ge("ExperimentalHttpApi.tool")(function* (Ae) {
          return (yield* u.tools({
            providerID: Ae.query.provider,
            modelID: Ae.query.model,
            agent: yield* r.defaultInfo(),
          })).map((Be) => ({ id: Be.id, description: Be.description, parameters: sXi(Be) }));
        }),
        O = Ge("ExperimentalHttpApi.toolIDs")(function* () {
          return yield* u.ids();
        }),
        B = Ge("ExperimentalHttpApi.worktree")(function* () {
          let Ae = yield* Jc;
          return yield* H.sandboxes(Ae.project.id);
        }),
        V = Ge("ExperimentalHttpApi.worktreeCreate")(function* (Ae) {
          return yield* ywr(f.create(Ae.payload ?? void 0));
        }),
        q = Ge("ExperimentalHttpApi.worktreeRemove")(function* (Ae) {
          let le = yield* Jc;
          return (
            yield* ywr(f.remove(Ae.payload)),
            yield* H.removeSandbox(le.project.id, Ae.payload.directory),
            !0
          );
        }),
        Z = Ge("ExperimentalHttpApi.worktreeReset")(function* (Ae) {
          return (yield* ywr(f.reset(Ae.payload)), !0);
        }),
        se = Ge("ExperimentalHttpApi.session")(function* (Ae) {
          let le = Ae.query.limit ?? 100,
            Be = Ae.query.directory ? yield* xX : void 0,
            Te = yield* d.listGlobal({
              directory: Be,
              roots: Ae.query.roots,
              start: Ae.query.start,
              cursor: Ae.query.cursor,
              search: Ae.query.search,
              limit: le + 1,
              archived: Ae.query.archived,
            }),
            Lt = Te.length > le ? Te.slice(0, le) : Te;
          return ow(Lt, {
            headers:
              Te.length > le && Lt.length > 0
                ? { "x-next-cursor": String(Lt[Lt.length - 1].time.updated) }
                : void 0,
          });
        }),
        ae = Ge("ExperimentalHttpApi.sessionBackground")(function* (Ae) {
          if (!L.experimentalBackgroundSubagents) return !1;
          let le = (yield* _.list()).filter(
            (Te) =>
              Te.type === "task" &&
              Te.status === "running" &&
              Te.metadata?.parentSessionId === Ae.params.sessionID &&
              Te.metadata.background !== !0,
          );
          return (yield* ja(le, (Te) => _.promote(Te.id), { concurrency: "unbounded" })).some(
            (Te) => Te !== void 0,
          );
        }),
        z = Ge("ExperimentalHttpApi.resource")(function* () {
          return yield* a.resources();
        });
      return e
        .handle("capabilities", I)
        .handle("console", D)
        .handle("consoleOrgs", S)
        .handle("consoleSwitch", T)
        .handle("tool", C)
        .handle("toolIDs", O)
        .handle("worktree", B)
        .handle("worktreeCreate", V)
        .handle("worktreeRemove", q)
        .handle("worktreeReset", Z)
        .handle("session", se)
        .handle("sessionBackground", ae)
        .handle("resource", z);
    }),
  );
});