
var Qts = ne(() => {
  Gt();
  $H();
  zts = zd("server.health").add(
    MH("health.get", "/api/health", { success: nt({ healthy: ri(!0) }) }).annotateMerge(
      Fn({
        identifier: "v2.health.get",
        summary: "Check server health",
        description: "Check whether the API server is ready to accept requests.",
      }),
    ),
  );
});