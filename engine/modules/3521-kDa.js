
function kDa(e) {
  let t = e.split("/");
  if (t.length !== 2) return !1;
  let [r, s] = t;
  if (!s) return !1;
  let a = Number(s);
  if (`${a}` !== s) return !1;
  if (a < 0 || a > 128) return !1;
  return Lji(r);
}