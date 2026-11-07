
async function je(e, t = {}) {
  let n = Date.now() + 1e4,
    i = [],
    r = async (w) => {
      if (Date.now() > n) throw Error("Local storage initialization exceeded its time limit.");
      let f = await xt.lstat(w, { bigint: !0 });
      if (
        !f.isDirectory() ||
        f.isSymbolicLink() ||
        f.nlink < 1n ||
        (process.platform === "win32" && f.nlink !== 1n)
      )
        throw Error("Local storage must use ordinary local folders without links.");
      return { filename: w, dev: f.dev, ino: f.ino };
    },
    s = async (w) => {
      for (let f of w) {
        let h = await r(f.filename);
        if (h.dev !== f.dev || h.ino !== f.ino)
          throw Error("The local storage folder changed during initialization.");
      }
    };
  for (let w of Ii(e)) {
    if (t.create === !1) {
      i.push(await r(w));
      continue;
    }
    await s(i);
    let f = await r(w).catch((h) => {
      if (h.code !== "ENOENT" || t.create === !1) throw h;
    });
    if (!f)
      (await xt.mkdir(w, { mode: 448 }).catch((h) => {
        if (h.code !== "EEXIST") throw h;
      }),
        await s(i));
    (i.push(f ?? (await r(w))), await s(i));
  }
  let o = await xt.realpath(e),
    l = [];
  for (let w of Ii(o)) l.push(await r(w));
  let u = i[i.length - 1],
    p = l[l.length - 1];
  if (u.dev !== p.dev || u.ino !== p.ino)
    throw Error("The local storage folder changed during initialization.");
  if ((await s(i), await s(l), (await xt.realpath(e)) !== o))
    throw Error("The local storage folder changed during initialization.");
  return o;
}