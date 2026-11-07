# Module map (navigation starts)

Line numbers refer to the formatted files. `engine/modules/NNNN-*.js` and the
`symbols.json` indexes give the matching split unit.

## `src/main.pretty.js` (Electron main, 234 units)

| Line | Anchor |
|---|---|
| 684 | integrity manifest validation (`jaccode-client-integrity`, file scope, Ed25519 verify) |
| 855 | `Gi` = bundled fflate (zip) used by backups/support bundles |
| 1272 | `Cr` class = engine supervisor: spawn, JSON-RPC over stdio, loopback HTTP, SSE subscribe, reconnect |
| 1710 | `go` = integrity check module (hash/version/scope) |
| 3515 | `xs()` window options (preload, sandbox, `jac-preview` scheme) |
| 3787 | window open policy (`deny`), navigation lock |
| 6591 | privileged scheme registration (`jac-preview`) |
| 6599 | renderer entry URL (`renderer/index.html`) |
| 7045 | `Oa` IPC dispatcher: `tasks`, `attachments`, `queue`, `projects`, `confirm`, `saveSupport`, `account`, `engine`, … |
| 8048 | `ipcMain.handle("jac:invoke")` single IPC entry |
| 8206–8400 | app bootstrap: window creation, engine start, update check |

## `src/engine.pretty.js` (agent engine, 6174 units)

This is an opencode-derived server with Jac additions.

| Line | Anchor |
|---|---|
| 88 | default permission table (`read/ask/full`) with `plan_enter`/`plan_exit` deny |
| 221 | `O0` gateway base URL (`jaccoder-private-gateway…workers.dev`) |
| 180961 | provider definition: id, `@ai-sdk/openai-compatible`, url `O0 + "/v1"`, family `jaccoder`, 131072 context |
| 418683 | global-event SSE consumer/client stub |
| 420363 | route policy table (`local` vs `forward` per path) and workspace sync |
| 146704 | `apply_patch` tool name and prompt assets |
| 259852 | embedded library strings (drizzle/effect/debug adapters) |
| 48546 | `init` op of the desktop RPC (workspace create/init) |

Tool prompts are separate assets in `engine-files/*.txt`:
`read, glob, grep, edit, write, apply_patch, shell, task, todowrite, webfetch,
websearch, lsp, skill, question, plan, plan-mode, plan-exit, build-switch,
initialize, review, compaction, explore, summary, title, generate, customize-opencode`.

## `src/renderer.pretty.js` (React UI, 170 units)

Views and labels: Workspace, New chat, Search chats, Projects, Settings, Attachments,
Preview, Usage, Backups, Support report, Reconnect, Task report, Plan mode.
CSP in `web/renderer/index.html` allows only `self` plus `jac-preview` /
`127.0.0.1` frames.

## `src/attachment.pretty.js` (separate attachment viewer, 317 units)

PDF.js worker is `app/out/attachment/assets/pdf.worker-*.mjs`; the page is served under
the `jac-preview` scheme.

## `src/preload.pretty.js`

Thin `contextBridge`-style surface: every call funnels through `ipcRenderer.invoke("jac:invoke", …)`;
draft/settings writes are tracked and flushed on `jac:flush` before close.
