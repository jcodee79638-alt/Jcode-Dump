
function $de(...e) {
  if (e[0].columns) return new ztr(e[0].columns, e[0].name);
  return new ztr(e);
}