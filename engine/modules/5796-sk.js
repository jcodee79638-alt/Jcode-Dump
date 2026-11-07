
var sk = ne(() => {
  I1();
  Gt();
  $H();
  ((fp = nt({ location: be(nt({ directory: be(re), workspace: be(re) })) }).annotate({
    identifier: "LocationQuery",
  })),
    (pp = Fn({
      transform: (e) => {
        let t = e.parameters;
        if (!Array.isArray(t)) return e;
        return {
          ...e,
          parameters: t.map((r) =>
            r?.name === "location" && r?.in === "query" ? { ...r, style: "deepObject", explode: !0 } : r,
          ),
        };
      },
    })),
    (des = zd("server.location").add(
      MH("location.get", "/api/location", { query: fp, success: ode })
        .annotateMerge(pp)
        .annotateMerge(
          Fn({
            identifier: "v2.location.get",
            summary: "Get location",
            description: "Resolve the requested location or the server default location.",
          }),
        ),
    )));
});