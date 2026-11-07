
async function Gn(e, t = !1) {
  if (
    hn(L.default.dirname(e)) ||
    /[\0\r\n:]/.test(L.default.basename(e)) ||
    /\.(?:cmd|bat)$/i.test(e) ||
    Js.test(L.default.basename(e))
  )
    throw Error("Choose a native executable, not a shell wrapper.");
  await ot(L.default.dirname(e));
  let n = await Z.lstat(e),
    i = t && fa.test(L.default.basename(e)) && (process.platform !== "win32" || /\.exe$/i.test(e));
  if (!n.isFile() || n.isSymbolicLink() || (n.nlink !== 1 && !i) || he(await Z.realpath(e)) !== he(e))
    throw Error("Choose a local executable without links.");
  return (await Z.access(e, Yn.constants.X_OK), e);
}