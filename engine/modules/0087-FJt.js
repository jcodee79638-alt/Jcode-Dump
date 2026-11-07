
async function FJt(e, t, r = !1) {
  return OJt("sha256", await NJt(e, r))
    .update(t)
    .digest("hex");
}