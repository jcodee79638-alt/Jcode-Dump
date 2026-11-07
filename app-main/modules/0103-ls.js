
async function ls(e, t, n = !1) {
  let i = await qe.realpath(e);
  await aa(i);
  let r = await (async () => {
      for (let u of ca(i)) {
        let p = await qe.realpath(u).catch(() => {
          return;
        });
        if (!p || ds(i, p)) continue;
        if (
          (
            await qe.stat(p).catch(() => {
              return;
            })
          )?.isFile()
        )
          return p;
      }
      throw Error(He);
    })(),
    s = Object.fromEntries(Object.entries(process.env).filter(([u]) => !/^GIT_/i.test(u)));
  Object.assign(s, {
    GIT_TERMINAL_PROMPT: "0",
    GIT_PAGER: "cat",
    GIT_LITERAL_PATHSPECS: "1",
    GIT_NO_LAZY_FETCH: "1",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: process.platform === "win32" ? "NUL" : "/dev/null",
  });
  let o = [
      "-C",
      i,
      "-c",
      "core.quotepath=false",
      "-c",
      "core.hooksPath=NUL",
      "-c",
      "core.fsmonitor=false",
      "--no-optional-locks",
    ],
    l = {
      cwd: xe.default.dirname(r),
      windowsHide: !0,
      shell: !1,
      timeout: 15000,
      maxBuffer: 5000000,
      env: s,
    };
  try {
    let p = (
      await os(r, [...o, "config", "--null", "--list", "--name-only"], {
        ...l,
        timeout: 3000,
        maxBuffer: 262144,
        encoding: "utf8",
      })
    ).stdout
      .split("\x00")
      .filter(Boolean);
    if (p.length > 2048) throw Error(He);
    let w = [
      ...new Set(p.flatMap((m) => m.match(/^filter\.(.+)\.(?:clean|smudge|process|required)$/i)?.[1] ?? [])),
    ];
    if (w.length > 32 || w.some((m) => /[\u0000-\u001f\u007f]/.test(m))) throw Error(He);
    let f = w.flatMap((m) => [
        "-c",
        `filter.${m}.process=`,
        "-c",
        `filter.${m}.clean=`,
        "-c",
        `filter.${m}.smudge=`,
        "-c",
        `filter.${m}.required=false`,
      ]),
      h = await os(r, [...o, ...f, ...t], { ...l, encoding: n ? "buffer" : "utf8" });
    return typeof h.stdout === "string" ? h.stdout : h.stdout.toString("utf8");
  } catch (u) {
    let p = u;
    if (p.code === 128 && /not a git repository/i.test(p.stderr ?? ""))
      throw Object.assign(Error("not a git repository"), { code: 128, stderr: "not a git repository" });
    throw Error(He);
  }
}