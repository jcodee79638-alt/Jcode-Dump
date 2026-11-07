
function QZi(e) {
  let t = WrH(e);
  return wCr(t ? BrH("sha256").update(t[2]).digest("base64") : "");
}