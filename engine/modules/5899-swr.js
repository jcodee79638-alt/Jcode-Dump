
var swr = ne(async () => {
  Gt();
  $H();
  Sx();
  xx();
  jT();
  await Jn([rte(), fjt(), AYe(), bT(), Tx()]);
  ((ZiH = nt(WW(drH.fields, ["projectID"]))),
    (esH = nt({
      id: w6(cAe.fields.id),
      sessionID: wZi.fields.sessionID,
      copyChanges: wZi.fields.copyChanges,
    })));
  ukt = class ukt extends (
    $y("WorkspaceWarpError")(
      { name: ri("WorkspaceWarpError"), data: nt({ message: re }) },
      { httpApiStatus: 400 },
    )
  ) {};
  lkt = class lkt extends (
    $y("WorkspaceCreateError")(
      { name: ri("WorkspaceCreateError"), data: nt({ message: re }) },
      { httpApiStatus: 400 },
    )
  ) {};
  ((I$e = {
    adapters: `${Xwe}/adapter`,
    list: Xwe,
    syncList: `${Xwe}/sync-list`,
    status: `${Xwe}/status`,
    remove: `${Xwe}/:id`,
    warp: `${Xwe}/warp`,
  }),
    (Dts = kE("workspace")
      .add(
        zd("workspace")
          .add(
            MH("adapters", I$e.adapters, {
              query: jo,
              success: zs(On(M3i), "Workspace adapters"),
            }).annotateMerge(
              Fn({
                identifier: "experimental.workspace.adapter.list",
                summary: "List workspace adapters",
                description: "List all available workspace adapters for the current project.",
              }),
            ),
            MH("list", I$e.list, { query: jo, success: zs(On(cAe), "Workspaces") }).annotateMerge(
              Fn({
                identifier: "experimental.workspace.list",
                summary: "List workspaces",
                description: "List all workspaces.",
              }),
            ),
            sc("create", I$e.list, {
              query: jo,
              payload: ZiH,
              success: zs(cAe, "Workspace created"),
              error: [lkt, PA],
            }).annotateMerge(
              Fn({
                identifier: "experimental.workspace.create",
                summary: "Create workspace",
                description: "Create a workspace for the current project.",
              }),
            ),
            sc("syncList", I$e.syncList, {
              query: jo,
              success: zs(lf, "Workspace list synced"),
            }).annotateMerge(
              Fn({
                identifier: "experimental.workspace.syncList",
                summary: "Sync workspace list",
                description: "Register missing workspaces returned by workspace adapters.",
              }),
            ),
            MH("status", I$e.status, { query: jo, success: zs(On(prH), "Workspace status") }).annotateMerge(
              Fn({
                identifier: "experimental.workspace.status",
                summary: "Workspace status",
                description: "Get connection status for workspaces in the current project.",
              }),
            ),
            P8("remove", I$e.remove, {
              params: { id: cAe.fields.id },
              query: jo,
              success: zs(XW(cAe), "Workspace removed"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "experimental.workspace.remove",
                summary: "Remove workspace",
                description: "Remove an existing workspace.",
              }),
            ),
            sc("warp", I$e.warp, {
              query: jo,
              payload: esH,
              success: zs(lf, "Session warped"),
              error: [ukt, lAe, t$],
            }).annotateMerge(
              Fn({
                identifier: "experimental.workspace.warp",
                summary: "Warp session into workspace",
                description:
                  "Move a session's sync history into the target workspace, or detach it to the local project.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "workspace", description: "Experimental HttpApi workspace routes." }))
          .middleware(Fm)
          .middleware(Nm)
          .middleware(tm),
      )
      .annotateMerge(
        Fn({
          title: "opencode experimental HttpApi",
          version: "0.0.1",
          description: "Experimental HttpApi surface for selected instance routes.",
        }),
      )));
});