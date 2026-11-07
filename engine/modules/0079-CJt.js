
async function CJt(e, t = {}) {
  let r = Date.now() + 1e4,
    s = [],
    a = async (L) => {
      if (Date.now() > r) throw Error("Local storage initialization exceeded its time limit.");
      let I = await I8s(L, { bigint: !0 });
      if (!I.isDirectory() || I.isSymbolicLink() || I.nlink < 1n || I.nlink !== 1n)
        throw Error("Local storage must use ordinary local folders without links.");
      return { filename: L, dev: I.dev, ino: I.ino };
    },
    H = async (L) => {
      for (let I of L) {
        let D = await a(I.filename);
        if (D.dev !== I.dev || D.ino !== I.ino)
          throw Error("The local storage folder changed during initialization.");
      }
    };
  for (let L of Yen(e)) {
    if (t.create === !1) {
      s.push(await a(L));
      continue;
    }
    await H(s);
    let I = await a(L).catch((D) => {
      if (D.code !== "ENOENT" || t.create === !1) throw D;
    });
    if (!I)
      (await D8s(L, { mode: 448 }).catch((D) => {
        if (D.code !== "EEXIST") throw D;
      }),
        await H(s));
    (s.push(I ?? (await a(L))), await H(s));
  }
  let u = await Qen(e),
    f = [];
  for (let L of Yen(u)) f.push(await a(L));
  let d = s[s.length - 1],
    _ = f[f.length - 1];
  if (d.dev !== _.dev || d.ino !== _.ino)
    throw Error("The local storage folder changed during initialization.");
  if ((await H(s), await H(f), (await Qen(e)) !== u))
    throw Error("The local storage folder changed during initialization.");
  return u;
}