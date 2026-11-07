
var o$r = ne(async () => {
  CE();
  Gt();
  _w();
  OH();
  jA();
  LV();
  BA();
  AP();
  ww();
  await Jn([o$r(), Kv(), Yse(), S1(), lP()]);
  ((rma = nt({
    command: re.annotate({ description: "Shell command string to execute" }),
    workdir: re
      .pipe(be)
      .annotate({
        description:
          "Working directory. Defaults to the active Location; relative paths resolve from that Location.",
      }),
    timeout: qc
      .check(zie(s$r))
      .pipe(be)
      .annotate({ description: `Timeout in milliseconds. Defaults to ${i$r} and may not exceed ${s$r}.` }),
  })),
    (FDi = nt({ exit: Aa.pipe(be), truncated: Vi, timeout: Vi.pipe(be) })),
    (nma = nt({ ...FDi.fields, output: re, warnings: On(re).pipe(be) })),
    (cma = Ge("BashTool.externalCommandDirectories")(function* (e, t, r) {
      let s = new Set();
      for (let a of ama(t)) {
        let H = Hma(a).replace(/[;,|&]+$/, "");
        if (!n$r.isAbsolute(H)) continue;
        let u = yield* e.resolve(H);
        if (ui.contains(r, u)) continue;
        s.add(yield* e.resolve(n$r.dirname(u)));
      }
      return [...s];
    })),
    (Ama = zg(
      ft(function* () {
        let e = yield* uP,
          t = yield* kY,
          r = yield* ui.Service,
          s = yield* x2,
          a = yield* ZM,
          H = yield* Cy;
        yield* e
          .register({
            [NDi]: jB({
              description: `Execute one shell command string with the host user's filesystem, process, and network authority. The active Location is the default working directory. Relative workdir values resolve from that Location. External workdir values require external_directory approval; best-effort command-argument path warnings are advisory only. Timeout values are milliseconds (default: ${i$r}; maximum: ${s$r}). Uses the configured shell when set; otherwise uses /bin/sh on POSIX and COMSPEC or cmd.exe on Windows.`,
              input: rma,
              output: nma,
              structured: FDi,
              toStructuredOutput: ({ output: u }) => ({
                truncated: u.truncated,
                ...(u.exit === void 0 ? {} : { exit: u.exit }),
                ...(u.timeout === void 0 ? {} : { timeout: u.timeout }),
              }),
              toModelOutput: ({ output: u }) => [
                { type: "text", text: u.output },
                { type: "text", text: sma(u) },
              ],
              execute: (u, f) =>
                ft(function* () {
                  let d = { type: "tool", messageID: f.assistantMessageID, callID: f.toolCallID },
                    _ = yield* t.resolve({ path: u.workdir ?? ".", kind: "directory" }),
                    L = _.externalDirectory;
                  if (L) yield* H.assert({ ...zWe(L), sessionID: f.sessionID, agent: f.agent, source: d });
                  let I = (yield* cma(r, u.command, _.canonical)).map(
                    (q) =>
                      `Command argument references external directory ${n$r.join(q, "*").replaceAll("\\", "/")}. Bash runs with host-user filesystem, process, and network authority; this scan is advisory only.`,
                  );
                  if (
                    (yield* H.assert({
                      action: NDi,
                      resources: [u.command],
                      save: [u.command],
                      sessionID: f.sessionID,
                      agent: f.agent,
                      source: d,
                    }),
                    (yield* r.stat(_.canonical)).type !== "Directory")
                  )
                    return yield* bn(Error(`Working directory is not a directory: ${_.canonical}`));
                  let D = yield* a.entries(),
                    S =
                      Object.assign({}, ...D.flatMap((q) => (q.type === "document" ? [q.info] : []))).shell ??
                      ima(),
                    T = Lh(u.command, [], {
                      cwd: _.canonical,
                      shell: S,
                      stdin: "ignore",
                      detached: !1,
                      forceKillAfter: Pv(3),
                    }),
                    C = u.timeout ?? i$r,
                    O = yield* s
                      .run(T, { combineOutput: !0, timeout: UC(C), maxOutputBytes: tma })
                      .pipe(EA("AppProcessError", (q) => (oma(q) ? Jt(void 0) : bn(q))));
                  if (!O)
                    return {
                      output: `Command exceeded timeout of ${C} ms. Retry with a larger timeout if the command is expected to take longer.`,
                      truncated: !1,
                      timeout: !0,
                      ...(I.length ? { warnings: I } : {}),
                    };
                  let B = O.output?.toString("utf8") || "(no output)",
                    V = O.outputTruncated
                      ? "[output capture truncated at the in-memory safety limit]"
                      : void 0;
                  return {
                    exit: O.exitCode,
                    output: V
                      ? `${B}

${V}`
                      : B,
                    truncated: O.outputTruncated === !0,
                    ...(I.length ? { warnings: I } : {}),
                  };
                }).pipe(Zo(() => new zp({ message: `Unable to execute command: ${u.command}` }))),
            }),
          })
          .pipe(on);
      }),
    )),
    (uma = Ua({ name: "tool/bash", layer: Ama, deps: [T8, Ixe, ui.node, IY, PY, aN] })));
});