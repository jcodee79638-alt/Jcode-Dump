
function vs(e, t) {
  if (e.length === 0) return {};
  let n = e.filter((p) => !p.startsWith("--inspect") && p !== "--startup");
  if (e.includes("--startup") || e.includes("--home")) return {};
  let i = (p) => {
      let w = n.findIndex((f) => p.includes(f) || p.some((h) => f.startsWith(h + "=")));
      if (w < 0) return;
      return n[w].includes("=")
        ? n[w].slice(n[w].indexOf("=") + 1)
        : n[w + 1]?.startsWith("-")
          ? void 0
          : n[w + 1];
    },
    r = i(["-s", "--session"]),
    s = i(["--prompt"]),
    o = i(["--dir"]),
    l =
      n[0] &&
      !n[0].startsWith("-") &&
      !["login", "logout", "account", "reset", "status", "models", "run"].includes(n[0])
        ? n[0]
        : void 0,
    u =
      n[0] === "run"
        ? n
            .slice(1, n.findIndex((p) => p === "--dir") < 0 ? n.length : n.findIndex((p) => p === "--dir"))
            .join(" ")
        : s;
  return {
    directory: gs.default.resolve(t, o ?? l ?? "."),
    sessionId: r && /^[A-Za-z0-9_.-]{1,200}$/.test(r) ? r : void 0,
    prompt: u?.slice(0, 200000),
  };
}