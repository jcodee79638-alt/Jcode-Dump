
var Kts = ne(() => {
  ude();
  I1();
  Gt();
  $H();
  sk();
  Jts = zd("server.agent").add(
    MH("agent.list", "/api/agent", { query: fp, success: Dy(On(ddn)) })
      .annotateMerge(pp)
      .annotateMerge(
        Fn({
          identifier: "v2.agent.list",
          summary: "List agents",
          description: "Retrieve currently registered agents.",
        }),
      ),
  );
});