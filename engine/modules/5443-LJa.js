
function LJa(e, t) {
  let r = [],
    s = t;
  while (s < e.length && !e[s].startsWith("***"))
    if (e[s].startsWith("@@")) {
      let a = e[s].substring(2).trim();
      s++;
      let H = [],
        u = [],
        f = !1;
      while (s < e.length && !e[s].startsWith("@@") && !e[s].startsWith("***")) {
        let d = e[s];
        if (d === "*** End of File") {
          ((f = !0), s++);
          break;
        }
        if (d.startsWith(" ")) {
          let _ = d.substring(1);
          (H.push(_), u.push(_));
        } else if (d.startsWith("-")) H.push(d.substring(1));
        else if (d.startsWith("+")) u.push(d.substring(1));
        s++;
      }
      r.push({ old_lines: H, new_lines: u, change_context: a || void 0, is_end_of_file: f || void 0 });
    } else s++;
  return { chunks: r, nextIdx: s };
}