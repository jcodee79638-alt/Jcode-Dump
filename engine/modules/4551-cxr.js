
var cxr = ne(() => {
  au();
  p3i();
  Gt();
  cxr();
  zXe = class zXe extends _i()("@opencode/McpBrowser") {};
  ((W2a = bf(
    zXe,
    zXe.of({
      open: Ge("McpBrowser.open")(function* (e) {
        if (process.env.JAC_DESKTOP_MCP === "1") {
          let r = yield* ZA({ try: () => q2a(e), catch: () => Error("Invalid MCP authorization address.") });
          process.stdout.write(
            JSON.stringify({ event: { type: "mcpAuth", url: r } }) +
              `
`,
          );
          return;
        }
        let t = yield* bl({ try: () => f3i(e), catch: (r) => (r instanceof Error ? r : Error(String(r))) });
        yield* Fd((r) => {
          let s = setTimeout(() => r(ti), 500);
          t.on("error", (H) => {
            (clearTimeout(s), r(bn(H)));
          });
          let a = (H) => {
            if (H === null || H === 0) return;
            (clearTimeout(s), r(bn(Error(`Browser open failed with exit code ${H}`))));
          };
          (t.on("exit", a), a(t.exitCode));
        });
      }),
    }),
  )),
    (V2a = Ll({ service: zXe, layer: W2a, deps: [] })));
});