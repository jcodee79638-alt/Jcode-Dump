
var Ers = ne(async () => {
  Xwt();
  ZQe();
  fwr();
  ZQe();
  Gt();
  $H();
  jT();
  await Jn([CWe(), fL()]);
  (($rs = Tl(dCr(), 1)),
    (CsH = nt({ healthy: ri(!0), version: re })),
    (wsH = YQe.values()
      .flatMap((e) => {
        if (!e.durable) return [];
        return [
          nt({
            type: ri("sync"),
            id: b2,
            syncEvent: nt({
              type: ri(mht(e.type, e.durable.version)),
              id: b2,
              seq: mo,
              aggregateID: re,
              data: e.data,
            }),
          }).annotate({ identifier: `SyncEvent.${e.type}` }),
        ];
      })
      .toArray()),
    (ksH = nt({
      directory: re,
      project: be(re),
      workspace: be(re),
      payload: Io([
        ...YQe.values()
          .map((e) => nt({ id: b2, type: ri(e.type), properties: e.data }))
          .toArray(),
        Jwt,
        ...wsH,
      ]),
    }).annotate({ identifier: "GlobalEvent" })),
    (OsH = nt({
      target: re.check(KW((e) => ($rs.default.valid(e) === null ? "Expected a semantic version" : void 0))),
    })),
    (UsH = Io([nt({ success: ri(!0), version: re }), nt({ success: ri(!1), error: re })])),
    (zwe = {
      health: "/global/health",
      event: "/global/event",
      config: "/global/config",
      dispose: "/global/dispose",
      upgrade: "/global/upgrade",
    }),
    (grs = kE("global").add(
      zd("global")
        .add(
          MH("health", zwe.health, { success: zs(CsH, "Health information") }).annotateMerge(
            Fn({
              identifier: "global.health",
              summary: "Get health",
              description: "Get health information about the OpenCode server.",
            }),
          ),
          MH("event", zwe.event, { success: ksH }).annotateMerge(
            Fn({
              identifier: "global.event",
              summary: "Get global events",
              description: "Subscribe to global events from the OpenCode system using server-sent events.",
            }),
          ),
          MH("configGet", zwe.config, { success: zs(Qde, "Get global config info") }).annotateMerge(
            Fn({
              identifier: "global.config.get",
              summary: "Get global configuration",
              description: "Retrieve the current global OpenCode configuration settings and preferences.",
            }),
          ),
          Cbe("configUpdate", zwe.config, {
            payload: Qde,
            success: zs(Qde, "Successfully updated global config"),
            error: PA,
          }).annotateMerge(
            Fn({
              identifier: "global.config.update",
              summary: "Update global configuration",
              description: "Update global OpenCode configuration settings and preferences.",
            }),
          ),
          sc("dispose", zwe.dispose, { success: zs(Vi, "Global disposed") }).annotateMerge(
            Fn({
              identifier: "global.dispose",
              summary: "Dispose instance",
              description: "Clean up and dispose all OpenCode instances, releasing all resources.",
            }),
          ),
          sc("upgrade", zwe.upgrade, {
            payload: OsH,
            success: zs(UsH, "Upgrade result"),
            error: PA,
          }).annotateMerge(
            Fn({
              identifier: "global.upgrade",
              summary: "Upgrade opencode",
              description: "Upgrade opencode to the specified version.",
            }),
          ),
        )
        .annotateMerge(Fn({ title: "global", description: "Global server routes." })),
    )));
});