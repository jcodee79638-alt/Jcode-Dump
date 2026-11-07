
function b2s(e) {
  if (e.length === 0) return "_";
  if (dZt.test(e)) return e;
  let t = [];
  for (let r of e) {
    let s = r.codePointAt(0);
    if (
      s !== void 0 &&
      ((s >= 48 && s <= 57) ||
        (s >= 65 && s <= 90) ||
        (s >= 97 && s <= 122) ||
        s === 46 ||
        s === 45 ||
        s === 95)
    )
      t.push(r);
    else t.push("_");
  }
  return t.join("");
}