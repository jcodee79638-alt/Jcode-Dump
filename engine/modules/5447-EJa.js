
function EJa(e) {
  let t = ["apply_patch", "applypatch"];
  if (e.length === 2 && t.includes(e[0]))
    try {
      let { hunks: r } = cQe(e[1]);
      return { type: "Body", args: { patch: e[1], hunks: r } };
    } catch (r) {
      return { type: "PatchParseError", error: r };
    }
  if (e.length === 3 && e[0] === "bash" && e[1] === "-lc") {
    let s = e[2].match(/apply_patch\s*<<['"](\w+)['"]\s*\n([\s\S]*?)\n\1/);
    if (s) {
      let a = s[2];
      try {
        let { hunks: H } = cQe(a);
        return { type: "Body", args: { patch: a, hunks: H } };
      } catch (H) {
        return { type: "PatchParseError", error: H };
      }
    }
  }
  return { type: "NotApplyPatch" };
}