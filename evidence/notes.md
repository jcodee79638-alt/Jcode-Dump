# Evidence and extraction record

Date: 2026-11-07. All values below come from the shipped files on disk.

## Artifact identity (SHA-256)

| Artifact | Size | SHA-256 | Evidence |
|---|---|---|---|
| `Jac-Code-Setup-6.3.15.exe` | 208,811,520 | `a9795def24143068dc28467af69e6a75a6de9fa291cc8c7248f4e479c78a6352` | rea-plus `hashes-mw6thnni-007b9511` |
| `resources/app.asar` | 3,266,175 | `a41f40d27e5a6cccac655c5f169191865f7ea1f43f60b550903d024d90a01e5d` | rea-plus `hashes-mw6thns5-437eb2d3` |
| `resources/jac-engine.exe` | 137,017,344 | `eca2db01ea3a970828f0c5e6e12b61d6ab06462ce83b96128ed926d49744f537` | rea-plus `hashes-mw6thod2-c372f829` |
| `Jac Code.exe` | 249,756,160 | `90ac51ab9cc178b92908103ac3638d6d74b40c620c8260599e9aced4e41a8d21` | rea-plus `hashes-mw6thpbm-c84eb5b6` |
| `JacAuth.exe` | 19,968 | `f16c83f8211670543e93be5540f2a7805855f366cfa39c48dffaa5acb0bb4959` | REA `ev_766a5c7fd7a749c3fae409661757f4bedea536b6182ef8ca719aeb23f87505f7` |

These match the signed `resources/client-integrity.json` payload for the same paths.

Managed classification Evidence (all `.NET`, CLI header at file offset 512):

| File | Evidence |
|---|---|
| `jac.exe` | `ev_75fe3ebd1bc691ff82d44ad186b3d5ebe08cd0c519fc93f1cbaeb9ce9c3260f3` |
| `resources/JacDesktopLock.exe` | `ev_65a318f5f30a974fa38250c97be14c21530ff3331a9d42a62c68e177430198a7` |
| `resources/JacProjectRun.exe` | `ev_f6c17f50afa0224ffbd10af540d17cdd1e596e60c239aab2ef46f87af5437c5e` |
| `resources/JacAttachmentGuard.exe` | `ev_e33ca9167a242473215d1f7d17f07be1d8384262f86dbbf00267d9085fbe3c63` |
| `resources/JacDesktopUpdate.exe` | `ev_58190bb478357c8b6b29800302ad9fa1c1a82ad40f62499463dc5683677bbccc` |

## Bun payload (jac-engine.exe)

| Field | Value |
|---|---|
| PE sections | 13; payload in `.bun`, raw 0x6DEE600, raw size 21,746,176 |
| Trailer magic | `\n---- Bun! ----\n` at file offset 137,017,208 |
| OffsetsData | byte_count 21,753,167, encoded_byte_count 0 (uncompressed), graph offset 21,750,044, compile size 21,753,148 |
| Content base | 0x6DEE608 (115,269,128) |
| File records | 52-byte entries at 0x82AAF58: flags(4), name_off u32, name_len u32, contents_off u32, contents_len u32, 32 reserved |
| Files | 36 records, 21,742,654 content bytes |
| Entry | `jac-engine` 9,707,753 bytes, starts with `// @bun` |

Record table and all extracted bytes are reproducible with `tools/extract-bun-payload.cjs`.

## Decompilation

- `ilspycmd 9.1.0.7988` (ICSharpCode.Decompiler 9.1.0.7988), `-p` project mode per assembly.
- Portable runtime `Microsoft.NETCore.App 8.0.33` in `.tools/dotnet`.
- Decompiled C# is inference, not canonical bytes; ILSpy renders compiler-generated
  state machines and lambdas in expanded form.

## Formatting/transform settings

- Prettier 3.x, `--parser babel --print-width 110 --tab-width 2`.
- Splitter parses with `@babel/parser` (`sourceType: module|script`, error recovery).
- Reassembly checks: engine 14,588,533 / main 286,362 / renderer 514,835 /
  attachment 642,497 / preload 5,661 bytes — all identical to the formatter output.

## Runtime observation (not signed in)

Launched `Jac Code.exe` once for UI/process confirmation, then closed it.

- Electron main PID 5624 (`--home`), renderer PID 7224 loading
  `--app-path ...\resources\app.asar` with `--enable-sandbox`, network service with
  `--standard-schemes=jac-preview`.
- `jac-engine.exe` spawned by the main process (PID 7536).
- Engine bound `127.0.0.1:4096`; `GET /global/event` without credentials returns **401**,
  matching the Basic-auth gate in `main.cjs`.
- Window: left rail "Workspace / New chat / Search chats / Projects", composer
  "Describe a task…", model "5.6 Reasoning", access "Ask first", allowance meters
  "5-hour 100% / Weekly 100%", accounts row "Sign in to Jac Code".
- Screenshot: `evidence/runtime-window.png`.
- User data at `%APPDATA%\Jac Code` creates `backups-v6/`, `queue-v6/`, `tasks-v5/`,
  `Local Storage`, and `backups-v6/.integrity-v6.key`.

## Notes

- `C:\Users\vboxuser\Desktop\JCODE\login.txt` was absent, so no authenticated capture,
  saved conversation, or project workspace was available as runtime evidence.
- The gateway host and model ids are string constants in the engine bundle
  (`O0`, `TFe`), verified by direct search.
