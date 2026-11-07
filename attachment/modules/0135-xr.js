
async function xr(c) {
  const e = await process.getBuiltinModule("fs/promises").readFile(c);
  return new Uint8Array(e);
}