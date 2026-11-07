
var Lqi = ne(async () => {
  Gt();
  QPt();
  Ql();
  Jbr();
  jA();
  o0();
  Ry();
  Yze();
  lb();
  _w();
  Hse();
  Kbr();
  await Jn([Vy(), Zve(), SX(), rCt(), rCt()]);
  ((dqi = new Set(["cd", "chdir", "popd", "pushd", "push-location", "set-location"])),
    (D4a = new Set([
      ...dqi,
      "rm",
      "cp",
      "mv",
      "mkdir",
      "touch",
      "chmod",
      "chown",
      "cat",
      "get-content",
      "set-content",
      "add-content",
      "copy-item",
      "move-item",
      "remove-item",
      "new-item",
      "rename-item",
    ])),
    (y4a = new Set([
      "copy",
      "del",
      "dir",
      "erase",
      "md",
      "mkdir",
      "move",
      "rd",
      "ren",
      "rename",
      "rmdir",
      "type",
    ])),
    (M4a = new Set(["-destination", "-literalpath", "-path"])),
    (x4a = new Set(["-confirm", "-debug", "-force", "-nonewline", "-recurse", "-verbose", "-whatif"])));
  ((U4a = Ge("ShellTool.parse")(function* (e, t) {
    let r = yield* nA(() => B4a().then((s) => (t ? s.ps : s.bash).parse(e)));
    if (!r) throw Error("Failed to parse command");
    return r;
  })),
    (N4a = Ge("ShellTool.ask")(function* (e, t, r) {
      if (t.dirs.size > 0) {
        let s = Array.from(t.dirs),
          a = s.map((H) => ui.normalizePathPattern(zLe.join(H, "*")));
        yield* e.ask({
          permission: "external_directory",
          patterns: a,
          always: a,
          metadata: { command: r.command, directories: s, patterns: a },
        });
      }
      if (t.patterns.size === 0) return;
      yield* e.ask({
        permission: eCt,
        patterns: Array.from(t.patterns),
        always: Array.from(t.always),
        metadata: { command: r.command },
      });
    })));
  ((B4a = JLe(async () => {
    let { Parser: e } = await Promise.resolve().then(() => (Jbr(), Z4i)),
      { default: t } = await Promise.resolve().then(() => Tl(Hqi(), 1)),
      r = zbr(t);
    await e.init({
      locateFile() {
        return r;
      },
    });
    let { default: s } = await Promise.resolve().then(() => Tl(cqi(), 1)),
      { default: a } = await Promise.resolve().then(() => Tl(Aqi(), 1)),
      H = zbr(s),
      u = zbr(a),
      [f, d] = await Promise.all([Qze.load(H), Qze.load(u)]),
      _ = new e();
    _.setLanguage(f);
    let L = new e();
    return (L.setLanguage(d), { bash: _, ps: L });
  })),
    (hqi = t_(
      eCt,
      ft(function* () {
        let e = yield* Eg,
          t = yield* kS,
          r = yield* ui.Service,
          s = yield* RN,
          a = yield* IT,
          u = (yield* NE).bashDefaultTimeoutMs ?? 120000,
          f = Ge("ShellTool.cygpath")(function* (S, T) {
            let O = (yield* t
              .lines(Lh(S, ["-lc", 'cygpath -w -- "$1"', "_", T]))
              .pipe($s(() => Jt([]))))[0]?.trim();
            if (!O) return;
            return ui.normalizePath(O);
          }),
          d = Ge("ShellTool.resolvePath")(function* (S, T, C) {
            if (pua(C) && S.startsWith("/") && ui.windowsPath(S) === S) {
              let O = yield* f(C, S);
              if (O) return O;
            }
            return ui.normalizePath(zLe.resolve(T, ui.windowsPath(S)));
          }),
          _ = Ge("ShellTool.argPath")(function* (S, T, C, O) {
            let B = C ? j4a(S, T, O) : _qi(mqi(S)),
              V = B && w4a(B);
            if (!V || C4a(V, C)) return;
            let q = C ? P4a(V) : V;
            if (!q) return;
            return yield* d(q, T, O);
          }),
          L = Ge("ShellTool.collect")(function* (S, T, C, O, B) {
            let V = { dirs: new Set(), patterns: new Set(), always: new Set() },
              q = a4a(J_e(O));
            for (let Z of v4a(S)) {
              let se = S4a(Z),
                ae = se.map((Ae) => Ae.text),
                z = C || q === "cmd" ? ae[0]?.toLowerCase() : ae[0];
              if (z && (D4a.has(z) || (q === "cmd" && y4a.has(z))))
                for (let Ae of k4a(se, C, q === "cmd")) {
                  let le = yield* _(Ae, T, C, O);
                  if ((yield* fH("resolved path", { arg: Ae, resolved: le }), !le || XLe(le, B))) continue;
                  let Be = (yield* r.isDir(le)) ? le : zLe.dirname(le);
                  V.dirs.add(Be);
                }
              if (ae.length && (!z || !dqi.has(z)))
                (V.patterns.add(T4a(Z)), V.always.add(h4a(ae).join(" ") + " *"));
            }
            return V;
          }),
          I = Ge("ShellTool.shellEnv")(function* (S, T) {
            let C = yield* a.trigger(
              "shell.env",
              { cwd: T, sessionID: S.sessionID, callID: S.callID },
              { env: {} },
            );
            return { ...process.env, ...C.env };
          }),
          D = Ge("ShellTool.run")(function* (S, T) {
            let C = yield* s.limits(),
              O = C.maxBytes * 2,
              B = "",
              V = "",
              q = [],
              Z = 0,
              se = "",
              ae,
              z = !1,
              Ae = !1,
              le = !1,
              Be = ni(function* () {
                let we = ae;
                if (!we) return;
                if (((ae = void 0), we.destroyed || we.closed)) return;
                yield* nA(
                  () =>
                    new Promise((Pe) => {
                      let ye = !1,
                        ot = () => {
                          if (ye) return;
                          ((ye = !0), we.off("close", ot), we.off("error", ot), we.off("finish", ot), Pe());
                        };
                      (we.once("close", ot), we.once("error", ot), we.once("finish", ot), we.end(ot));
                    }),
                ).pipe($s(() => ti));
              });
            yield* T.metadata({ metadata: { output: "" } });
            let Te = yield* FL(
                ft(function* () {
                  yield* sL(Be);
                  let we = yield* t.spawn(F4a(S.shell, S.command, S.cwd, S.env));
                  yield* EI(
                    FW(C6(we.all), (Ee) => {
                      let Ve = Buffer.byteLength(Ee, "utf-8");
                      (q.push({ text: Ee, size: Ve }), (Z += Ve));
                      while (Z > O && q.length > 1) {
                        let Fe = q.shift();
                        if (!Fe) break;
                        ((Z -= Fe.size), (z = !0));
                      }
                      if (((V = pqi(V + Ee)), se)) ae?.write(Ee);
                      else if (((B += Ee), Buffer.byteLength(B, "utf-8") > C.maxBytes))
                        return s.write(B).pipe(
                          Zu((Fe) =>
                            jn(() => {
                              ((se = Fe), (z = !0), (ae = I4a(Fe, { flags: "a" })), (B = ""));
                            }),
                          ),
                          Zu(T.metadata({ metadata: { output: V } })),
                        );
                      return T.metadata({ metadata: { output: V } });
                    }),
                  );
                  let Pe = Fd((Ee) => {
                      if (T.abort.aborted) return Ee(ti);
                      let Ve = () => Ee(ti);
                      return (
                        T.abort.addEventListener("abort", Ve, { once: !0 }),
                        jn(() => T.abort.removeEventListener("abort", Ve))
                      );
                    }),
                    ye = Qq(`${S.timeout + 100} millis`),
                    ot = yield* $Qt([
                      we.exitCode.pipe(Vn((Ee) => ({ kind: "exit", code: Ee }))),
                      Pe.pipe(Vn(() => ({ kind: "abort", code: null }))),
                      ye.pipe(Vn(() => ({ kind: "timeout", code: null }))),
                    ]);
                  if (ot.kind === "abort")
                    ((le = !0), yield* we.kill({ forceKillAfter: "3 seconds" }).pipe(on));
                  if (ot.kind === "timeout")
                    ((Ae = !0), yield* we.kill({ forceKillAfter: "3 seconds" }).pipe(on));
                  return ot.kind === "exit" ? ot.code : null;
                }),
              ).pipe(on),
              Lt = [];
            if (Ae)
              Lt.push(
                `shell tool terminated command after exceeding timeout ${S.timeout} ms. If this command is expected to take longer and is not waiting for interactive input, retry with a larger timeout value in milliseconds.`,
              );
            if (le) Lt.push("User aborted the command");
            let Ht = q.map((we) => we.text).join(""),
              Se = O4a(Ht, C.maxLines, C.maxBytes);
            if (Se.cut) z = !0;
            if (!se && Se.cut) se = yield* s.write(Ht);
            let _e = Se.text;
            if (!_e) _e = "(no output)";
            if (z && se)
              _e =
                `...output truncated...

Full output saved to: ${se}

` + _e;
            if (Lt.length > 0)
              _e +=
                `

<shell_metadata>
` +
                Lt.join(`
`) +
                `
</shell_metadata>`;
            return {
              title: S.command,
              metadata: {
                output: V || pqi(_e),
                exit: Te,
                truncated: z,
                ...(z && se ? { outputPath: se } : {}),
              },
              output: _e,
            };
          });
        return () =>
          ft(function* () {
            let S = yield* e.get(),
              T = LEi(S.shell),
              C = J_e(T),
              O = yield* s.limits(),
              B = _4a(C, "win32", O, u);
            return (
              yield* fH("shell tool using shell", { shell: T }),
              {
                description: B.description,
                parameters: B.parameters,
                execute: (V, q) =>
                  ft(function* () {
                    let Z = yield* Jc,
                      se = V.workdir ? yield* d(V.workdir, Z.directory, T) : Z.directory;
                    if (V.timeout !== void 0 && V.timeout < 0)
                      throw Error(`Invalid timeout value: ${V.timeout}. Timeout must be a positive number.`);
                    let ae = V.timeout ?? u,
                      z = ALr(T);
                    return (
                      yield* FL(
                        ft(function* () {
                          let Ae = yield* Bd(U4a(V.command, z), (Be) => jn(() => Be.delete())),
                            le = yield* L(Ae.rootNode, se, z, T, Z);
                          if (!XLe(se, Z)) le.dirs.add(se);
                          yield* N4a(q, le, V);
                        }),
                      ),
                      yield* D(
                        { shell: T, command: V.command, cwd: se, env: yield* I(q, se), timeout: ae },
                        q,
                      )
                    );
                  }),
              }
            );
          });
      }),
    )));
});