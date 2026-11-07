
async function sjt(e, t) {
  let r = [],
    s = new Set(),
    a;
  for (let H = 0; H < TRi; H++) {
    let u = await e(a);
    if ((r.push(...t(u)), u.nextCursor === void 0)) return r;
    if (s.has(u.nextCursor)) throw Error(`MCP list returned duplicate cursor: ${u.nextCursor}`);
    (s.add(u.nextCursor), (a = u.nextCursor));
  }
  throw Error(`MCP list exceeded ${TRi} pages`);
}