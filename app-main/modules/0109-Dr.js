
async function Dr(e, t) {
  let n = await De(e, t, !0);
  if (
    await oe.stat(n.target).then(
      (b) => b.size > qr,
      () => !1,
    )
  )
    throw Error("Choose a text file smaller than 5 MB.");
  let i = await Ge(n.root, ["status", "--porcelain=v1", "-z", "--", n.relative]),
    r = (await Ge(n.root, ["rev-parse", "--show-prefix"])).trim(),
    s = await Ge(n.root, ["show", `HEAD:${r}${n.relative}`]).catch(() => {
      return;
    }),
    o = await oe.stat(n.target).then(
      async (b) => {
        if (!b.isFile() || b.size > qr) return;
        let C = await oe.readFile(n.target);
        return C.includes(0) ? void 0 : C.toString("utf8");
      },
      () => {
        return;
      },
    ),
    l = await Ge(n.root, [
      "diff",
      "--relative",
      "--no-ext-diff",
      "--no-textconv",
      "--no-renames",
      "HEAD",
      "--",
      n.relative,
    ]).catch(() => ""),
    u = await Ge(n.root, ["ls-files", "--stage", "-z", "--", n.relative]),
    p = dn
      .createHash("sha256")
      .update(n.relative)
      .update(i)
      .update(u)
      .update(s ?? "<absent>"),
    w = await oe.readFile(n.target).catch(() => {
      return;
    });
  p.update(w ?? "<absent>");
  let f = !i.startsWith("??") && u.length > 0,
    h = (await Ge(n.root, ["check-attr", "-z", "filter", "--", n.relative])).split("\x00"),
    m = h[2] !== "unspecified" && h[2] !== "unset";
  return {
    path: n.relative,
    patch:
      l ||
      (o !== void 0 && i.startsWith("??")
        ? `--- /dev/null
+++ b/${n.relative}
@@ -0,0 +1,${
            o.split(`
`).length
          } @@
${o
  .split(
    `
`,
  )
  .map((b) => "+" + b).join(`
`)}`
        : ""),
    before: s,
    after: o,
    canStage: !!i && !m && !/[RCU]/.test(i.slice(0, 2)),
    canRestore: f && s !== void 0 && !m && !/[RCU]/.test(i.slice(0, 2)),
    fingerprint: p.digest("hex"),
  };
}