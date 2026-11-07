
async function ms(e, t) {
  if (Ce(await oe.realpath(et(e)))) throw Error("Choose a public project preview file.");
  if (Ce(t.replace(/^(?:dist|build)(?:\/|$)/i, ""))) throw Error("Choose a public project preview file.");
  let n = await De(e, t),
    i = await oe.lstat(et(e)),
    r = await oe.lstat(n.target),
    s = (o) => (process.platform === "win32" ? it.default.resolve(o).toLowerCase() : it.default.resolve(o));
  if (
    !i.isDirectory() ||
    i.isSymbolicLink() ||
    s(n.root) !== s(e) ||
    r.isSymbolicLink() ||
    s(await oe.realpath(n.target)) !== s(n.target)
  )
    throw Error("Choose a local preview without links or redirected paths.");
  return { ...n, info: r };
}