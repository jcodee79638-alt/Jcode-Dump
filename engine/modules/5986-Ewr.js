
var Ewr = ne(async () => {
  $H();
  skt();
  await Jy();
  ((RsH = {
    "GET /experimental/session start": { type: "number" },
    "GET /experimental/session roots": cYe,
    "GET /experimental/session archived": cYe,
    "GET /find/file limit": { type: "integer", minimum: 1, maximum: 200 },
    "GET /experimental/session cursor": { type: "number" },
    "GET /experimental/session limit": { type: "number" },
    "GET /session start": { type: "number" },
    "GET /session roots": cYe,
    "GET /session limit": { type: "number" },
    "GET /session/{sessionID}/message limit": {
      type: "integer",
      minimum: 0,
      maximum: Number.MAX_SAFE_INTEGER,
    },
    "GET /vcs/diff context": { type: "integer", minimum: 0 },
    "GET /api/session limit": { type: "number" },
    "GET /api/session start": { type: "number" },
    "GET /api/session roots": cYe,
    "GET /api/session/{sessionID}/message limit": { type: "number" },
  }),
    (WsH = {
      LogLevel: "Log level",
      ServerConfig: "Server configuration for opencode serve and web commands",
      LayoutConfig: "@deprecated Always uses stretch layout.",
    }));
  gwr = _wr.annotateMerge(
    Fn({ title: "opencode", version: "1.0.0", description: "opencode api", transform: VsH }),
  );
});