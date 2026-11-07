
async function on(e) {
  let t = cn(e);
  if (Ce(t)) throw Error("Choose a project outside private, secret, or generated folders.");
  let n = await X(
    W.default.parse(t).root,
    W.default.relative(W.default.parse(t).root, t).replaceAll("\\", "/"),
  );
  if (!(await z.lstat(n.filename)).isDirectory()) throw Error("Choose a local project folder.");
  return t;
}