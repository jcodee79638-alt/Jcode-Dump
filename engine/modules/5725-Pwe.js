
function Pwe(e, t) {
  let r = new URL(e);
  return ((r.pathname = `${r.pathname.replace(/\/$/, "")}${t}`), (r.search = ""), (r.hash = ""), r);
}