
function Xr(e) {
  const n = e.flatMap((i) => i.parts.filter((s) => s.type === "tool"));
  return [
    {
      label: "File inspection",
      matches: n.filter((i) => /^(read|glob|grep|list|search|ls|file_search)$/.test(i.tool ?? "")),
    },
    {
      label: "Changes attempted",
      matches: n.filter((i) => /^(edit|write|apply_patch|patch|multiedit)$/.test(i.tool ?? "")),
    },
    {
      label: "Checks invoked",
      matches: n.filter(
        (i) =>
          /^(bash|shell|terminal|exec_command)$/.test(i.tool ?? "") &&
          /\b(test|typecheck|lint|check|build)\b/.test(i.command ?? ""),
      ),
    },
  ]
    .filter((i) => i.matches.length)
    .map((i) => ({
      label: i.label,
      status: i.matches.some((s) => s.status === "error" || (s.exitCode !== void 0 && s.exitCode !== 0))
        ? "error"
        : i.matches.some((s) => s.status === "running" || s.status === "pending")
          ? "running"
          : "observed",
    }));
}