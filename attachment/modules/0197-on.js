
function on(c, t = null) {
  const e = process.getBuiltinModule("fs"),
    { Readable: s } = process.getBuiltinModule("stream"),
    i = e.createReadStream(c, t);
  return s.toWeb(i);
}