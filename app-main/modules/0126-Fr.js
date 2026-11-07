
async function Fr(e) {
  await Ye.mkdir(e, { recursive: !0, mode: 448 });
  let n = await Ye.realpath(e);
  for (let o of ["Jac Code", "Chats"]) {
    let l = un.default.join(n, o);
    await Ye.mkdir(l, { mode: 448 }).catch((w) => {
      if (!w || typeof w !== "object" || !("code" in w) || w.code !== "EEXIST") throw w;
    });
    let u = await Ye.lstat(l);
    if (u.isSymbolicLink() || !u.isDirectory())
      throw Error("The chat workspace folder is unavailable. Choose a project folder instead.");
    let p = await Ye.realpath(l);
    if (un.default.relative(n, p).toLowerCase() !== o.toLowerCase())
      throw Error("The chat workspace folder is unavailable. Choose a project folder instead.");
    n = p;
  }
  let i = un.default.join(n, `chat_${Ss.randomUUID()}`);
  await Ye.mkdir(i, { mode: 448 });
  let r = await Ye.lstat(i),
    s = await Ye.realpath(i);
  if (r.isSymbolicLink() || !r.isDirectory() || un.default.dirname(s).toLowerCase() !== n.toLowerCase())
    throw Error("The chat workspace folder is unavailable. Choose a project folder instead.");
  return s;
}