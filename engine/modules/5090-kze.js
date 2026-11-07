
function kze(e, t) {
  let r = String(e ?? "");
  if (r.includes("\x00")) throw new Ca({ message: `${t} contains null bytes` });
  if (r && !gb.isAbsolute(r)) {
    let s = gb.resolve(r),
      a = process.cwd();
    if (!s.startsWith(a + gb.sep) && s !== a)
      throw new Ca({ message: `${t} resolves outside the working directory: ${r}` });
  }
  return r;
}