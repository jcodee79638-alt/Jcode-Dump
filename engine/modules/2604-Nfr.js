
var Nfr = Ie(function (npc, Zni) {
  var QRo = {
      type: "regex",
      pattern: /\b(npms?_)[a-zA-Z0-9]{36,48}\b/gi,
      replacement: "[REDACTED_NPM_SECRET]",
    },
    YRo = {
      type: "regex",
      pattern: /\b(Basic\s+|Bearer\s+)[\w+=\-.]+\b/gi,
      replacement: "[REDACTED_AUTH_HEADER]",
    },
    ZRo = {
      type: "regex",
      pattern: /\b[A-Za-z0-9-_]{10,}(?!\.\d+\.)\.[A-Za-z0-9-_]{3,}\.[A-Za-z0-9-_]{20,}\b/gi,
      replacement: "[REDACTED_JSON_WEB_TOKEN]",
    },
    e3o = {
      type: "regex",
      pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
      replacement: "[REDACTED_UUID]",
    },
    t3o = {
      type: "regex",
      pattern: /(?:https?|ftp):\/\/[^\s/"$.?#].[^\s"]*/gi,
      replacement: "[REDACTED_URL]",
    },
    r3o = {
      type: "path",
      predicate: ({ path: e }) => e.endsWith(".headers.authorization"),
      replacement: "[REDACTED_HEADER_AUTHORIZATION]",
    },
    n3o = {
      type: "path",
      predicate: ({ path: e }) => e.endsWith(".headers.set-cookie"),
      replacement: "[REDACTED_HEADER_SET_COOKIE]",
    },
    i3o = {
      type: "path",
      predicate: ({ path: e }) => e.endsWith(".headers.cookie"),
      replacement: "[REDACTED_HEADER_COOKIE]",
    },
    s3o = {
      type: "path",
      predicate: ({ path: e }) => e.endsWith(".request"),
      replacement: (e) => ({ method: e?.method, path: e?.path, headers: e?.headers, url: e?.url }),
    },
    o3o = {
      type: "path",
      predicate: ({ path: e }) => e.endsWith(".response"),
      replacement: (e) => ({ data: e?.data, status: e?.status, headers: e?.headers }),
    };
  Zni.exports = {
    TYPE_REGEX: "regex",
    TYPE_URL: "url",
    TYPE_PATH: "path",
    NPM_SECRET: QRo,
    AUTH_HEADER: YRo,
    JSON_WEB_TOKEN: ZRo,
    UUID: e3o,
    URL_MATCHER: t3o,
    DEEP_HEADER_AUTHORIZATION: r3o,
    DEEP_HEADER_SET_COOKIE: n3o,
    DEEP_HEADER_COOKIE: i3o,
    REWRITE_REQUEST: s3o,
    REWRITE_RESPONSE: o3o,
  };
});