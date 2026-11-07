
function UVa(e, t) {
  if (e) e = e.replaceAll("\\", "/");
  if (t) t = t.replaceAll("\\", "/");
  let r = t
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*")
    .replace(/\?/g, ".");
  if (r.endsWith(" .*")) r = r.slice(0, -3) + "( .*)?";
  let s = "si";
  return new RegExp("^" + r + "$", s).test(e);
}