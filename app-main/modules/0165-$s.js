
async function $s(e, t) {
  if (!Hr(e)) throw Error("Use argv arrays without shell syntax or shell executables.");
  if (/^npm(?:\.exe)?$/i.test(e[0])) {
    if (e[1] !== "run" || !/^[a-zA-Z0-9:_-]{1,80}$/.test(e[2] ?? "") || (e.length > 3 && e[3] !== "--"))
      throw Error("npm profiles must use npm run script, optionally followed by -- and arguments.");
    let n = await Zn("node", t),
      i = [...new Set([L.default.dirname(n), ...Vn(t)])].flatMap((r) => [
        L.default.join(r, "node_modules/npm/bin/npm-cli.js"),
        L.default.resolve(r, "../lib/node_modules/npm/bin/npm-cli.js"),
      ]);
    for (let r of i) {
      if (Kn(t, r) || /(?:^|[\\/])(?:private|\.tools|\.env[^\\/]*)[\\/]/i.test(r)) continue;
      let s = await (async () => {
        await ot(L.default.dirname(r));
        let o = await Z.lstat(r);
        if (!o.isFile() || o.isSymbolicLink() || o.nlink !== 1 || he(await Z.realpath(r)) !== he(r)) return;
        return r;
      })().catch(() => {
        return;
      });
      if (s) return [n, s, ...e.slice(1)];
    }
    throw Error(
      "npm's native JavaScript entrypoint is unavailable. Install Node.js/npm yourself, then reopen Jac Code.",
    );
  }
  return [await Zn(e[0], t), ...e.slice(1)];
}