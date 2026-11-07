
async function X(e, t, n = !1) {
  let i = wt(t),
    r = cn(typeof e === "string" ? e : e.directory),
    s = W.default.resolve(r, i);
  if (!St(r, s)) throw Error("Choose a file inside the project.");
  let o = await z.lstat(r);
  if (!o.isDirectory() || o.isSymbolicLink())
    throw Error("Local folders cannot contain links or redirected paths.");
  if (se((await z.realpath(r)).replace(/[\\/]$/, "")) !== se(r.replace(/[\\/]$/, ""))) {
    if (typeof e !== "string") return Ki(r, i, n);
    throw Error("Local folders cannot contain links or redirected paths.");
  }
  let l = i.split("/"),
    u = { parent: r, exists: !0 };
  for (let p of l) {
    if (((u.parent = W.default.join(u.parent, p)), !u.exists)) continue;
    let w = await z.lstat(u.parent).catch((f) => {
      if (n && f.code === "ENOENT") return;
      throw f;
    });
    if (!w) {
      u.exists = !1;
      continue;
    }
    if (w.isSymbolicLink()) throw Error("Local folders cannot contain links or redirected paths.");
    if (se(await z.realpath(u.parent)) !== se(u.parent)) {
      if (typeof e !== "string") return Ki(r, i, n);
      throw Error("Local folders cannot contain links or redirected paths.");
    }
    if (u.parent !== s && !w.isDirectory()) throw Error("A parent folder was replaced.");
  }
  return { filename: s, exists: u.exists };
}