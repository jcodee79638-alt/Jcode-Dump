
function jB(e) {
  let t = Object.freeze({}),
    r = new Map();
  return (
    vLr.set(t, {
      definition: (s) => {
        let a = r.get(s);
        if (a) return a;
        let H = new Wj({
          name: s,
          description: e.description,
          inputSchema: lIi(e.input),
          outputSchema: lIi(e.structured ?? e.output),
        });
        return (r.set(s, H), H);
      },
      settle: (s, a) =>
        G_(e.input)(s.input).pipe(
          Zo((H) => new zp({ message: `Invalid tool input: ${H.message}` })),
          Hi((H) =>
            e.execute(H, a).pipe(
              Hi((u) =>
                xAn(e.output)(u).pipe(
                  Hi((f) => {
                    if (!e.structured || !e.toStructuredOutput) return Jt({ output: f, structured: f });
                    return xAn(e.structured)(e.toStructuredOutput({ input: H, output: f })).pipe(
                      Vn((d) => ({ output: f, structured: d })),
                    );
                  }),
                  Zo(
                    (f) =>
                      new zp({
                        message: `Tool returned an invalid value for its output schema: ${f.message}`,
                      }),
                  ),
                ),
              ),
              Vn(({ output: u, structured: f }) => ({
                structured: f,
                content:
                  e
                    .toModelOutput?.({ input: H, output: u })
                    .map((d) =>
                      d.type === "text"
                        ? { type: "text", text: d.text }
                        : {
                            type: "file",
                            uri: `data:${d.mime};base64,${d.data}`,
                            mime: d.mime,
                            name: d.name,
                          },
                    ) ?? (typeof u === "string" ? [{ type: "text", text: u }] : []),
              })),
            ),
          ),
        ),
    }),
    t
  );
}