
function BBi(e) {
  if (!e) return;
  try {
    return NBi(e).type;
  } catch {
    let t = (e.split(";", 1)[0] ?? "").trim().toLowerCase();
    if (t === "" || e.slice(t.length).includes(",")) return;
    return t;
  }
}