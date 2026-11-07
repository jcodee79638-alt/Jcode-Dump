
function ji(e) {
  let t = Ar.default.join(e, "projects.json"),
    n = Promise.resolve(),
    i = async () => {
      let r = await mt
        .readFile(t, "utf8")
        .then(JSON.parse)
        .catch(() => []);
      if (!Array.isArray(r)) return [];
      return r
        .filter(
          (s) =>
            s &&
            typeof s === "object" &&
            typeof s.id === "string" &&
            typeof s.name === "string" &&
            typeof s.directory === "string" &&
            s.directory.length <= 4096 &&
            s.name.length <= 260,
        )
        .slice(0, 2000);
    };
  return {
    read: i,
    remember(r) {
      let s = {
          id: `local_${In.createHash("sha256").update(r.toLowerCase()).digest("hex").slice(0, 24)}`,
          name: Ar.default.basename(r),
          directory: r,
        },
        o = n.then(async () => {
          let u = [...(await i()).filter((w) => w.directory.toLowerCase() !== r.toLowerCase()), s];
          if (u.length > 2000) throw Error("Too many saved projects");
          await mt.mkdir(e, { recursive: !0 });
          let p = `${t}.${In.randomUUID()}.tmp`;
          return (
            await mt.writeFile(p, JSON.stringify(u), { mode: 384, flag: "wx" }),
            await mt.rename(p, t),
            s
          );
        });
      return (
        (n = o.then(
          () => {
            return;
          },
          () => {
            return;
          },
        )),
        o
      );
    },
  };
}