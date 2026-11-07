
async function VaH(e, t, r = fetch, s = () => {}) {
  let a = NaH.join(t, "verified-installer.exe"),
    H = await FaH(a, "wx"),
    u = new Bun.CryptoHasher("sha256"),
    f = 0;
  try {
    for (let d of e.chunks) {
      let _ = await Yis(
        await r(d.url, {
          cache: "no-store",
          redirect: "error",
          signal: AbortSignal.timeout(60000),
          headers: { "X-Jac-Version": h_ },
        }),
        d.size,
      );
      if (_.byteLength !== d.size || RaH(_) !== d.sha256) throw new UP();
      (await H.writeFile(_), u.update(_), (f += _.byteLength), s(Math.floor((f / e.size) * 100)));
    }
    if (f !== e.size || u.digest("hex") !== e.sha256) throw new UP();
    await H.sync();
  } catch (d) {
    throw (await H.close(), await BaH(a, { force: !0 }), d);
  }
  return (await H.close(), a);
}