
var _ts = ne(async () => {
  BA();
  Gt();
  $H();
  xx();
  jT();
  await Jn([fL(), jI(), bT(), Tx()]);
  ((FiH = nt({ id: b2, aggregateID: re, seq: Ko, type: re, data: ks(re, PH) })),
    (BiH = nt({ directory: re, events: F2s(FiH) })),
    (RiH = nt({ sessionID: re })),
    (dts = nt({ sessionID: Ec })),
    (WiH = ks(re, Ko)),
    (ViH = nt({ id: b2, aggregate_id: re, seq: Ko, type: re, data: ks(re, PH) })),
    (ckt = {
      start: `${Hkt}/start`,
      replay: `${Hkt}/replay`,
      steal: `${Hkt}/steal`,
      history: `${Hkt}/history`,
    }),
    (mts = kE("sync")
      .add(
        zd("sync")
          .add(
            sc("start", ckt.start, { query: jo, success: zs(Vi, "Workspace sync started") }).annotateMerge(
              Fn({
                identifier: "sync.start",
                summary: "Start workspace sync",
                description:
                  "Start sync loops for workspaces in the current project that have active sessions.",
              }),
            ),
            sc("replay", ckt.replay, {
              query: jo,
              payload: BiH,
              success: zs(RiH, "Replayed sync events"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "sync.replay",
                summary: "Replay sync events",
                description: "Validate and replay a complete sync event history.",
              }),
            ),
            sc("steal", ckt.steal, {
              query: jo,
              payload: dts,
              success: zs(dts, "Session stolen into workspace"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "sync.steal",
                summary: "Steal session into workspace",
                description:
                  "Update a session to belong to the current workspace through the sync event system.",
              }),
            ),
            sc("history", ckt.history, {
              query: jo,
              payload: WiH,
              success: zs(On(ViH), "Sync events"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "sync.history.list",
                summary: "List sync events",
                description:
                  "List sync events for all aggregates. Keys are aggregate IDs the client already knows about, values are the last known sequence ID. Events with seq > value are returned for those aggregates. Aggregates not listed in the input get their full history.",
              }),
            ),
          )
          .annotateMerge(Fn({ title: "sync", description: "Experimental HttpApi sync routes." }))
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