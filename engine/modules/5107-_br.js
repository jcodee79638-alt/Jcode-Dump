
function _br(e) {
  if (!e || typeof e !== "object") return e;
  let t = {};
  for (let [r, s] of Object.entries(e)) {
    if (r === "description" || r === "examples" || r === "default") continue;
    if (r === "properties" && typeof s === "object" && s !== null) {
      let a = {};
      for (let [H, u] of Object.entries(s))
        if (typeof u === "object" && u !== null) a[H] = _br(u);
        else a[H] = u;
      t[r] = a;
    } else if (r === "items" && typeof s === "object" && s !== null) t[r] = _br(s);
    else t[r] = s;
  }
  return t;
}