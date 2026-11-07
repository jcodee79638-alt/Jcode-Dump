
function Vn(e) {
  return (process.env.PATH ?? process.env.Path ?? "")
    .split(L.default.delimiter)
    .filter((t) => !!t && L.default.isAbsolute(t) && !t.startsWith("\\\\") && !Kn(e, t) && !hn(t));
}