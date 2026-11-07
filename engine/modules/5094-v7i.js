
function v7i(e) {
  if (!e) throw new Ca({ message: "filePath is required" });
  if (e.includes("\x00")) throw new Ca({ message: "filePath contains null bytes" });
  let t = gb.resolve(e),
    r = process.cwd();
  if (!t.startsWith(r + gb.sep) && t !== r)
    throw new Ca({ message: `filePath resolves outside the working directory: ${e}` });
  let s = T7i(t),
    a = T7i(r);
  if (!s.startsWith(a + gb.sep) && s !== a)
    throw new Ca({ message: `filePath resolves outside the working directory: ${e}` });
  return t;
}