
function Pfo(e, t) {
  let r = Tar(t);
  if (!r) return;
  let s = Efo.relative(e.directory, e.filepath)
      .replaceAll("\\", "/")
      .replace(/^(agent|agents|mode|modes)\//, "")
      .replace(/\.md$/, ""),
    a = r.content.trim(),
    H = Object.keys(r.data).some((d) => !Sfo.has(d)),
    u = OL(
      H
        ? YF(yfo({ name: s, ...r.data, prompt: a }, { errors: "all", propertyOrder: "original" }), EMn)
        : Dfo({ ...r.data, system: a }, { errors: "all", propertyOrder: "original" }),
    );
  if (!u) return;
  let f = OL(Mfo({ agents: { [s]: e.primary ? { ...u, mode: "primary" } : u } }));
  if (!f) return;
  return new bsr({ type: "document", path: e.filepath, info: f });
}