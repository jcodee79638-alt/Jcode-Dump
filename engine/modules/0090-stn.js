
async function stn(e, t = EU.dirname(e)) {
  let r = JSON.parse((await dI(EU.join(e, "manifest.json"), Ch.manifest)).toString("utf8"));
  ((r.seal = OJt("sha256", await NJt(t, !0))
    .update(itn(r))
    .digest("hex")),
    ntn(r),
    await jAt(EU.join(e, "manifest.json"), r));
}