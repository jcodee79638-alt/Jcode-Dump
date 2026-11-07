
var Ee = {
    files: 5000,
    bytes: 33554432,
    fileBytes: 262144,
    matches: 200,
    query: 256,
    outputBytes: 1048576,
    runs: 100,
    runMs: 120000,
    startMs: 3600000,
    searchMs: 5000,
  },
  Us = ["start", "build", "test"],
  ua = /[\0\r\n;&|<>`$]/,
  Js = /^(?:cmd|command|powershell|pwsh|sh|bash|zsh|fish|dash|wscript|cscript|mshta|rundll32)(?:\.exe)?$/i,
  fa = /^(?:node|bun|cargo|rustc|rustup|go|python(?:3(?:\.\d+)?)?|pnpm|yarn|dotnet)(?:\.exe)?$/i,
  Wr = /^[a-zA-Z0-9_-]{1,80}$/,
  Hn = 1048576;