
function B8s(e) {
  let r = "",
    s = U8s(e);
  for (let a = 0; a < e; a++)
    r += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[s[a] % 62];
  return r;
}