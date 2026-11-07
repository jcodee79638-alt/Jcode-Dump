
async function ps(e) {
  let t = (await De(e)).root,
    n = await Ge(t, ["status", "--porcelain=v1", "-z", "--untracked-files=all", "--", "."]).catch((p) => {
      if (p.code === 128 && /not a git repository/i.test(p.stderr ?? "")) return "";
      throw Error("Git review is unavailable in this folder. You can keep coding and viewing files.");
    });
  if (!n) return [];
  let i = (await Ge(t, ["rev-parse", "--show-toplevel"])).trim(),
    r = it.default.relative(i, t).replaceAll("\\", "/"),
    s = await Ge(t, [
      "diff",
      "--relative",
      "--numstat",
      "--no-renames",
      "--no-ext-diff",
      "--no-textconv",
      "HEAD",
      "--",
      ".",
    ]).catch(() => ""),
    o = new Map(
      s
        .trim()
        .split(
          `
`,
        )
        .filter(Boolean)
        .map((p) => {
          let [w, f, ...h] = p.split("\t");
          return [h.join("\t"), { additions: Number(w) || 0, deletions: Number(f) || 0 }];
        }),
    ),
    l = n.split("\x00"),
    u = [];
  for (let p = 0; p < l.length; p++) {
    let w = l[p];
    if (!w) continue;
    let f = w.slice(0, 2),
      h = w.slice(3),
      m = r ? (h.startsWith(r + "/") ? h.slice(r.length + 1) : void 0) : h;
    if (/[RC]/.test(f)) p++;
    if (!m) continue;
    u.push({
      path: m,
      status: f.includes("R")
        ? "renamed"
        : f.includes("C")
          ? "copied"
          : f === "??"
            ? "untracked"
            : f.includes("D")
              ? "deleted"
              : f.includes("A")
                ? "added"
                : "modified",
      staged: f[0] !== " " && f[0] !== "?",
      ...o.get(m),
      additions: o.get(m)?.additions ?? 0,
      deletions: o.get(m)?.deletions ?? 0,
    });
  }
  return u;
}