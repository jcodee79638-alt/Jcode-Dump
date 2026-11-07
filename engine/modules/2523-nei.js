
var nei = Ie(function (quc, rei) {
  var { dirname: YZn, join: ZZn, resolve: eei, relative: yNo, isAbsolute: MNo } = cr("path"),
    C1 = cr("fs/promises"),
    xNo = async (e) => {
      try {
        return (await C1.access(e), !0);
      } catch (t) {
        return t.code !== "ENOENT";
      }
    },
    tei = async (e, t, r = {}, s = !0, a = []) => {
      if (!e || !t) throw TypeError("`source` and `destination` file required");
      if (((r = { overwrite: !0, ...r }), !r.overwrite && (await xNo(t))))
        throw Error(`The destination file exists: ${t}`);
      await C1.mkdir(YZn(t), { recursive: !0 });
      try {
        await C1.rename(e, t);
      } catch (H) {
        if (H.code === "EXDEV" || H.code === "EPERM") {
          let u = await C1.lstat(e);
          if (u.isDirectory()) {
            let f = await C1.readdir(e);
            await Promise.all(f.map((d) => tei(ZZn(e, d), ZZn(t, d), r, !1, a)));
          } else if (u.isSymbolicLink()) a.push({ source: e, destination: t });
          else await C1.copyFile(e, t);
        } else throw H;
      }
      if (s)
        (await Promise.all(
          a.map(async ({ source: H, destination: u }) => {
            let f = await C1.readlink(H);
            if (MNo(f)) f = eei(u, yNo(H, f));
            let d = "file";
            try {
              if (((d = await C1.stat(eei(YZn(H), f))), d.isDirectory())) d = "junction";
            } catch {}
            await C1.symlink(f, u, d);
          }),
        ),
          await C1.rm(e, { recursive: !0, force: !0 }));
    };
  rei.exports = tei;
});