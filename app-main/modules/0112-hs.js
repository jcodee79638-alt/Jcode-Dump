
async function hs(e) {
  for (let t of ["", "public", "dist", "build"]) {
    let n = await ms(e, t).catch(() => {
      return;
    });
    if (!n?.info.isDirectory()) continue;
    for (let s of ["index.html", "index.htm"]) {
      let o = await Fn(e, [t, s].filter(Boolean).join("/"), !0).catch(() => {
        return;
      });
      if (o) return { path: o.relative };
    }
    let i = await oe.opendir(n.target, { bufferSize: 16 }).catch(() => {
      return;
    });
    if (!i) continue;
    let r = { entries: 0, candidates: 2 };
    for await (let s of i) {
      if (
        (r.entries++, s.isFile() && /\.html?$/i.test(s.name) && !["index.html", "index.htm"].includes(s.name))
      ) {
        if (r.candidates >= ln.candidates) break;
        r.candidates++;
        let o = await Fn(e, [t, s.name].filter(Boolean).join("/"), !0).catch(() => {
          return;
        });
        if (o) return { path: o.relative };
      }
      if (r.entries >= ln.entries) break;
    }
  }
  return null;
}