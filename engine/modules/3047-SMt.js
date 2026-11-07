
var SMt = ne(async () => {
  Gt();
  jA();
  OH();
  HIi();
  await Jn([SMt(), Kv(), um()]);
  Gua = BKt(7);
  MMt = class MMt extends (
    ki()("ToolOutputStore.StorageError", { operation: Jo(["encode", "write"]), cause: yd() })
  ) {
    get message() {
      let e = this.cause instanceof Error ? this.cause.message : String(this.cause);
      return `Failed to ${this.operation} tool output${e ? `: ${e}` : ""}`;
    }
  };
  z_e = class z_e extends _i()("@opencode/v2/ToolOutputStore") {};
  ((xMt = Es(
    z_e,
    ft(function* () {
      let e = yield* ui.Service,
        t = yield* M1,
        r = yield* x6(ZM),
        s = xLr.join(t.data, Xua),
        a = Ge("ToolOutputStore.limits")(function* () {
          if (vl(r)) return { maxLines: cIi, maxBytes: AIi };
          let d = yield* r.value.entries().pipe($s(() => Jt([]))),
            _ = Object.assign(
              {},
              ...d.flatMap((L) => (L.type === "document" ? [L.info.tool_output ?? {}] : [])),
            );
          return { maxLines: _.max_lines ?? cIi, maxBytes: _.max_bytes ?? AIi };
        }),
        H = Ge("ToolOutputStore.write")(function* (d) {
          let _ = xLr.join(s, `tool_${t0()}`);
          return (
            yield* e.ensureDir(s).pipe(Zo((L) => new MMt({ operation: "write", cause: L }))),
            yield* e
              .writeFileString(_, d, { flag: "wx" })
              .pipe(Zo((L) => new MMt({ operation: "write", cause: L }))),
            _
          );
        }),
        u = Ge("ToolOutputStore.bound")(function* (d) {
          let _ = yield* a(),
            L = d.output.content.filter((C) => C.type === "file"),
            I = d.output.content.filter((C) => C.type === "text"),
            D =
              d.output.content.length === 0
                ? yield* ZA({
                    try: () => JSON.stringify(d.output.structured, null, 2) ?? String(d.output.structured),
                    catch: (C) => new MMt({ operation: "encode", cause: C }),
                  })
                : I.map((C) => C.text).join("");
          if (Qua(D) <= _.maxLines && Buffer.byteLength(D, "utf-8") <= _.maxBytes)
            return { output: d.output, outputPaths: [] };
          let S = yield* H(D),
            T = `... output truncated; full content saved to ${S} ...`;
          return {
            output: {
              structured: d.output.structured,
              content: [{ type: "text", text: zua(D, T, _.maxLines, _.maxBytes) }, ...L],
            },
            outputPaths: [S],
          };
        }),
        f = Ge("ToolOutputStore.cleanup")(function* () {
          let d = yield* e.readDirectory(s).pipe($s(() => Jt([]))),
            _ = Date.now() - $E(Gua);
          for (let L of d) {
            if (!L.startsWith("tool_")) continue;
            let I = xLr.join(s, L),
              S = (yield* e.stat(I).pipe($s(() => ti)))?.mtime.pipe(
                YF((T) => T.getTime()),
                uD(() => 0),
              );
            if (S !== void 0 && S < _) yield* e.remove(I).pipe($s(() => ti));
          }
        });
      return z_e.of({ limits: a, bound: u, cleanup: f });
    }),
  )),
    (SLr = Ua({ service: z_e, layer: xMt, deps: [ui.node, lw, PY] })),
    (bDc = Ua({ service: z_e, layer: xMt, deps: [ui.node, lw] })),
    (Yua = zg(
      ft(function* () {
        yield* (yield* z_e).cleanup().pipe(xie(Die(cut(1))), EI);
      }),
    )),
    (jDc = iA({ name: "tool-output-cleanup", layer: gie(xMt, Yua.pipe(ou(xMt))), deps: [ui.node, lw] })));
});