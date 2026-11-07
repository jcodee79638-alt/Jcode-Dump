
async function Dn(e) {
  for (let t of await z.readdir(e.directory)) {
    let n = await X(e, t);
    if ((await z.lstat(n.filename)).isDirectory()) await Dn({ directory: n.filename });
  }
}