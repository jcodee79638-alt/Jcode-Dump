# JCODE / Jac Code 6.3.15 — recovered source dump

Static, offline recovery of the complete shipped JavaScript/TypeScript application,
the Bun-compiled engine, and every managed (.NET) binary in the package.
Nothing here was taken from a public repository: everything was reconstructed from
the artifacts on disk using `asar` extraction, Bun trailer parsing, Prettier,
a Babel-based module splitter, and ILSpy.

- Target version: **6.3.15** (`jac-code-desktop`)
- Installer: `C:\Users\vboxuser\Desktop\JCODE\Jac-Code-Setup-6.3.15.exe`
- Installed tree: `C:\Users\vboxuser\Desktop\JCODE\install location`
- Output root: `C:\Users\vboxuser\Desktop\JCODE\SRC`
- Reference date: 2026-11-07

## What JCODE is

A Windows Electron desktop client for a hosted "Jac Code" coding agent.

| Layer | Artifact | Role |
|---|---|---|
| Shell | `versions/6.3.15/Jac Code.exe` (Electron 249 MB) | Chromium host |
| Desktop app | `resources/app.asar` → `out/main.cjs`, `out/preload.cjs`, `out/renderer/*` | window, IPC, project/task/attachment/update management, React UI |
| Engine | `resources/jac-engine.exe` (137 MB, Bun-compiled) | local agent server: sessions, tools, permissions, LSP, MCP, model gateway client |
| Auth/update helpers | `JacAuth.exe`, `JacDesktopUpdate.exe`, `JacDesktopLock.exe`, `JacProjectRun.exe`, `JacAttachmentGuard.exe`, `Uninstall.exe`, `jac.exe` | device auth, self-update, single-desktop lock, run profiles, attachment sandbox, uninstall, launcher |

The engine is an **opencode fork**: it keeps opencode's session/tool/server model and
adds the `jaccoder` provider, Jac-specific headers (`X-Jac-*`), plan modes, and
device/account gating.

Observed backend: `https://jaccoder-private-gateway.jaccoder-private-gateway.workers.dev`
(OpenAI-compatible `/v1`; models `jaccoder-5.5` = "JacCoder 5.5", `jcoder-5.6` = "Jcoder 5.6",
context 131072). Main→engine transport is line-delimited JSON-RPC over stdio plus a
loopback HTTP/SSE server (`127.0.0.1`, random port, random Basic password).

Access modes: `read` / `ask` / `full`. Tool prompts recovered: `read, glob, grep, edit,
write, apply_patch, shell, task, todowrite, webfetch, websearch, lsp, skill, question, plan`.

## Layout

```
SRC/
  app/                     byte-faithful app.asar extraction (package.json, out/**)
  raw/                     unmodified bundles used as formatter input
    main.cjs preload.cjs attachment-preload.cjs jac-engine.bundle.js
  src/                     Prettier-formatted full sources (2-space, width 110)
    main.pretty.js  preload.pretty.js  renderer.pretty.js  attachment.pretty.js  engine.pretty.js
  engine/
    modules/               6174 ordered navigable modules + INDEX.md + _index.json
    symbols.json           top-level symbol/line index
  app-main/modules/        234 modules for the Electron main process (+ index, symbols)
  renderer/modules/        170 modules for the React UI (+ index, symbols)
  attachment/modules/      317 modules for the attachment viewer (+ index)
  preload/modules/         4 modules for the preload bridge
  engine-files/            files embedded in jac-engine.exe: 25 agent prompts (.txt/.md),
                           tree-sitter + photon wasm, fff_c.dll, rust_pty.dll, watcher.node,
                           and the extracted "jac-engine" entry bundle
  dotnet-src/              ILSpy C# for Installer, jac (launcher), JacAuth, JacDesktopUpdate,
                           JacDesktopLock, JacProjectRun, JacAttachmentGuard, Uninstall
  web/                     renderer index.html + full 148 KB CSS, attachment page
  docs/                    GETTING-STARTED, NOTICE, OpenCode license, DEPENDENCIES.json, package.json
  evidence/                hashes, Evidence IDs, extraction notes
  tools/                   reproducible extraction/split/index scripts
  MANIFEST.sha256          SHA-256 of every recovered file
```

`modules/` is a navigation aid: concatenating `0001…NNNN` reproduces the corresponding
`src/*.pretty.js` byte-for-byte (verified). Identifiers stay minified; ordering and
global scope are preserved.

## How it was recovered

1. `@electron/asar extract` on `resources/app.asar`.
2. Parsed the PE sections of `jac-engine.exe`; located the `.bun` section and the
   `\n---- Bun! ----\n` trailer, decoded the `OffsetsData` struct, then walked the
   52-byte file records and their base-relative name/content offsets. Script:
   `tools/extract-bun-payload.cjs`.
3. Prettier (`--parser babel --print-width 110`) for readable indentation.
4. Babel AST splitter (`tools/split-modules.cjs`) with byte-identical reassembly check.
5. ILSpy 9.1 (`ilspycmd -p`) over the .NET assemblies; portable .NET 8 runtime kept in `.tools/`.

## Integrity / evidence

The app verifies itself with an Ed25519-signed manifest
`resources/client-integrity.json` (public key embedded in `main.cjs`). Hashes of the key
artifacts and REA/REA+ Evidence IDs are in `evidence/notes.md` and bind this dump to the
exact shipped bytes; `MANIFEST.sha256` covers the recovered output.

## Limitations

- No source maps ship with `main.cjs`, `renderer`, `attachment`; the engine bundle has none
  either. Function/variable names are the bundler's minified names.
- `login.txt` referenced in the task does not exist on disk, so no authenticated runtime
  capture was made; behavior notes above are static.
- TypeScript annotations are erased. JSX compiles to React calls; component identity is
  reconstructed only from strings and structure.
- `.tools/` (dotnet runtime, ilspycmd, node_modules) is tooling, not app code.
- Native Electron/Chromium and Bun runtimes are not source; only their packaged JS is.
