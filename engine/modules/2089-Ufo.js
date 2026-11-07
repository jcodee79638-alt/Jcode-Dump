
function Ufo(e, t, r) {
  let s = Tar(r);
  if (!s) return;
  let a = OL(wfo({ ...s.data, template: s.content.trim() }));
  if (!a) return;
  return {
    name: Cfo.relative(e, t)
      .replaceAll("\\", "/")
      .replace(/^(command|commands)\//, "")
      .replace(/\.md$/, ""),
    info: a,
  };
}