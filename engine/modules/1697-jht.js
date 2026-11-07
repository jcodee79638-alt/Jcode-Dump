
var jht = ne(() => {
  jht();
  Gt();
  BA();
  (($Zs = nt({
    type: ri("local").annotate({ description: "Type of MCP server connection" }),
    command: J0(On(re)).annotate({ description: "Command and arguments to run the MCP server" }),
    cwd: be(re).annotate({
      description:
        "Working directory for the MCP server process. Relative paths resolve from the workspace directory.",
    }),
    environment: be(ks(re, re)).annotate({
      description: "Environment variables to set when running the MCP server",
    }),
    enabled: be(Vi).annotate({ description: "Enable or disable the MCP server on startup" }),
    timeout: be(qc).annotate({
      description: "Timeout in ms for MCP server requests. Defaults to 5000 (5 seconds) if not specified.",
    }),
  }).annotate({ identifier: "McpLocalConfig" })),
    (gZs = nt({
      clientId: be(re).annotate({
        description:
          "OAuth client ID. If not provided, dynamic client registration (RFC 7591) will be attempted.",
      }),
      clientSecret: be(re).annotate({
        description: "OAuth client secret (if required by the authorization server)",
      }),
      scope: be(re).annotate({ description: "OAuth scopes to request during authorization" }),
      callbackPort: be(DI.check(EZt({ minimum: 1, maximum: 65535 }))).annotate({
        description:
          "Port for the local OAuth callback server (default: 19876). Shorthand for redirectUri when only the port needs changing. Ignored if redirectUri is set.",
      }),
      redirectUri: be(re).annotate({
        description: "OAuth redirect URI (default: http://127.0.0.1:19876/mcp/oauth/callback).",
      }),
    }).annotate({ identifier: "McpOAuthConfig" })),
    (EZs = nt({
      type: ri("remote").annotate({ description: "Type of MCP server connection" }),
      url: re.annotate({ description: "URL of the remote MCP server" }),
      enabled: be(Vi).annotate({ description: "Enable or disable the MCP server on startup" }),
      headers: be(ks(re, re)).annotate({ description: "Headers to send with the request" }),
      oauth: be(Io([gZs, ri(!1)])).annotate({
        description:
          "OAuth authentication configuration for the MCP server. Set to false to disable OAuth auto-detection.",
      }),
      timeout: be(qc).annotate({
        description: "Timeout in ms for MCP server requests. Defaults to 5000 (5 seconds) if not specified.",
      }),
    }).annotate({ identifier: "McpRemoteConfig" })),
    (sMn = Io([$Zs, EZs]).annotate({ discriminator: "type" })));
});