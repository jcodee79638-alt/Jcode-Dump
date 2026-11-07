
async function Ia(e, t = ne.default.dirname(e)) {
  let n = JSON.parse((await wn(ne.default.join(e, "manifest.json"), Be.manifest)).toString("utf8"));
  ((n.seal = Fe.createHmac("sha256", await Kr(t, !0))
    .update(oo(n))
    .digest("hex")),
    so(n),
    await ao(ne.default.join(e, "manifest.json"), n));
}