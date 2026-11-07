
var gsr = ne(() => {
  gsr();
  Gt();
  ((dZs = nt({ disabled: ri(!0) }).pipe((e) => e)),
    (mZs = Io([
      dZs,
      nt({
        command: J0(On(re)),
        extensions: be(J0(On(re))),
        disabled: be(Vi),
        env: be(ks(re, re)),
        initialization: be(ks(re, PH)),
      }),
    ]).pipe((e) => e)),
    (_Zs = [
      "deno",
      "typescript",
      "vue",
      "eslint",
      "oxlint",
      "biome",
      "gopls",
      "ruby-lsp",
      "ty",
      "pyright",
      "elixir-ls",
      "zls",
      "csharp",
      "razor",
      "fsharp",
      "sourcekit-lsp",
      "rust",
      "clangd",
      "svelte",
      "astro",
      "jdtls",
      "kotlin-ls",
      "yaml-ls",
      "lua-ls",
      "php intelephense",
      "prisma",
      "dart",
      "ocaml-lsp",
      "bash",
      "terraform",
      "texlab",
      "dockerfile",
      "gleam",
      "clojure-lsp",
      "nixd",
      "tinymist",
      "haskell-language-server",
      "julials",
    ]),
    (hZs = KW((e) => {
      if (typeof e === "boolean") return;
      let t = new Set(_Zs);
      return Object.entries(e).every(([s, a]) => {
        if ("disabled" in a && a.disabled) return !0;
        if (t.has(s)) return !0;
        return "extensions" in a && Boolean(a.extensions);
      })
        ? void 0
        : "For custom LSP servers, 'extensions' array is required.";
    })),
    (LZs = Io([Vi, ks(re, mZs)])
      .check(hZs)
      .pipe((e) => e)));
});