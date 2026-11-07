
var x5i = ne(async () => {
  hje();
  Mjr();
  Ree();
  D5i();
  xjr();
  await Jn([um(), fxe(), Rae()]);
  ((wGa = {
    id: "deno",
    root: async (e, t) => {
      let r = _je({ targets: ["deno.json", "deno.jsonc"], start: hc.dirname(e), stop: t.directory }),
        s = await r.next();
      if ((await r.return(), !s.value)) return;
      return hc.dirname(s.value);
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
    async spawn(e) {
      let t = UH("deno");
      if (!t) return;
      return { process: Df(t, ["lsp"], { cwd: e }) };
    },
  }),
    (kGa = {
      id: "typescript",
      root: em(
        ["package-lock.json", "bun.lockb", "bun.lock", "pnpm-lock.yaml", "yarn.lock"],
        ["deno.json", "deno.jsonc"],
      ),
      extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts", ".cts"],
      async spawn(e, t) {
        let r = YCe.resolve("typescript/lib/tsserver.js", t.directory);
        if (!r) return;
        let s = await MN("typescript-language-server");
        if (!s) return;
        return {
          process: Df(s, ["--stdio"], { cwd: e, env: { ...process.env } }),
          initialization: { tsserver: { path: r } },
        };
      },
    }),
    (OGa = {
      id: "vue",
      extensions: [".vue"],
      root: em(["package-lock.json", "bun.lockb", "bun.lock", "pnpm-lock.yaml", "yarn.lock"]),
      async spawn(e, t, r) {
        let s = UH("vue-language-server"),
          a = [];
        if (!s) {
          if (r.disableLspDownload) return;
          let u = await MN("@vue/language-server");
          if (!u) return;
          s = u;
        }
        return (
          a.push("--stdio"),
          { process: Df(s, a, { cwd: e, env: { ...process.env } }), initialization: {} }
        );
      },
    }),
    (UGa = {
      id: "eslint",
      root: em(["package-lock.json", "bun.lockb", "bun.lock", "pnpm-lock.yaml", "yarn.lock"]),
      extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts", ".cts", ".vue"],
      async spawn(e, t, r) {
        if (!YCe.resolve("eslint", t.directory)) return;
        let a = hc.join(uH.bin, "vscode-eslint", "server", "out", "eslintServer.js");
        if (!(await Ax(a))) {
          if (r.disableLspDownload) return;
          let u = await fetch("https://github.com/microsoft/vscode-eslint/archive/refs/heads/main.zip");
          if (!u.ok) return;
          let f = hc.join(uH.bin, "vscode-eslint.zip");
          if (u.body) await iee(f, u.body);
          if (
            !(await Wee(f, uH.bin)
              .then(() => !0)
              .catch((S) => !1))
          )
            return;
          await Y_.rm(f, { force: !0 });
          let _ = hc.join(uH.bin, "vscode-eslint-main"),
            L = hc.join(uH.bin, "vscode-eslint");
          if (
            await Y_.stat(L).catch(() => {
              return;
            })
          )
            await Y_.rm(L, { force: !0, recursive: !0 });
          await Y_.rename(_, L);
          let D = "npm.cmd";
          (await lR([D, "install"], { cwd: L }), await lR([D, "run", "compile"], { cwd: L }));
        }
        return { process: Df("node", [a, "--stdio"], { cwd: e, env: { ...process.env } }) };
      },
    }),
    (NGa = {
      id: "oxlint",
      root: em([
        ".oxlintrc.json",
        "package-lock.json",
        "bun.lockb",
        "bun.lock",
        "pnpm-lock.yaml",
        "yarn.lock",
        "package.json",
      ]),
      extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts", ".cts", ".vue", ".astro", ".svelte"],
      async spawn(e, t) {
        let s = hc.join("node_modules", ".bin", "oxc_language_server.cmd"),
          a = hc.join("node_modules", ".bin", "oxlint.cmd"),
          H = async (d) => {
            let _ = hc.join(e, d);
            if (await Ax(_)) return _;
            let L = _je({ targets: [d], start: e, stop: t.worktree }),
              I = await L.next();
            if ((await L.return(), I.value)) return I.value;
            return;
          },
          u = await H(a);
        if (!u) {
          let d = UH("oxlint");
          if (d) u = d;
        }
        if (u) {
          let d = Df(u, ["--help"]);
          if ((await d.exited, d.stdout)) {
            if ((await PGa(d.stdout)).includes("--lsp")) return { process: Df(u, ["--lsp"], { cwd: e }) };
          }
        }
        let f = await H(s);
        if (!f) {
          let d = UH("oxc_language_server");
          if (d) f = d;
        }
        if (f) return { process: Df(f, [], { cwd: e }) };
        return;
      },
    }),
    (FGa = {
      id: "biome",
      root: em([
        "biome.json",
        "biome.jsonc",
        "package-lock.json",
        "bun.lockb",
        "bun.lock",
        "pnpm-lock.yaml",
        "yarn.lock",
      ]),
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".mjs",
        ".cjs",
        ".mts",
        ".cts",
        ".json",
        ".jsonc",
        ".vue",
        ".astro",
        ".svelte",
        ".css",
        ".graphql",
        ".gql",
        ".html",
      ],
      async spawn(e) {
        let t = hc.join(e, "node_modules", ".bin", "biome"),
          r;
        if (await Ax(t)) r = t;
        if (!r) {
          let H = UH("biome");
          if (H) r = H;
        }
        let s = ["lsp-proxy", "--stdio"];
        if (!r) {
          if (!YCe.resolve("biome", e)) return;
          if (((r = await MN("biome")), !r)) return;
          s = ["lsp-proxy", "--stdio"];
        }
        return { process: Df(r, s, { cwd: e, env: { ...process.env } }) };
      },
    }),
    (BGa = {
      id: "gopls",
      root: async (e, t) => {
        let r = await em(["go.work"])(e, t);
        if (r) return r;
        return em(["go.mod", "go.sum"])(e, t);
      },
      extensions: [".go"],
      async spawn(e, t, r) {
        let s = UH("gopls");
        if (!s) {
          if (!UH("go")) return;
          if (r.disableLspDownload) return;
          if (
            (await zCe(["go", "install", "golang.org/x/tools/gopls@latest"], {
              env: { ...process.env, GOBIN: uH.bin },
              stdout: "pipe",
              stderr: "pipe",
              stdin: "pipe",
            }).exited) !== 0
          )
            return;
          s = hc.join(uH.bin, "gopls.exe");
        }
        return { process: Df(s, { cwd: e }) };
      },
    }),
    (RGa = {
      id: "ruby-lsp",
      root: em(["Gemfile"]),
      extensions: [".rb", ".rake", ".gemspec", ".ru"],
      async spawn(e, t, r) {
        let s = UH("rubocop");
        if (!s) {
          let a = UH("ruby"),
            H = UH("gem");
          if (!a || !H) return;
          if (r.disableLspDownload) return;
          if (
            (await zCe(["gem", "install", "rubocop", "--bindir", uH.bin], {
              stdout: "pipe",
              stderr: "pipe",
              stdin: "pipe",
            }).exited) !== 0
          )
            return;
          s = hc.join(uH.bin, "rubocop.exe");
        }
        return { process: Df(s, ["--lsp"], { cwd: e }) };
      },
    }),
    (WGa = {
      id: "ty",
      extensions: [".py", ".pyi"],
      root: em([
        "pyproject.toml",
        "ty.toml",
        "setup.py",
        "setup.cfg",
        "requirements.txt",
        "Pipfile",
        "pyrightconfig.json",
      ]),
      async spawn(e, t, r) {
        if (!r.experimentalLspTy) return;
        let s = UH("ty"),
          a = {},
          H = [process.env.VIRTUAL_ENV, hc.join(e, ".venv"), hc.join(e, "venv")].filter((f) => f !== void 0);
        for (let f of H) {
          let _ = hc.join(f, "Scripts", "python.exe");
          if (await Ax(_)) {
            a.pythonPath = _;
            break;
          }
        }
        if (!s)
          for (let f of H) {
            let _ = hc.join(f, "Scripts", "ty.exe");
            if (await Ax(_)) {
              s = _;
              break;
            }
          }
        if (!s) return;
        return { process: Df(s, ["server"], { cwd: e }), initialization: a };
      },
    }),
    (VGa = {
      id: "pyright",
      extensions: [".py", ".pyi"],
      root: em([
        "pyproject.toml",
        "setup.py",
        "setup.cfg",
        "requirements.txt",
        "Pipfile",
        "pyrightconfig.json",
      ]),
      async spawn(e, t, r) {
        let s = UH("pyright-langserver"),
          a = [];
        if (!s) {
          if (r.disableLspDownload) return;
          let d = await MN("pyright", "pyright-langserver");
          if (!d) return;
          s = d;
        }
        a.push("--stdio");
        let H = {},
          u = [process.env.VIRTUAL_ENV, hc.join(e, ".venv"), hc.join(e, "venv")].filter((d) => d !== void 0);
        for (let d of u) {
          let L = hc.join(d, "Scripts", "python.exe");
          if (await Ax(L)) {
            H.pythonPath = L;
            break;
          }
        }
        return { process: Df(s, a, { cwd: e, env: { ...process.env } }), initialization: H };
      },
    }),
    (qGa = {
      id: "elixir-ls",
      extensions: [".ex", ".exs"],
      root: em(["mix.exs", "mix.lock"]),
      async spawn(e, t, r) {
        let s = UH("elixir-ls");
        if (!s) {
          let a = hc.join(uH.bin, "elixir-ls");
          if (((s = hc.join(uH.bin, "elixir-ls-master", "release", "language_server.bat")), !(await Ax(s)))) {
            if (!UH("elixir")) return;
            if (r.disableLspDownload) return;
            let u = await fetch("https://github.com/elixir-lsp/elixir-ls/archive/refs/heads/master.zip");
            if (!u.ok) return;
            let f = hc.join(uH.bin, "elixir-ls.zip");
            if (u.body) await iee(f, u.body);
            if (
              !(await Wee(f, uH.bin)
                .then(() => !0)
                .catch((I) => !1))
            )
              return;
            await Y_.rm(f, { force: !0, recursive: !0 });
            let _ = hc.join(uH.bin, "elixir-ls-master"),
              L = { MIX_ENV: "prod", ...process.env };
            (await lR(["mix", "deps.get"], { cwd: _, env: L }),
              await lR(["mix", "compile"], { cwd: _, env: L }),
              await lR(["mix", "elixir_ls.release2", "-o", "release"], { cwd: _, env: L }));
          }
        }
        return { process: Df(s, { cwd: e }) };
      },
    }),
    (GGa = {
      id: "zls",
      extensions: [".zig", ".zon"],
      root: em(["build.zig"]),
      async spawn(e, t, r) {
        let s = UH("zls");
        if (!s) {
          if (!UH("zig")) return;
          if (r.disableLspDownload) return;
          let H = await fetch("https://api.github.com/repos/zigtools/zls/releases/latest");
          if (!H.ok) return;
          let u = await H.json(),
            f = "win32",
            d = "x64",
            _ = "",
            L = d;
          if (d === "arm64") L = "aarch64";
          else if (d === "x64") L = "x86_64";
          else if (d === "ia32") L = "x86";
          let I = f;
          if (f === "darwin") I = "macos";
          else if (f === "win32") I = "windows";
          let D = f === "win32" ? "zip" : "tar.xz";
          if (
            ((_ = `zls-${L}-${I}.${D}`),
            ![
              "zls-x86_64-linux.tar.xz",
              "zls-x86_64-macos.tar.xz",
              "zls-x86_64-windows.zip",
              "zls-aarch64-linux.tar.xz",
              "zls-aarch64-macos.tar.xz",
              "zls-aarch64-windows.zip",
              "zls-x86-linux.tar.xz",
              "zls-x86-windows.zip",
            ].includes(_))
          )
            return;
          let T = u.assets?.find((V) => V.name === _);
          if (!T?.browser_download_url) return;
          let C = T.browser_download_url,
            O = await fetch(C);
          if (!O.ok) return;
          let B = hc.join(uH.bin, _);
          if (O.body) await iee(B, O.body);
          if (D === "zip") {
            if (
              !(await Wee(B, uH.bin)
                .then(() => !0)
                .catch((q) => !1))
            )
              return;
          } else await QLe(["tar", "-xf", B], { cwd: uH.bin });
          if (
            (await Y_.rm(B, { force: !0 }),
            (s = hc.join(uH.bin, "zls" + (f === "win32" ? ".exe" : ""))),
            !(await Ax(s)))
          )
            return;
          if (f !== "win32") await Y_.chmod(s, 493).catch(() => {});
        }
        return { process: Df(s, { cwd: e }) };
      },
    }),
    (XGa = {
      id: "csharp",
      root: em([".slnx", ".sln", ".csproj", "global.json"]),
      extensions: [".cs", ".csx"],
      async spawn(e, t, r) {
        let s = await y5i(r.disableLspDownload);
        if (!s) return;
        return { process: Df(s, ["--stdio", "--autoLoadProjects"], { cwd: e }) };
      },
    }),
    (JGa = {
      id: "razor",
      root: em([".slnx", ".sln", ".csproj", "global.json"]),
      extensions: [".razor", ".cshtml"],
      async spawn(e, t, r) {
        let s = await y5i(r.disableLspDownload);
        if (!s) return;
        let a = await zGa();
        if (!a) return;
        return {
          process: Df(
            s,
            [
              "--stdio",
              "--autoLoadProjects",
              `--razorSourceGenerator=${a.compiler}`,
              `--razorDesignTimePath=${a.targets}`,
              "--extension",
              a.extension,
            ],
            { cwd: e },
          ),
        };
      },
    }));
  ((QGa = {
    id: "fsharp",
    root: em([".slnx", ".sln", ".fsproj", "global.json"]),
    extensions: [".fs", ".fsi", ".fsx", ".fsscript"],
    async spawn(e, t, r) {
      let s = UH("fsautocomplete");
      if (!s) {
        if (!UH("dotnet")) return;
        if (r.disableLspDownload) return;
        if (
          (await zCe(["dotnet", "tool", "install", "fsautocomplete", "--tool-path", uH.bin], {
            stdout: "pipe",
            stderr: "pipe",
            stdin: "pipe",
          }).exited) !== 0
        )
          return;
        s = hc.join(uH.bin, "fsautocomplete.exe");
      }
      return { process: Df(s, { cwd: e }) };
    },
  }),
    (YGa = {
      id: "sourcekit-lsp",
      extensions: [".swift", ".objc", "objcpp"],
      root: em(["Package.swift", "*.xcodeproj", "*.xcworkspace"]),
      async spawn(e) {
        let t = UH("sourcekit-lsp");
        if (t) return { process: Df(t, { cwd: e }) };
        if (!UH("xcrun")) return;
        let r = await CGa(["xcrun", "--find", "sourcekit-lsp"]);
        if (r.code !== 0) return;
        let s = r.text.trim();
        return { process: Df(s, { cwd: e }) };
      },
    }),
    (ZGa = {
      id: "rust",
      root: async (e, t) => {
        let r = await em(["Cargo.toml", "Cargo.lock"])(e, t);
        if (r === void 0) return;
        let s = r;
        while (s !== hc.dirname(s)) {
          let a = hc.join(s, "Cargo.toml");
          try {
            if ((await eXe(a)).includes("[workspace]")) return s;
          } catch {}
          let H = hc.dirname(s);
          if (H === s) break;
          if (((s = H), !s.startsWith(t.worktree))) break;
        }
        return r;
      },
      extensions: [".rs"],
      async spawn(e) {
        let t = UH("rust-analyzer");
        if (!t) return;
        return { process: Df(t, { cwd: e }) };
      },
    }),
    (e5a = {
      id: "clangd",
      root: em(["compile_commands.json", "compile_flags.txt", ".clangd"]),
      extensions: [".c", ".cpp", ".cc", ".cxx", ".c++", ".h", ".hpp", ".hh", ".hxx", ".h++"],
      async spawn(e, t, r) {
        let s = ["--background-index", "--clang-tidy"],
          a = UH("clangd");
        if (a) return { process: Df(a, s, { cwd: e }) };
        let H = ".exe",
          u = hc.join(uH.bin, "clangd" + H);
        if (await Ax(u)) return { process: Df(u, s, { cwd: e }) };
        let f = await Y_.readdir(uH.bin, { withFileTypes: !0 }).catch(() => []);
        for (let Ae of f) {
          if (!Ae.isDirectory()) continue;
          if (!Ae.name.startsWith("clangd_")) continue;
          let le = hc.join(uH.bin, Ae.name, "bin", "clangd" + H);
          if (await Ax(le)) return { process: Df(le, s, { cwd: e }) };
        }
        if (r.disableLspDownload) return;
        let d = await fetch("https://api.github.com/repos/clangd/clangd/releases/latest");
        if (!d.ok) return;
        let _ = await d.json(),
          L = _.tag_name;
        if (!L) return;
        let I = "win32",
          S = { darwin: "mac", linux: "linux", win32: "windows" }[I];
        if (!S) return;
        let T = _.assets ?? [],
          C = (Ae) => {
            if (!Ae.name) return !1;
            if (!Ae.browser_download_url) return !1;
            if (!Ae.name.includes(S)) return !1;
            return Ae.name.includes(L);
          },
          O =
            T.find((Ae) => C(Ae) && Ae.name?.endsWith(".zip")) ??
            T.find((Ae) => C(Ae) && Ae.name?.endsWith(".tar.xz")) ??
            T.find((Ae) => C(Ae));
        if (!O?.name || !O.browser_download_url) return;
        let B = O.name,
          V = await fetch(O.browser_download_url);
        if (!V.ok) return;
        let q = hc.join(uH.bin, B),
          Z = await V.arrayBuffer();
        if (Z.byteLength === 0) return;
        await jva(q, Buffer.from(Z));
        let se = B.endsWith(".zip"),
          ae = B.endsWith(".tar.xz");
        if (!se && !ae) return;
        if (se) {
          if (
            !(await Wee(q, uH.bin)
              .then(() => !0)
              .catch((le) => !1))
          )
            return;
        }
        if (ae) await QLe(["tar", "-xf", q], { cwd: uH.bin });
        await Y_.rm(q, { force: !0 });
        let z = hc.join(uH.bin, "clangd_" + L, "bin", "clangd" + H);
        if (!(await Ax(z))) return;
        if (I !== "win32") await Y_.chmod(z, 493).catch(() => {});
        return (
          await Y_.unlink(hc.join(uH.bin, "clangd")).catch(() => {}),
          await Y_.symlink(z, hc.join(uH.bin, "clangd")).catch(() => {}),
          { process: Df(z, s, { cwd: e }) }
        );
      },
    }),
    (t5a = {
      id: "svelte",
      extensions: [".svelte"],
      root: em(["package-lock.json", "bun.lockb", "bun.lock", "pnpm-lock.yaml", "yarn.lock"]),
      async spawn(e, t, r) {
        let s = UH("svelteserver"),
          a = [];
        if (!s) {
          if (r.disableLspDownload) return;
          let u = await MN("svelte-language-server");
          if (!u) return;
          s = u;
        }
        return (
          a.push("--stdio"),
          { process: Df(s, a, { cwd: e, env: { ...process.env } }), initialization: {} }
        );
      },
    }),
    (r5a = {
      id: "astro",
      extensions: [".astro"],
      root: em(["package-lock.json", "bun.lockb", "bun.lock", "pnpm-lock.yaml", "yarn.lock"]),
      async spawn(e, t, r) {
        let s = YCe.resolve("typescript/lib/tsserver.js", t.directory);
        if (!s) return;
        let a = hc.dirname(s),
          H = UH("astro-ls"),
          u = [];
        if (!H) {
          if (r.disableLspDownload) return;
          let d = await MN("@astrojs/language-server");
          if (!d) return;
          H = d;
        }
        return (
          u.push("--stdio"),
          {
            process: Df(H, u, { cwd: e, env: { ...process.env } }),
            initialization: { typescript: { tsdk: a } },
          }
        );
      },
    }));
  ((i5a = {
    id: "jdtls",
    root: async (e, t) => {
      let r = ["settings.gradle", "settings.gradle.kts"],
        s = ["gradlew", "gradlew.bat"],
        [a, H] = await Promise.all([gCt(s, r)(e, t), gCt(r)(e, t)]);
      if (a) return a;
      if (H) return H;
      let u = await gCt(["build.gradle", "build.gradle.kts"])(e, t);
      if (u) return u;
      let f = await see("pom.xml", hc.dirname(e), t.directory);
      if (f.length > 0) {
        let _ = hc.dirname(f[0]);
        for (let L = 1; L < f.length; L++) {
          let I = hc.dirname(f[L]),
            D = hc.relative(I, _),
            S = await Y_.readFile(f[L], "utf-8").catch(() => null);
          if (S && n5a(S, D)) _ = I;
          else break;
        }
        return _;
      }
      let d = await gCt([".project", ".classpath"])(e, t);
      if (d) return d;
      return;
    },
    extensions: [".java"],
    async spawn(e, t, r) {
      let s = UH("java");
      if (!s) return;
      let a = await QLe(["java", "-version"]).then((D) => {
        let S = /"(\d+)\.\d+\.\d+"/.exec(D.stderr.toString());
        return !S ? void 0 : parseInt(S[1]);
      });
      if (a == null || a < 21) return;
      let H = hc.join(uH.bin, "jdtls"),
        u = hc.join(H, "plugins");
      if (!(await ewe(u))) {
        if (r.disableLspDownload) return;
        await Y_.mkdir(H, { recursive: !0 });
        let D =
            "https://www.eclipse.org/downloads/download.php?file=/jdtls/snapshots/jdt-language-server-latest.tar.gz",
          S = "release.tar.gz",
          T = await fetch(D);
        if (!T.ok || !T.body) return;
        if ((await iee(hc.join(H, S), T.body), (await QLe(["tar", "-xzf", S], { cwd: H })).code !== 0))
          return;
        await Y_.rm(hc.join(H, S), { force: !0 });
      }
      let d =
          (await Y_.readdir(u).catch(() => []))
            .find((D) => /^org\.eclipse\.equinox\.launcher_.*\.jar$/.test(D))
            ?.trim() ?? "",
        _ = hc.join(u, d);
      if (!(await ewe(_))) return;
      let L = hc.join(
          H,
          (() => {
            switch ("win32") {
              case "darwin":
                return "config_mac";
              case "linux":
                return "config_linux";
              case "win32":
                return "config_win";
              default:
                return "config_linux";
            }
          })(),
        ),
        I = await Y_.mkdtemp(hc.join(ZCe.tmpdir(), "opencode-jdtls-data"));
      return {
        process: Df(
          s,
          [
            "-jar",
            _,
            "-configuration",
            L,
            "-data",
            I,
            "-Declipse.application=org.eclipse.jdt.ls.core.id1",
            "-Dosgi.bundles.defaultStartLevel=4",
            "-Declipse.product=org.eclipse.jdt.ls.core.product",
            "-Dlog.level=ALL",
            "--add-modules=ALL-SYSTEM",
            "--add-opens java.base/java.util=ALL-UNNAMED",
            "--add-opens java.base/java.lang=ALL-UNNAMED",
          ],
          { cwd: e },
        ),
      };
    },
  }),
    (s5a = {
      id: "kotlin-ls",
      extensions: [".kt", ".kts"],
      root: async (e, t) => {
        let r = await em(["settings.gradle.kts", "settings.gradle"])(e, t);
        if (r) return r;
        let s = await em(["gradlew", "gradlew.bat"])(e, t);
        if (s) return s;
        let a = await em(["build.gradle.kts", "build.gradle"])(e, t);
        if (a) return a;
        return em(["pom.xml"])(e, t);
      },
      async spawn(e, t, r) {
        let s = hc.join(uH.bin, "kotlin-ls"),
          a = hc.join(s, "kotlin-lsp.cmd");
        if (!(await Ax(a))) {
          if (r.disableLspDownload) return;
          let u = await fetch("https://api.github.com/repos/Kotlin/kotlin-lsp/releases/latest");
          if (!u.ok) return;
          let d = (await u.json()).name?.replace(/^v/, "");
          if (!d) return;
          let _ = "win32",
            L = "x64",
            I = L;
          if (L === "arm64") I = "aarch64";
          else if (L === "x64") I = "x64";
          let D = _;
          if (_ === "darwin") D = "mac";
          else if (_ === "linux") D = "linux";
          else if (_ === "win32") D = "win";
          let S = ["mac-x64", "mac-aarch64", "linux-x64", "linux-aarch64", "win-x64", "win-aarch64"],
            T = `${D}-${I}`;
          if (!S.includes(T)) return;
          let C = `kotlin-lsp-${d}-${D}-${I}.zip`,
            O = `https://download-cdn.jetbrains.com/kotlin-lsp/${d}/${C}`;
          await Y_.mkdir(s, { recursive: !0 });
          let B = hc.join(s, "kotlin-ls.zip"),
            V = await fetch(O);
          if (!V.ok || !V.body) return;
          if (
            (await iee(B, V.body),
            !(await Wee(B, s)
              .then(() => !0)
              .catch((Z) => !1)))
          )
            return;
          await Y_.rm(B, { force: !0 });
        }
        if (!(await Ax(a))) return;
        return { process: Df(a, ["--stdio"], { cwd: e }) };
      },
    }),
    (o5a = {
      id: "yaml-ls",
      extensions: [".yaml", ".yml"],
      root: em(["package-lock.json", "bun.lockb", "bun.lock", "pnpm-lock.yaml", "yarn.lock"]),
      async spawn(e, t, r) {
        let s = UH("yaml-language-server"),
          a = [];
        if (!s) {
          if (r.disableLspDownload) return;
          let u = await MN("yaml-language-server");
          if (!u) return;
          s = u;
        }
        return (a.push("--stdio"), { process: Df(s, a, { cwd: e, env: { ...process.env } }) });
      },
    }),
    (a5a = {
      id: "lua-ls",
      root: em([
        ".luarc.json",
        ".luarc.jsonc",
        ".luacheckrc",
        ".stylua.toml",
        "stylua.toml",
        "selene.toml",
        "selene.yml",
      ]),
      extensions: [".lua"],
      async spawn(e, t, r) {
        let s = UH("lua-language-server");
        if (!s) {
          if (r.disableLspDownload) return;
          let a = await fetch("https://api.github.com/repos/LuaLS/lua-language-server/releases/latest");
          if (!a.ok) return;
          let H = await a.json(),
            u = "win32",
            f = "x64",
            d = "",
            _ = f;
          if (f === "arm64") _ = "arm64";
          else if (f === "x64") _ = "x64";
          else if (f === "ia32") _ = "ia32";
          let L = u;
          if (u === "darwin") L = "darwin";
          else if (u === "linux") L = "linux";
          else if (u === "win32") L = "win32";
          let I = u === "win32" ? "zip" : "tar.gz";
          d = `lua-language-server-${H.tag_name}-${L}-${_}.${I}`;
          let D = [
              "darwin-arm64.tar.gz",
              "darwin-x64.tar.gz",
              "linux-x64.tar.gz",
              "linux-arm64.tar.gz",
              "win32-x64.zip",
              "win32-ia32.zip",
            ],
            S = `${L}-${_}.${I}`;
          if (!D.includes(S)) return;
          let T = H.assets.find((Z) => Z.name === d);
          if (!T) return;
          let C = T.browser_download_url,
            O = await fetch(C);
          if (!O.ok) return;
          let B = hc.join(uH.bin, d);
          if (O.body) await iee(B, O.body);
          let V = hc.join(uH.bin, `lua-language-server-${_}-${L}`);
          if (
            await Y_.stat(V).catch(() => {
              return;
            })
          )
            await Y_.rm(V, { force: !0, recursive: !0 });
          if ((await Y_.mkdir(V, { recursive: !0 }), I === "zip")) {
            if (
              !(await Wee(B, V)
                .then(() => !0)
                .catch((se) => !1))
            )
              return;
          } else if (
            !(await QLe(["tar", "-xzf", B, "-C", V])
              .then((se) => se.code === 0)
              .catch((se) => !1))
          )
            return;
          if (
            (await Y_.rm(B, { force: !0 }),
            (s = hc.join(V, "bin", "lua-language-server" + (u === "win32" ? ".exe" : ""))),
            !(await Ax(s)))
          )
            return;
          if (u !== "win32") {
            if (
              !(await Y_.chmod(s, 493)
                .then(() => !0)
                .catch((se) => !1))
            )
              return;
          }
        }
        return { process: Df(s, { cwd: e }) };
      },
    }),
    (H5a = {
      id: "php intelephense",
      extensions: [".php"],
      root: em(["composer.json", "composer.lock", ".php-version"]),
      async spawn(e, t, r) {
        let s = UH("intelephense"),
          a = [];
        if (!s) {
          if (r.disableLspDownload) return;
          let u = await MN("intelephense");
          if (!u) return;
          s = u;
        }
        return (
          a.push("--stdio"),
          {
            process: Df(s, a, { cwd: e, env: { ...process.env } }),
            initialization: { telemetry: { enabled: !1 } },
          }
        );
      },
    }),
    (c5a = {
      id: "prisma",
      extensions: [".prisma"],
      root: em(["schema.prisma", "prisma/schema.prisma", "prisma"], ["package.json"]),
      async spawn(e) {
        let t = UH("prisma");
        if (!t) return;
        return { process: Df(t, ["language-server"], { cwd: e }) };
      },
    }),
    (A5a = {
      id: "dart",
      extensions: [".dart"],
      root: em(["pubspec.yaml", "analysis_options.yaml"]),
      async spawn(e) {
        let t = UH("dart");
        if (!t) return;
        return { process: Df(t, ["language-server", "--lsp"], { cwd: e }) };
      },
    }),
    (u5a = {
      id: "ocaml-lsp",
      extensions: [".ml", ".mli"],
      root: em(["dune-project", "dune-workspace", ".merlin", "opam"]),
      async spawn(e) {
        let t = UH("ocamllsp");
        if (!t) return;
        return { process: Df(t, { cwd: e }) };
      },
    }),
    (l5a = {
      id: "bash",
      extensions: [".sh", ".bash", ".zsh", ".ksh"],
      root: async (e, t) => t.directory,
      async spawn(e, t, r) {
        let s = UH("bash-language-server"),
          a = [];
        if (!s) {
          if (r.disableLspDownload) return;
          let u = await MN("bash-language-server");
          if (!u) return;
          s = u;
        }
        return (a.push("start"), { process: Df(s, a, { cwd: e, env: { ...process.env } }) });
      },
    }),
    (f5a = {
      id: "terraform",
      extensions: [".tf", ".tfvars"],
      root: em([".terraform.lock.hcl", "terraform.tfstate", "*.tf"]),
      async spawn(e, t, r) {
        let s = UH("terraform-ls");
        if (!s) {
          if (r.disableLspDownload) return;
          let a = await fetch("https://api.releases.hashicorp.com/v1/releases/terraform-ls/latest");
          if (!a.ok) return;
          let H = await a.json(),
            u = "win32",
            d = "amd64",
            _ = u === "win32" ? "windows" : u,
            I = (H.builds ?? []).find((C) => C.arch === d && C.os === _);
          if (!I?.url) return;
          let D = await fetch(I.url);
          if (!D.ok) return;
          let S = hc.join(uH.bin, "terraform-ls.zip");
          if (D.body) await iee(S, D.body);
          if (
            !(await Wee(S, uH.bin)
              .then(() => !0)
              .catch((C) => !1))
          )
            return;
          if (
            (await Y_.rm(S, { force: !0 }),
            (s = hc.join(uH.bin, "terraform-ls" + (u === "win32" ? ".exe" : ""))),
            !(await Ax(s)))
          )
            return;
          if (u !== "win32") await Y_.chmod(s, 493).catch(() => {});
        }
        return {
          process: Df(s, ["serve"], { cwd: e }),
          initialization: { experimentalFeatures: { prefillRequiredFields: !0, validateOnSave: !0 } },
        };
      },
    }),
    (p5a = {
      id: "texlab",
      extensions: [".tex", ".bib"],
      root: em([".latexmkrc", "latexmkrc", ".texlabroot", "texlabroot"]),
      async spawn(e, t, r) {
        let s = UH("texlab");
        if (!s) {
          if (r.disableLspDownload) return;
          let a = await fetch("https://api.github.com/repos/latex-lsp/texlab/releases/latest");
          if (!a.ok) return;
          let H = await a.json();
          if (!H.tag_name?.replace("v", "")) return;
          let f = "win32",
            _ = "x86_64",
            L = f === "darwin" ? "macos" : f === "win32" ? "windows" : "linux",
            I = f === "win32" ? "zip" : "tar.gz",
            D = `texlab-${_}-${L}.${I}`,
            T = (H.assets ?? []).find((B) => B.name === D);
          if (!T?.browser_download_url) return;
          let C = await fetch(T.browser_download_url);
          if (!C.ok) return;
          let O = hc.join(uH.bin, D);
          if (C.body) await iee(O, C.body);
          if (I === "zip") {
            if (
              !(await Wee(O, uH.bin)
                .then(() => !0)
                .catch((V) => !1))
            )
              return;
          }
          if (I === "tar.gz") await QLe(["tar", "-xzf", O], { cwd: uH.bin });
          if (
            (await Y_.rm(O, { force: !0 }),
            (s = hc.join(uH.bin, "texlab" + (f === "win32" ? ".exe" : ""))),
            !(await Ax(s)))
          )
            return;
          if (f !== "win32") await Y_.chmod(s, 493).catch(() => {});
        }
        return { process: Df(s, { cwd: e }) };
      },
    }),
    (d5a = {
      id: "dockerfile",
      extensions: [".dockerfile", "Dockerfile"],
      root: async (e, t) => t.directory,
      async spawn(e, t, r) {
        let s = UH("docker-langserver"),
          a = [];
        if (!s) {
          if (r.disableLspDownload) return;
          let u = await MN("dockerfile-language-server-nodejs");
          if (!u) return;
          s = u;
        }
        return (a.push("--stdio"), { process: Df(s, a, { cwd: e, env: { ...process.env } }) });
      },
    }),
    (m5a = {
      id: "gleam",
      extensions: [".gleam"],
      root: em(["gleam.toml"]),
      async spawn(e) {
        let t = UH("gleam");
        if (!t) return;
        return { process: Df(t, ["lsp"], { cwd: e }) };
      },
    }),
    (_5a = {
      id: "clojure-lsp",
      extensions: [".clj", ".cljs", ".cljc", ".edn"],
      root: em(["deps.edn", "project.clj", "shadow-cljs.edn", "bb.edn", "build.boot"]),
      async spawn(e) {
        let t = UH("clojure-lsp");
        if (!t) t = UH("clojure-lsp.exe");
        if (!t) return;
        return { process: Df(t, ["listen"], { cwd: e }) };
      },
    }),
    (h5a = {
      id: "nixd",
      extensions: [".nix"],
      root: async (e, t) => {
        let r = await em(["flake.nix"])(e, t);
        if (r && r !== t.directory) return r;
        if (t.worktree && t.worktree !== t.directory) return t.worktree;
        return t.directory;
      },
      async spawn(e) {
        let t = UH("nixd");
        if (!t) return;
        return { process: Df(t, [], { cwd: e, env: { ...process.env } }) };
      },
    }),
    (L5a = {
      id: "tinymist",
      extensions: [".typ", ".typc"],
      root: em(["typst.toml"]),
      async spawn(e, t, r) {
        let s = UH("tinymist");
        if (!s) {
          if (r.disableLspDownload) return;
          let a = await fetch("https://api.github.com/repos/Myriad-Dreamin/tinymist/releases/latest");
          if (!a.ok) return;
          let H = await a.json(),
            u = "win32",
            d = "x86_64",
            _,
            L;
          if (u === "darwin") ((_ = "apple-darwin"), (L = "tar.gz"));
          else if (u === "win32") ((_ = "pc-windows-msvc"), (L = "zip"));
          else ((_ = "unknown-linux-gnu"), (L = "tar.gz"));
          let I = `tinymist-${d}-${_}.${L}`,
            S = (H.assets ?? []).find((O) => O.name === I);
          if (!S?.browser_download_url) return;
          let T = await fetch(S.browser_download_url);
          if (!T.ok) return;
          let C = hc.join(uH.bin, I);
          if (T.body) await iee(C, T.body);
          if (L === "zip") {
            if (
              !(await Wee(C, uH.bin)
                .then(() => !0)
                .catch((B) => !1))
            )
              return;
          } else await QLe(["tar", "-xzf", C, "--strip-components=1"], { cwd: uH.bin });
          if (
            (await Y_.rm(C, { force: !0 }),
            (s = hc.join(uH.bin, "tinymist" + (u === "win32" ? ".exe" : ""))),
            !(await Ax(s)))
          )
            return;
          if (u !== "win32") await Y_.chmod(s, 493).catch(() => {});
        }
        return { process: Df(s, { cwd: e }) };
      },
    }),
    ($5a = {
      id: "haskell-language-server",
      extensions: [".hs", ".lhs"],
      root: em(["stack.yaml", "cabal.project", "hie.yaml", "*.cabal"]),
      async spawn(e) {
        let t = UH("haskell-language-server-wrapper");
        if (!t) return;
        return { process: Df(t, ["--lsp"], { cwd: e }) };
      },
    }),
    (g5a = {
      id: "julials",
      extensions: [".jl"],
      root: em(["Project.toml", "Manifest.toml", "*.jl"]),
      async spawn(e) {
        let t = UH("julia");
        if (!t) return;
        return {
          process: Df(
            t,
            ["--startup-file=no", "--history-file=no", "-e", "using LanguageServer; runserver()"],
            { cwd: e },
          ),
        };
      },
    }));
});