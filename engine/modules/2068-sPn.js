
function sPn(e) {
  let t = e.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!t) return e;
  let r = t[1],
    s = r.split(/\r?\n/).flatMap((a) => {
      if (a.trim().startsWith("#") || a.trim() === "" || /^\s+/.test(a)) return [a];
      let H = a.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/);
      if (!H) return [a];
      let u = H[2].trim();
      if (u === "" || u === ">" || u === "|" || u.startsWith('"') || u.startsWith("'")) return [a];
      if (!u.includes(":")) return [a];
      return [`${H[1]}: |-`, `  ${u}`];
    });
  return e.replace(r, () =>
    s.join(`
`),
  );
}