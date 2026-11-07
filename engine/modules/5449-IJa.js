
function IJa(e, t, r) {
  let s = [],
    a = 0;
  for (let H of r) {
    if (H.change_context) {
      let _ = Wjr(e, [H.change_context], a);
      if (_ === -1) throw Error(`Failed to find context '${H.change_context}' in ${t}`);
      a = _ + 1;
    }
    if (H.old_lines.length === 0) {
      let _ = e.length > 0 && e[e.length - 1] === "" ? e.length - 1 : e.length;
      s.push([_, 0, H.new_lines]);
      continue;
    }
    let { old_lines: u, new_lines: f } = H,
      d = Wjr(e, u, a, H.is_end_of_file);
    if (d === -1 && u.length > 0 && u[u.length - 1] === "") {
      if (((u = u.slice(0, -1)), f.length > 0 && f[f.length - 1] === "")) f = f.slice(0, -1);
      d = Wjr(e, u, a, H.is_end_of_file);
    }
    if (d !== -1) (s.push([d, u.length, f]), (a = d + u.length));
    else
      throw Error(`Failed to find expected lines in ${t}:
${H.old_lines.join(`
`)}`);
  }
  return (s.sort((H, u) => H[0] - u[0]), s);
}