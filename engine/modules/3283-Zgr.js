
var Zgr = ne(async () => {
  CE();
  Gt();
  Cf();
  T$r();
  Qgr();
  OH();
  vy();
  Ygr();
  AP();
  ww();
  await Jn([Zgr(), S1(), lP()]);
  ((qga = Aa.check(gZt(0), zie(HSi))),
    (cSi = nt({
      url: re.annotate({ description: "The HTTP or HTTPS URL to fetch content from" }),
      format: Jo(["text", "markdown", "html"])
        .annotate({ description: "The format to return the content in. Defaults to markdown." })
        .pipe(Vft(Jt("markdown"))),
      timeout: qga.pipe(be).annotate({ description: `Optional timeout in seconds (maximum: ${HSi})` }),
    })),
    (Gga = nt({ url: re, contentType: re, format: cSi.fields.format, output: re })),
    (n0a = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* gy,
          r = yield* Cy;
        yield* e
          .register({
            [sSi]: jB({
              description: Vga,
              input: cSi,
              output: Gga,
              toModelOutput: ({ output: s }) => [{ type: "text", text: s.output }],
              execute: (s, a) =>
                ft(function* () {
                  (yield* ZA({ try: () => Qga(new URL(s.url)), catch: (_) => _ }),
                    yield* r.assert({
                      action: sSi,
                      resources: [s.url],
                      save: ["*"],
                      metadata: s,
                      sessionID: a.sessionID,
                      agent: a.agent,
                      source: { type: "tool", messageID: a.assistantMessageID, callID: a.toolCallID },
                    }));
                  let { body: H, contentType: u } = yield* ft(function* () {
                      let _ = yield* aSi(t, s.url, s.format).pipe(
                          GM(Kga, () => aSi(t, s.url, s.format, "opencode")),
                        ),
                        L = _.headers["content-type"] || "",
                        I = Zga(L);
                      if (e0a(I)) return yield* bn(Error(`Unsupported fetched image content type: ${I}`));
                      if (!t0a(I)) return yield* bn(Error(`Unsupported fetched file content type: ${I}`));
                      return { body: yield* Yga(_), contentType: L };
                    }).pipe(
                      Tj({ duration: Pv(s.timeout ?? Wga), orElse: () => bn(Error("Request timed out")) }),
                    ),
                    f = new TextDecoder().decode(H),
                    d = yield* ZA({ try: () => r0a(f, u, s.format), catch: (_) => _ });
                  return { url: s.url, contentType: u, format: s.format, output: d };
                }).pipe(Zo(() => new zp({ message: `Unable to fetch ${s.url}` }))),
            }),
          })
          .pipe(on);
      }),
    )),
    (i0a = Ua({ name: "tool/webfetch", layer: n0a, deps: [T8, aN, Q0] })));
});