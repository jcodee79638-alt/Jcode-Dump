
function Kzi(e) {
  let t = e.indexOf(",");
  if (t === -1) return "";
  let r = e.slice(0, t),
    s = e.slice(t + 1);
  if (r.includes(";base64")) return Buffer.from(s, "base64").toString("utf8");
  return decodeURIComponent(s);
}