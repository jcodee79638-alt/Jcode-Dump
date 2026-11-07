
function Lma(e, t, r) {
  let s = [],
    a = 0;
  for (let H of r) {
    if (H.changeContext) {
      let _ = H$r(e, [H.changeContext], a);
      if (_ === -1) throw Error(`Failed to find context '${H.changeContext}' in ${t}`);
      a = _ + 1;
    }
    if (H.oldLines.length === 0) {
      s.push([e.length, 0, H.newLines]);
      continue;
    }
    let { oldLines: u, newLines: f } = H,
      d = H$r(e, u, a, H.endOfFile);
    if (d === -1 && u.at(-1) === "") {
      if (((u = u.slice(0, -1)), f.at(-1) === "")) f = f.slice(0, -1);
      d = H$r(e, u, a, H.endOfFile);
    }
    if (d === -1)
      throw Error(`Failed to find expected lines in ${t}:
${H.oldLines.join(`
`)}`);
    (s.push([d, u.length, f]), (a = d + u.length));
  }
  return s.toSorted((H, u) => H[0] - u[0]);
}