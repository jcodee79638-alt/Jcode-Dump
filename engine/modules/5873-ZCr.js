
var ZCr = ne(async () => {
  jht();
  Gt();
  $H();
  Sx();
  xx();
  jT();
  await Jn([xP(), bT(), Tx()]);
  ((hiH = nt({ name: re, config: sMn })),
    (YCr = ks(re, ljt)),
    (LiH = nt({ authorizationUrl: re, oauthState: re })),
    ($iH = nt({ code: re })),
    (giH = nt({ success: ri(!0) })));
  qwe = class qwe extends $y("McpUnsupportedOAuthError")({ error: re }, { httpApiStatus: 400 }) {};
  ((fAe = {
    status: "/mcp",
    auth: "/mcp/:name/auth",
    authCallback: "/mcp/:name/auth/callback",
    authAuthenticate: "/mcp/:name/auth/authenticate",
    connect: "/mcp/:name/connect",
    disconnect: "/mcp/:name/disconnect",
  }),
    (ets = kE("mcp")
      .add(
        zd("mcp")
          .add(
            MH("status", fAe.status, {
              query: jo,
              success: zs(ks(re, ljt), "MCP server status"),
            }).annotateMerge(
              Fn({
                identifier: "mcp.status",
                summary: "Get MCP status",
                description: "Get the status of all Model Context Protocol (MCP) servers.",
              }),
            ),
            sc("add", fAe.status, {
              query: jo,
              payload: hiH,
              success: zs(YCr, "MCP server added successfully"),
              error: PA,
            }).annotateMerge(
              Fn({
                identifier: "mcp.add",
                summary: "Add MCP server",
                description: "Dynamically add a new Model Context Protocol (MCP) server to the system.",
              }),
            ),
            sc("authStart", fAe.auth, {
              params: { name: re },
              query: jo,
              success: zs(LiH, "OAuth flow started"),
              error: [qwe, ok],
            }).annotateMerge(
              Fn({
                identifier: "mcp.auth.start",
                summary: "Start MCP OAuth",
                description: "Start OAuth authentication flow for a Model Context Protocol (MCP) server.",
              }),
            ),
            sc("authCallback", fAe.authCallback, {
              params: { name: re },
              query: jo,
              payload: $iH,
              success: zs(ljt, "OAuth authentication completed"),
              error: [PA, ok],
            }).annotateMerge(
              Fn({
                identifier: "mcp.auth.callback",
                summary: "Complete MCP OAuth",
                description:
                  "Complete OAuth authentication for a Model Context Protocol (MCP) server using the authorization code.",
              }),
            ),
            sc("authAuthenticate", fAe.authAuthenticate, {
              params: { name: re },
              query: jo,
              success: zs(ljt, "OAuth authentication completed"),
              error: [qwe, ok],
            }).annotateMerge(
              Fn({
                identifier: "mcp.auth.authenticate",
                summary: "Authenticate MCP OAuth",
                description: "Start OAuth flow and wait for callback (opens browser).",
              }),
            ),
            P8("authRemove", fAe.auth, {
              params: { name: re },
              query: jo,
              success: zs(giH, "OAuth credentials removed"),
              error: ok,
            }).annotateMerge(
              Fn({
                identifier: "mcp.auth.remove",
                summary: "Remove MCP OAuth",
                description: "Remove OAuth credentials for an MCP server.",
              }),
            ),
            sc("connect", fAe.connect, {
              params: { name: re },
              query: jo,
              success: zs(Vi, "MCP server connected successfully"),
              error: ok,
            }).annotateMerge(Fn({ identifier: "mcp.connect", description: "Connect an MCP server." })),
            sc("disconnect", fAe.disconnect, {
              params: { name: re },
              query: jo,
              success: zs(Vi, "MCP server disconnected successfully"),
              error: ok,
            }).annotateMerge(Fn({ identifier: "mcp.disconnect", description: "Disconnect an MCP server." })),
          )
          .annotateMerge(Fn({ title: "mcp", description: "Experimental HttpApi MCP routes." }))
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