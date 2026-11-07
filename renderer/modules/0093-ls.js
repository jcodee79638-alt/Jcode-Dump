
function ls(e) {
  const n = e.flatMap((f) => f.parts).reverse(),
    i =
      n.find((f) => f.type === "tool" && (f.status === "running" || f.status === "pending")) ??
      n.find((f) => f.type === "tool"),
    s = i?.tool ?? "",
    l = /^(read|read_file|list|ls)$/.test(s)
      ? ["Reading project files", "Read project files"]
      : /^(glob|grep|search|file_search)$/.test(s)
        ? ["Searching the workspace", "Searched the workspace"]
        : /^(edit|write|write_file|apply_patch|patch|multiedit)$/.test(s)
          ? ["Editing project files", "Edited project files"]
          : /^(bash|shell|terminal|exec_command)$/.test(s)
            ? ["Running a command", "Finished a command"]
            : ["Using a tool", "Finished a tool"],
    a = n.find((f) => f.type === "text" && f.text?.trim() && !f.text.includes("```"))?.text,
    c = a ? Ke(a).replace(/\s+/g, " ").trim() : "",
    d = i?.status === "error" || (i?.exitCode !== void 0 && i.exitCode !== 0);
  return {
    tool: i
      ? {
          label:
            i.status === "pending"
              ? "Preparing a tool"
              : d
                ? "A tool returned an error"
                : i.status === "completed"
                  ? l[1]
                  : l[0],
          icon: d ? "info" : i.status === "completed" ? "check" : "history",
        }
      : void 0,
    note: c.length > 180 ? c.slice(0, 179).trimEnd() + "…" : c,
  };
}