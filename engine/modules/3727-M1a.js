
function M1a(e, t) {
  let r = (e.toString().split(".")[1] || "").length,
    s = (t.toString().split(".")[1] || "").length,
    a = r > s ? r : s,
    H = Number.parseInt(e.toFixed(a).replace(".", "")),
    u = Number.parseInt(t.toFixed(a).replace(".", ""));
  return (H % u) / 10 ** a;
}