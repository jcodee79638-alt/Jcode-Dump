
var csr = ne(() => {
  csr();
  Gt();
  BA();
  Sht = class Sht extends (
    Pa("ConfigV2.MCP.Timeout")({
      startup: qc
        .pipe(be)
        .annotate({
          description: "Maximum time in milliseconds to establish and initialize the MCP server.",
        }),
      request: qc
        .pipe(be)
        .annotate({
          description: "Maximum time in milliseconds to wait for each MCP request after initialization.",
        }),
    })
  ) {};
  U1n = class U1n extends (
    Pa("ConfigV2.MCP.Local")({
      type: ri("local"),
      command: re.pipe(On),
      cwd: re
        .pipe(be)
        .annotate({
          description:
            "Working directory for the MCP server process. Relative paths resolve from the workspace directory.",
        }),
      environment: ks(re, re).pipe(be),
      disabled: Vi.pipe(be),
      timeout: Sht.pipe(be),
    })
  ) {};
  N1n = class N1n extends (
    Pa("ConfigV2.MCP.OAuth")({
      client_id: re.pipe(be),
      client_secret: re.pipe(be),
      scope: re.pipe(be),
      callback_port: DI.check(EZt({ minimum: 1, maximum: 65535 })).pipe(be),
      redirect_uri: re.pipe(be),
    })
  ) {};
  F1n = class F1n extends (
    Pa("ConfigV2.MCP.Remote")({
      type: ri("remote"),
      url: re,
      headers: ks(re, re).pipe(be),
      oauth: Io([N1n, ri(!1)]).pipe(be),
      disabled: Vi.pipe(be),
      timeout: Sht.pipe(be),
    })
  ) {};
  ZYs = Io([U1n, F1n]).pipe(_D("type"));
  B1n = class B1n extends Pa("ConfigV2.MCP")({ timeout: Sht.pipe(be), servers: ks(re, ZYs).pipe(be) }) {};
});