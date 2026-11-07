
var nrs = ne(() => {
  ade();
  I1();
  Gt();
  $H();
  Xy();
  sk();
  ((LsH = ks(re, re)),
    (rrs = zd("server.integration")
      .add(
        MH("integration.list", "/api/integration", { query: fp, success: Dy(On(adt)) })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.integration.list",
              summary: "List integrations",
              description: "Retrieve available integrations and their authentication methods.",
            }),
          ),
      )
      .add(
        MH("integration.get", "/api/integration/:integrationID", {
          params: { integrationID: rY },
          query: fp,
          success: Dy(XW(adt)),
        })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.integration.get",
              summary: "Get integration",
              description: "Retrieve one integration and its authentication methods.",
            }),
          ),
      )
      .add(
        sc("integration.connect.key", "/api/integration/:integrationID/connect/key", {
          params: { integrationID: rY },
          query: fp,
          payload: nt({ key: re, label: be(re) }),
          success: lf,
          error: Sb,
        })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.integration.connect.key",
              summary: "Connect with key",
              description: "Run a key authentication method and store the resulting credential.",
            }),
          ),
      )
      .add(
        sc("integration.connect.oauth", "/api/integration/:integrationID/connect/oauth", {
          params: { integrationID: rY },
          query: fp,
          payload: nt({ methodID: otr, inputs: LsH, label: be(re) }),
          success: Dy(Htr),
          error: Sb,
        })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.integration.connect.oauth",
              summary: "Begin OAuth connection",
              description: "Start an OAuth attempt and return the authorization details.",
            }),
          ),
      )
      .add(
        MH("integration.attempt.status", "/api/integration/attempt/:attemptID", {
          params: { attemptID: r3e },
          query: fp,
          success: Dy(rdn),
        })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.integration.attempt.status",
              summary: "Get OAuth attempt status",
              description: "Poll the current status of an OAuth attempt.",
            }),
          ),
      )
      .add(
        sc("integration.attempt.complete", "/api/integration/attempt/:attemptID/complete", {
          params: { attemptID: r3e },
          query: fp,
          payload: nt({ code: be(re) }),
          success: lf,
          error: Sb,
        })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.integration.attempt.complete",
              summary: "Complete OAuth connection",
              description: "Complete a code-based OAuth attempt and store the resulting credential.",
            }),
          ),
      )
      .add(
        P8("integration.attempt.cancel", "/api/integration/attempt/:attemptID", {
          params: { attemptID: r3e },
          query: fp,
          success: lf,
        })
          .annotateMerge(pp)
          .annotateMerge(
            Fn({
              identifier: "v2.integration.attempt.cancel",
              summary: "Cancel OAuth connection",
              description: "Cancel an OAuth attempt and release its resources.",
            }),
          ),
      )
      .annotateMerge(
        Fn({ title: "integrations", description: "Integration discovery and authentication routes." }),
      )));
});