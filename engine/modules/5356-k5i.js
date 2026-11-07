
var k5i = ne(async () => {
  hje();
  Ree();
  await Jn([Rae(), fxe()]);
  ((b5a = {
    name: "gofmt",
    extensions: [".go"],
    async enabled() {
      let e = UH("gofmt");
      if (!e) return !1;
      return [e, "-w", "$FILE"];
    },
  }),
    (j5a = {
      name: "mix",
      extensions: [".ex", ".exs", ".eex", ".heex", ".leex", ".neex", ".sface"],
      async enabled() {
        let e = UH("mix");
        if (!e) return !1;
        return [e, "format", "$FILE"];
      },
    }),
    (P5a = {
      name: "prettier",
      environment: { BUN_BE_BUN: "1" },
      extensions: [
        ".js",
        ".jsx",
        ".mjs",
        ".cjs",
        ".ts",
        ".tsx",
        ".mts",
        ".cts",
        ".html",
        ".htm",
        ".css",
        ".scss",
        ".sass",
        ".less",
        ".vue",
        ".svelte",
        ".json",
        ".jsonc",
        ".yaml",
        ".yml",
        ".toml",
        ".xml",
        ".md",
        ".mdx",
        ".graphql",
        ".gql",
      ],
      async enabled(e) {
        let t = await see("package.json", e.directory, e.worktree);
        for (let r of t) {
          let s = await qDr(r);
          if (s.dependencies?.prettier || s.devDependencies?.prettier) {
            let a = await MN("prettier");
            if (a) return [a, "--write", "$FILE"];
          }
        }
        return !1;
      },
    }),
    (C5a = {
      name: "oxfmt",
      environment: { BUN_BE_BUN: "1" },
      extensions: [".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts"],
      async enabled(e) {
        if (!e.experimentalOxfmt) return !1;
        let t = await see("package.json", e.directory, e.worktree);
        for (let r of t) {
          let s = await qDr(r);
          if (s.dependencies?.oxfmt || s.devDependencies?.oxfmt) {
            let a = await MN("oxfmt");
            if (a) return [a, "$FILE"];
          }
        }
        return !1;
      },
    }),
    (w5a = {
      name: "biome",
      environment: { BUN_BE_BUN: "1" },
      extensions: [
        ".js",
        ".jsx",
        ".mjs",
        ".cjs",
        ".ts",
        ".tsx",
        ".mts",
        ".cts",
        ".html",
        ".htm",
        ".css",
        ".scss",
        ".sass",
        ".less",
        ".vue",
        ".svelte",
        ".json",
        ".jsonc",
        ".yaml",
        ".yml",
        ".toml",
        ".xml",
        ".md",
        ".mdx",
        ".graphql",
        ".gql",
      ],
      async enabled(e) {
        let t = ["biome.json", "biome.jsonc"];
        for (let r of t)
          if ((await see(r, e.directory, e.worktree)).length > 0) {
            let a = await MN("@biomejs/biome");
            if (a) return [a, "format", "--write", "$FILE"];
          }
        return !1;
      },
    }),
    (k5a = {
      name: "zig",
      extensions: [".zig", ".zon"],
      async enabled() {
        let e = UH("zig");
        if (!e) return !1;
        return [e, "fmt", "$FILE"];
      },
    }),
    (O5a = {
      name: "clang-format",
      extensions: [
        ".c",
        ".cc",
        ".cpp",
        ".cxx",
        ".c++",
        ".h",
        ".hh",
        ".hpp",
        ".hxx",
        ".h++",
        ".ino",
        ".C",
        ".H",
      ],
      async enabled(e) {
        if ((await see(".clang-format", e.directory, e.worktree)).length > 0) {
          let r = UH("clang-format");
          if (r) return [r, "-i", "$FILE"];
        }
        return !1;
      },
    }),
    (U5a = {
      name: "ktlint",
      extensions: [".kt", ".kts"],
      async enabled() {
        let e = UH("ktlint");
        if (!e) return !1;
        return [e, "-F", "$FILE"];
      },
    }),
    (w5i = {
      name: "ruff",
      extensions: [".py", ".pyi"],
      async enabled(e) {
        if (!UH("ruff")) return !1;
        let t = ["pyproject.toml", "ruff.toml", ".ruff.toml"];
        for (let s of t) {
          let a = await see(s, e.directory, e.worktree);
          if (a.length > 0)
            if (s === "pyproject.toml") {
              if ((await eXe(a[0])).includes("[tool.ruff]")) return ["ruff", "format", "$FILE"];
            } else return ["ruff", "format", "$FILE"];
        }
        let r = ["requirements.txt", "pyproject.toml", "Pipfile"];
        for (let s of r) {
          let a = await see(s, e.directory, e.worktree);
          if (a.length > 0) {
            if ((await eXe(a[0])).includes("ruff")) return ["ruff", "format", "$FILE"];
          }
        }
        return !1;
      },
    }),
    (N5a = {
      name: "air",
      extensions: [".R"],
      async enabled() {
        let e = UH("air");
        if (e == null) return !1;
        let t = await gjr([e, "--help"], { nothrow: !0 }),
          r = t.text.split(`
`)[0],
          s = r.includes("R language"),
          a = r.includes("formatter");
        if (t.code === 0 && s && a) return [e, "format", "$FILE"];
        return !1;
      },
    }),
    (F5a = {
      name: "uv",
      extensions: [".py", ".pyi"],
      async enabled(e) {
        if (await w5i.enabled(e)) return !1;
        let t = UH("uv");
        if (t == null) return !1;
        if ((await lR([t, "format", "--help"], { nothrow: !0 })).code === 0)
          return [t, "format", "--", "$FILE"];
        return !1;
      },
    }),
    (B5a = {
      name: "rubocop",
      extensions: [".rb", ".rake", ".gemspec", ".ru"],
      async enabled() {
        let e = UH("rubocop");
        if (!e) return !1;
        return [e, "--autocorrect", "$FILE"];
      },
    }),
    (R5a = {
      name: "standardrb",
      extensions: [".rb", ".rake", ".gemspec", ".ru"],
      async enabled() {
        let e = UH("standardrb");
        if (!e) return !1;
        return [e, "--fix", "$FILE"];
      },
    }),
    (W5a = {
      name: "htmlbeautifier",
      extensions: [".erb", ".html.erb"],
      async enabled() {
        let e = UH("htmlbeautifier");
        if (!e) return !1;
        return [e, "$FILE"];
      },
    }),
    (V5a = {
      name: "dart",
      extensions: [".dart"],
      async enabled() {
        let e = UH("dart");
        if (!e) return !1;
        return [e, "format", "$FILE"];
      },
    }),
    (q5a = {
      name: "ocamlformat",
      extensions: [".ml", ".mli"],
      async enabled(e) {
        if (!UH("ocamlformat")) return !1;
        if ((await see(".ocamlformat", e.directory, e.worktree)).length > 0)
          return ["ocamlformat", "-i", "$FILE"];
        return !1;
      },
    }),
    (G5a = {
      name: "terraform",
      extensions: [".tf", ".tfvars"],
      async enabled() {
        let e = UH("terraform");
        if (!e) return !1;
        return [e, "fmt", "$FILE"];
      },
    }),
    (X5a = {
      name: "latexindent",
      extensions: [".tex"],
      async enabled() {
        let e = UH("latexindent");
        if (!e) return !1;
        return [e, "-w", "-s", "$FILE"];
      },
    }),
    (J5a = {
      name: "gleam",
      extensions: [".gleam"],
      async enabled() {
        let e = UH("gleam");
        if (!e) return !1;
        return [e, "format", "$FILE"];
      },
    }),
    (K5a = {
      name: "shfmt",
      extensions: [".sh", ".bash"],
      async enabled() {
        let e = UH("shfmt");
        if (!e) return !1;
        return [e, "-w", "$FILE"];
      },
    }),
    (z5a = {
      name: "nixfmt",
      extensions: [".nix"],
      async enabled() {
        let e = UH("nixfmt");
        if (!e) return !1;
        return [e, "$FILE"];
      },
    }),
    (Q5a = {
      name: "rustfmt",
      extensions: [".rs"],
      async enabled() {
        let e = UH("rustfmt");
        if (!e) return !1;
        return [e, "$FILE"];
      },
    }),
    (Y5a = {
      name: "pint",
      extensions: [".php"],
      async enabled(e) {
        let t = await see("composer.json", e.directory, e.worktree);
        for (let r of t) {
          let s = await qDr(r);
          if (s.require?.["laravel/pint"] || s["require-dev"]?.["laravel/pint"])
            return ["./vendor/bin/pint", "$FILE"];
        }
        return !1;
      },
    }),
    (Z5a = {
      name: "ormolu",
      extensions: [".hs"],
      async enabled() {
        let e = UH("ormolu");
        if (!e) return !1;
        return [e, "-i", "$FILE"];
      },
    }),
    (eXa = {
      name: "cljfmt",
      extensions: [".clj", ".cljs", ".cljc", ".edn"],
      async enabled() {
        let e = UH("cljfmt");
        if (!e) return !1;
        return [e, "fix", "--quiet", "$FILE"];
      },
    }),
    (tXa = {
      name: "dfmt",
      extensions: [".d"],
      async enabled() {
        let e = UH("dfmt");
        if (!e) return !1;
        return [e, "-i", "$FILE"];
      },
    }));
});
import rXa from "path";