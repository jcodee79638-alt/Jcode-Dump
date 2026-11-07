
function CVa() {
  try {
    let e = gbr();
    if (!T7.existsSync(e)) return null;
    let t = T7.readFileSync(e, "utf-8");
    return JSON.parse(t);
  } catch {
    return null;
  }
}