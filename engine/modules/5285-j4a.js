
function j4a(e, t, r) {
  let s = mqi(e)
    .replace(/\$\{env:([^}]+)\}/gi, (a, H) => fqi(H) || "")
    .replace(/\$env:([A-Za-z_][A-Za-z0-9_]*)/gi, (a, H) => fqi(H) || "")
    .replace(/\$(HOME|PWD|PSHOME)(?=$|[\\/])/gi, (a, H) => b4a(H, t, r) || "");
  return _qi(s);
}