
async function $n(e) {
  return (
    await Promise.all(
      (await z.readdir(e.directory)).map(async (n) => {
        let i = await X(e, n),
          r = await z.lstat(i.filename);
        if (r.isDirectory()) return $n({ directory: i.filename });
        if (!r.isFile() || r.nlink > 1) throw Error("The checkpoint store contains an unsafe file.");
        return r.size;
      }),
    )
  ).reduce((n, i) => n + i, 0);
}