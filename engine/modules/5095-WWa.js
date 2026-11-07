
function WWa(e, t) {
  if (e !== "edit" && e !== "write") return null;
  let r;
  try {
    r = JSON.parse(t);
  } catch {
    return { result: "", error: `${e} fallback: invalid JSON arguments` };
  }
  try {
    if (e === "write") {
      let L = String(r.filePath ?? "");
      if (!L) return { result: "", error: "write fallback: filePath is required" };
      let I = v7i(L),
        D = String(r.content ?? "");
      return (
        vce.writeFileSync(I, D, "utf-8"),
        { result: "File written successfully.", title: L, metadata: { output: "File written successfully." } }
      );
    }
    let s = String(r.filePath ?? ""),
      a = String(r.oldString ?? ""),
      H = String(r.newString ?? "");
    if (!s) return { result: "", error: "edit fallback: filePath is required" };
    if (!a && !H) return { result: "", error: "edit fallback: oldString and newString are both empty" };
    let u = v7i(s),
      f;
    try {
      f = vce.readFileSync(u, "utf-8");
    } catch {
      f = "";
    }
    if (a === "")
      return (
        vce.writeFileSync(u, H, "utf-8"),
        { result: "Edit applied successfully.", title: s, metadata: { output: "Edit applied successfully." } }
      );
    let d = f.indexOf(a);
    if (d === -1) return { result: "", error: `edit fallback: could not find oldString in ${s}` };
    let _ = f.substring(0, d) + H + f.substring(d + a.length);
    return (
      vce.writeFileSync(u, _, "utf-8"),
      { result: "Edit applied successfully.", title: s, metadata: { output: "Edit applied successfully." } }
    );
  } catch (s) {
    let a = s instanceof Error ? s.message : String(s);
    return { result: "", error: ICe(a) };
  }
}