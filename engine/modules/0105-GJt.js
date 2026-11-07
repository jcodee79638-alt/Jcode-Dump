
async function GJt(e) {
  let t = Pu.join(e.state, "desktop-v3.json");
  if (!(await UM(t))) return {};
  let r = JSON.parse((await dI(t, Ch.settings)).toString("utf8"));
  if (!NM(r)) throw Ap();
  return r;
}