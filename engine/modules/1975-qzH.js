
var qzH,
  Gor,
  vHo,
  bHo,
  jHo,
  GzH,
  uVe,
  AVe,
  qor,
  XzH,
  Txe,
  PHo,
  CHo = (e) =>
    q6.make({
      text: e.text,
      agents: e.agents,
      files: e.files?.map((t) => {
        let r = t.uri.match(/^data:([^;,]+)[;,]/i)?.[1],
          s = URL.canParse(t.uri) ? new URL(t.uri).pathname : (t.name ?? t.uri);
        return { ...t, mime: r ?? (s.endsWith("/") ? "application/x-directory" : ui.mimeType(s)) };
      }),
    }),
  wHo;