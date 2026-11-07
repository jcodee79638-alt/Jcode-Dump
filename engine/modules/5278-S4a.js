
function S4a(e) {
  let t = [];
  for (let r = 0; r < e.childCount; r++) {
    let s = e.child(r);
    if (!s) continue;
    if (s.type === "command_elements") {
      for (let a = 0; a < s.childCount; a++) {
        let H = s.child(a);
        if (!H || H.type === "command_argument_sep" || H.type === "redirection") continue;
        t.push({ type: H.type, text: H.text });
      }
      continue;
    }
    if (
      s.type !== "command_name" &&
      s.type !== "command_name_expr" &&
      s.type !== "word" &&
      s.type !== "string" &&
      s.type !== "raw_string" &&
      s.type !== "concatenation"
    )
      continue;
    t.push({ type: s.type, text: s.text });
  }
  return t;
}