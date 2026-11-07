
var Uxn = ne(async () => {
  Gt();
  Cf();
  _w();
  Hse();
  Use();
  OH();
  vy();
  jA();
  await Jn([um(), fxe()]);
  ((H) => {
    let t = {
      "arm64-darwin": { platform: "aarch64-apple-darwin", extension: "tar.gz" },
      "arm64-linux": { platform: "aarch64-unknown-linux-gnu", extension: "tar.gz" },
      "x64-darwin": { platform: "x86_64-apple-darwin", extension: "tar.gz" },
      "x64-linux": { platform: "x86_64-unknown-linux-musl", extension: "tar.gz" },
      "arm64-win32": { platform: "aarch64-pc-windows-msvc", extension: "zip" },
      "ia32-win32": { platform: "i686-pc-windows-msvc", extension: "zip" },
      "x64-win32": { platform: "x86_64-pc-windows-msvc", extension: "zip" },
    };
    class r extends _i()("@opencode/RipgrepBinary") {}
    H.Service = r;
    let s = Es(
      r,
      ft(function* () {
        let u = yield* ui.Service,
          f = RU(yield* gy),
          d = yield* kS,
          _ = ni(function* (I, D) {
            let S = yield* d.spawn(Lh(I, D, { extendEnv: !0, stdin: "ignore" })),
              [T, C, O] = yield* Km([cG(C6(S.stdout)), cG(C6(S.stderr)), S.exitCode], {
                concurrency: "unbounded",
              });
            return { stdout: T, stderr: C, code: O };
          }, FL),
          L = ni(function* (I, D, S) {
            let T = yield* u.makeTempDirectoryScoped({ directory: uH.bin, prefix: "ripgrep-" });
            if (D.extension === "zip") {
              let O = (yield* jn(() => UH("powershell.exe") ?? UH("pwsh.exe"))) ?? "powershell.exe",
                B = yield* _(O, [
                  "-NoProfile",
                  "-NonInteractive",
                  "-Command",
                  `$global:ProgressPreference = 'SilentlyContinue'; Expand-Archive -LiteralPath '${I.replaceAll("'", "''")}' -DestinationPath '${T.replaceAll("'", "''")}' -Force`,
                ]);
              if (B.code !== 0)
                throw Error(
                  B.stderr.trim() || B.stdout.trim() || `ripgrep extraction failed with code ${B.code}`,
                );
            }
            if (D.extension === "tar.gz") {
              let O = yield* _("tar", ["-xzf", I, "-C", T]);
              if (O.code !== 0)
                throw Error(
                  O.stderr.trim() || O.stdout.trim() || `ripgrep extraction failed with code ${O.code}`,
                );
            }
            let C = Vsr.join(T, `ripgrep-15.1.0-${D.platform}`, "rg.exe");
            if (!(yield* u.isFile(C))) throw Error(`ripgrep archive did not contain executable: ${C}`);
            yield* u.copyFile(C, S);
          }, FL);
        return r.of({
          filepath: yield* pD(
            ft(function* () {
              let I = yield* jn(() => UH("rg.exe"));
              if (I && (yield* u.isFile(I).pipe(on))) return I;
              let D = Vsr.join(uH.bin, "rg.exe");
              if (yield* u.isFile(D).pipe(on)) return D;
              let S = "x64-win32",
                T = t[S];
              if (!T) throw Error(`unsupported platform for ripgrep: ${S}`);
              let C = `ripgrep-15.1.0-${T.platform}.${T.extension}`,
                O = `https://github.com/BurntSushi/ripgrep/releases/download/15.1.0/${C}`,
                B = Vsr.join(uH.bin, C);
              (yield* fH("downloading ripgrep", { url: O }), yield* u.ensureDir(uH.bin).pipe(on));
              let V = yield* KM(O).pipe(
                f.execute,
                Hi((q) => q.arrayBuffer),
                Zo((q) => (q instanceof Error ? q : Error(String(q)))),
              );
              if (V.byteLength === 0) throw Error(`failed to download ripgrep from ${O}`);
              return (
                yield* u.writeWithDirs(B, new Uint8Array(V)),
                yield* L(B, T, D),
                yield* u.remove(B, { force: !0 }).pipe(FA),
                D
              );
            }),
          ),
        });
      }),
    );
    H.node = iA({ service: r, layer: s, deps: [ui.node, Q0, qMe] });
  })((Kht ||= {}));
});