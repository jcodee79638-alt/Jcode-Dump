
var LV = ne(() => {
  Gt();
  _w();
  Hse();
  Use();
  OH();
  LV();
  XMe = class XMe extends (
    ki()("AppProcessError", { command: re, exitCode: be(Aa), stderr: be(re), cause: be(yd()) })
  ) {
    get message() {
      let e =
        this.stderr?.trim() ||
        (this.cause instanceof Error ? this.cause.message : this.cause && String(this.cause));
      return `Command failed${this.exitCode === void 0 ? "" : ` (exit ${this.exitCode})`}: ${this.command}${e ? `: ${e}` : ""}`;
    }
  };
  x2 = class x2 extends _i()("@opencode/AppProcess") {};
  ((wQs = Es(
    x2,
    ft(function* () {
      let e = yield* kS,
        t = (a, H) => {
          let u = pWe(a),
            f = FL(
              ft(function* () {
                let L = yield* e.spawn(a);
                if (H?.combineOutput) {
                  let [T, C] = yield* Km([GMe(L.all, H.maxOutputBytes), L.exitCode], {
                    concurrency: "unbounded",
                  });
                  return {
                    command: u,
                    exitCode: C,
                    output: T.buffer,
                    stdout: Buffer.alloc(0),
                    stderr: Buffer.alloc(0),
                    outputTruncated: T.truncated,
                    stdoutTruncated: !1,
                    stderrTruncated: !1,
                  };
                }
                let [I, D, S] = yield* Km(
                  [GMe(L.stdout, H?.maxOutputBytes), GMe(L.stderr, H?.maxErrorBytes), L.exitCode],
                  { concurrency: "unbounded" },
                );
                return {
                  command: u,
                  exitCode: S,
                  stdout: I.buffer,
                  stderr: D.buffer,
                  stdoutTruncated: I.truncated,
                  stderrTruncated: D.truncated,
                };
              }),
            ),
            d = H?.timeout
              ? Tj(f, {
                  duration: H.timeout,
                  orElse: () => bn(new XMe({ command: u, cause: Error("Timed out") })),
                })
              : f;
          return (H?.signal ? d.pipe(Yq(G_t(H.signal).pipe(Zo((L) => q_t(u, L))))) : d).pipe(
            $s((L) => bn(q_t(u, L))),
          );
        },
        r = Ge("AppProcess.run")(function* (a, H) {
          if (H?.stdin === void 0) return yield* t(a, H);
          if (a._tag !== "StandardCommand")
            return yield* new XMe({
              command: pWe(a),
              cause: Error("stdin option only supports StandardCommand; received PipedCommand"),
            });
          let u = Lh(a.command, a.args, { ...a.options, stdin: CQs(H.stdin) });
          return yield* t(u, H);
        }),
        s = (a, H) => {
          let u = pWe(a),
            f = H?.okExitCodes,
            _ = hh(
              ft(function* () {
                let I = yield* e.spawn(a),
                  D = yield* EI(GMe(I.stderr, H?.maxErrorBytes).pipe(Vn((O) => O.buffer.toString("utf8")))),
                  T = (H?.includeStderr === !0 ? I.all : I.stdout).pipe(
                    C6,
                    d1e,
                    aG((O) => O.length > 0),
                  ),
                  C = hh(
                    ft(function* () {
                      let O = yield* I.exitCode;
                      if (f && f.length > 0 && !f.includes(O)) {
                        let B = yield* kBe(D);
                        return NW(new XMe({ command: u, exitCode: O, stderr: B }));
                      }
                      return $1;
                    }),
                  );
                return Fpe(T, C);
              }),
            ).pipe(_Fs((I) => NW(q_t(u, I))));
          if (!H?.signal) return _;
          let L = H.signal;
          return _.pipe(EFs(G_t(L).pipe(Zo((I) => q_t(u, I)))));
        };
      return x2.of({ ...e, run: r, runStream: s });
    }),
  )),
    (IY = iA({ service: x2, layer: wQs, deps: [qMe] })));
});