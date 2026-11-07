
function PRa(e) {
  let t = `${ZWi}T${eVi(e)}`,
    r = [];
  if ((r.push(e.local ? "Z?" : "Z"), e.offset)) r.push("([+-]\\d{2}:?\\d{2})");
  return ((t = `${t}(${r.join("|")})`), new RegExp(`^${t}$`));
}