
async function ni() {
  let e = await A.request("GET", "/project"),
    t = [];
  for (let n of vt(e.value)) {
    let i = j(n);
    if (i.id === "global" || typeof i.worktree !== "string" || i.worktree === "/") continue;
    let r = await bt(i.worktree).catch(() => {
      return;
    });
    if (r)
      t.push({
        id: String(i.id),
        name: typeof i.name === "string" ? i.name : re.default.basename(r),
        directory: r,
      });
  }
  for (let n of await ri.read()) {
    let i = await bt(n.directory).catch(() => {
      return;
    });
    if (i && !t.some((r) => r.directory.toLowerCase() === i.toLowerCase())) t.push({ ...n, directory: i });
  }
  return t;
}