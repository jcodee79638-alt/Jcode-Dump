
async function aa(e) {
  let t = (r) => xe.default.isAbsolute(r) && !/^(?:\\\\|\/\/)/.test(r);
  if (!t(e)) throw Error(He);
  let n = async (r) => {
      let s = await qe.lstat(r);
      if (!s.isFile() || s.isSymbolicLink() || s.nlink !== 1 || s.size > 262144) throw Error(He);
      return new TextDecoder("utf-8", { fatal: !0 }).decode(await qe.readFile(r));
    },
    i = e;
  for (let r = 0; r < 32; r++) {
    let s = xe.default.join(i, ".git"),
      o = await qe.lstat(s).catch(() => {
        return;
      });
    if (!o) {
      let u = xe.default.dirname(i);
      if (u === i) return;
      i = u;
      continue;
    }
    if (o.isSymbolicLink()) throw Error(He);
    if (!o.isDirectory()) throw Error(He);
    let l = s;
    if (!t(l) || xe.default.resolve(await qe.realpath(l)) !== xe.default.resolve(l)) throw Error(He);
    for (let u of ["config", "config.worktree"]) {
      let p = xe.default.join(l, u);
      if (
        !(await qe.lstat(p).catch(() => {
          return;
        }))
      )
        continue;
      let w = await n(p);
      if (
        /^\s*\[\s*include(?:if)?(?:\s|\])/im.test(w) ||
        /^\s*(?:promisor|partialclonefilter|partialclone)\s*=/im.test(w) ||
        /^\s*[a-z0-9._-]+\s*=\s*["']?(?:\\\\|\/\/)/im.test(w)
      )
        throw Error(He);
    }
    return;
  }
  throw Error(He);
}