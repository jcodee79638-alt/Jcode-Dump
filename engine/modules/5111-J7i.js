
function J7i() {
  let e = X7i.homedir(),
    t = process.env.XDG_DATA_HOME;
  if (t) return hbr.join(t, "opencode", "auth.json");
  return hbr.join(e, ".opencode", "auth.json");
}