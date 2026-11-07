
var mXi = ne(async () => {
  Gt();
  Cf();
  T$r();
  Qgr();
  lXi();
  await Vy();
  ((XXa = nt({
    url: re.annotate({ description: "The URL to fetch content from" }),
    format: Jo(["text", "markdown", "html"])
      .annotate({
        description: "The format to return the content in (text, markdown, or html). Defaults to markdown.",
        default: "markdown",
      })
      .pipe(Vft(Jt("markdown"))),
    timeout: be(Aa).annotate({ description: "Optional timeout in seconds (max 120)" }),
  })),
    (dXi = t_(
      "webfetch",
      ft(function* () {
        let e = yield* gy,
          t = RU(e);
        return {
          description: fXi,
          parameters: XXa,
          execute: (r, s) =>
            ft(function* () {
              if (!r.url.startsWith("http://") && !r.url.startsWith("https://"))
                throw Error("URL must start with http:// or https://");
              yield* s.ask({
                permission: "webfetch",
                patterns: [r.url],
                always: ["*"],
                metadata: { url: r.url, format: r.format, timeout: r.timeout },
              });
              let a = Math.min((r.timeout ?? qXa / 1000) * 1000, GXa),
                H = "*/*";
              switch (r.format) {
                case "markdown":
                  H =
                    "text/markdown;q=1.0, text/x-markdown;q=0.9, text/plain;q=0.8, text/html;q=0.7, */*;q=0.1";
                  break;
                case "text":
                  H = "text/plain;q=1.0, text/markdown;q=0.9, text/html;q=0.8, */*;q=0.1";
                  break;
                case "html":
                  H =
                    "text/html;q=1.0, application/xhtml+xml;q=0.9, text/plain;q=0.8, text/markdown;q=0.7, */*;q=0.1";
                  break;
                default:
                  H =
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8";
              }
              let u = {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
                  Accept: H,
                  "Accept-Language": "en-US,en;q=0.9",
                },
                f = KM(r.url).pipe(YW(u)),
                d = yield* t.execute(f).pipe(
                  GM(
                    (C) =>
                      C.reason._tag === "StatusCodeError" &&
                      C.reason.response.status === 403 &&
                      C.reason.response.headers["cf-mitigated"] === "challenge",
                    () => t.execute(KM(r.url).pipe(YW({ ...u, "User-Agent": "opencode" }))),
                  ),
                  Tj({ duration: a, orElse: () => No(Error("Request timed out")) }),
                ),
                _ = d.headers["content-length"];
              if (_ && parseInt(_) > pXi) throw Error("Response too large (exceeds 5MB limit)");
              let L = yield* d.arrayBuffer;
              if (L.byteLength > pXi) throw Error("Response too large (exceeds 5MB limit)");
              let I = d.headers["content-type"] || "",
                D = I.split(";")[0]?.trim().toLowerCase() || "",
                S = `${r.url} (${I})`;
              if (_Oi(D)) {
                let C = Buffer.from(L).toString("base64");
                return {
                  title: S,
                  output: "Image fetched successfully",
                  metadata: {},
                  attachments: [{ type: "file", mime: D, url: `data:${D};base64,${C}` }],
                };
              }
              let T = new TextDecoder().decode(L);
              switch (r.format) {
                case "markdown":
                  if (I.includes("text/html")) return { output: KXa(T), title: S, metadata: {} };
                  return { output: T, title: S, metadata: {} };
                case "text":
                  if (I.includes("text/html")) return { output: JXa(T), title: S, metadata: {} };
                  return { output: T, title: S, metadata: {} };
                case "html":
                  return { output: T, title: S, metadata: {} };
                default:
                  return { output: T, title: S, metadata: {} };
              }
            }).pipe(on),
        };
      }),
    )));
});