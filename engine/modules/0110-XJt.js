
async function XJt(e, t = 8192) {
  if (!(await UM(e))) return { files: [], truncated: !1 };
  await p6(e);
  let r = [],
    s = await atn(e);
  for await (let a of s) {
    if (r.length >= t) return { files: r, truncated: !0 };
    r.push(a.name);
  }
  return { files: r, truncated: !1 };
}