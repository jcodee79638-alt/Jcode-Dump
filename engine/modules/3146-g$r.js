
var g$r = ne(async () => {
  CE();
  Gt();
  OH();
  BA();
  AP();
  ww();
  await Jn([g$r(), eN(), XWe(), Yse(), S1(), ixt(), lP()]);
  ((lyi = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"])),
    (p_a = nt({
      path: re,
      offset: Hyi.fields.offset.annotate({
        description: "The 1-based directory entry or text line offset to start reading from",
      }),
      limit: Hyi.fields.limit.annotate({
        description: "The maximum number of directory entries or text lines to read",
      }),
    })),
    (d_a = p_a),
    (m_a = Io([qro, h$r, L$r])),
    (__a = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* tGe,
          r = yield* kY,
          s = yield* JWe,
          a = yield* Cy;
        yield* e
          .register({
            [uyi]: jB({
              description:
                "Read a text file or supported image, page through a large UTF-8 text file by line offset, or list a directory page. Relative paths resolve from the current location; absolute paths inside it are accepted, while external absolute paths require external_directory approval.",
              input: d_a,
              output: m_a,
              toModelOutput: ({ input: H, output: u }) => {
                if (!("encoding" in u) || u.encoding !== "base64" || !lyi.has(u.mime)) return [];
                return [
                  { type: "text", text: "Image read successfully" },
                  { type: "file", data: u.content, mime: u.mime, name: H.path },
                ];
              },
              execute: (H, u) =>
                ft(function* () {
                  let f = { type: "tool", messageID: u.assistantMessageID, callID: u.toolCallID },
                    d = yield* r.resolve({ path: H.path, kind: "directory" }),
                    _ = d.externalDirectory;
                  if (_) yield* a.assert({ ...zWe(_), sessionID: u.sessionID, agent: u.agent, source: f });
                  let L = d.resource,
                    I = bo.make(d.canonical),
                    D = yield* t.inspect(I);
                  if (
                    (yield* a.assert({
                      action: uyi,
                      resources: [L],
                      save: ["*"],
                      sessionID: u.sessionID,
                      agent: u.agent,
                      source: f,
                    }),
                    D === "directory")
                  )
                    return yield* t.list(I, { offset: H.offset, limit: H.limit });
                  let S = yield* t.read(I, L, { offset: H.offset, limit: H.limit });
                  if ("encoding" in S && S.encoding === "base64" && lyi.has(S.mime))
                    return yield* s
                      .normalize(L, { ...S, encoding: "base64" })
                      .pipe(EA("Image.ResizerUnavailableError", () => Jt(S)));
                  if ("encoding" in S && S.encoding === "base64") return yield* bn(new rhe({ resource: L }));
                  return S;
                }).pipe(
                  Zo((f) => {
                    let d =
                      f instanceof rhe || f instanceof nxt || f instanceof LLt || f instanceof GWe
                        ? f.message
                        : `Unable to read ${H.path}`;
                    return new zp({ message: d });
                  }),
                ),
            }),
          })
          .pipe(on);
      }),
    )),
    (h_a = Ua({ name: "tool/read", layer: __a, deps: [T8, Ayi, Ixe, _Tn, aN] })));
});
import sxt from "path";