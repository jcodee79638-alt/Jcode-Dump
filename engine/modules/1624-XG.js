
function XG(e, t) {
  let r = e.replaceAll("\\", "/"),
    s = t
      .replaceAll("\\", "/")
      .replace(/[.+^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, ".*")
      .replace(/\?/g, ".");
  if (s.endsWith(" .*")) s = s.slice(0, -3) + "( .*)?";
  return new RegExp("^" + s + "$", "si").test(r);
}