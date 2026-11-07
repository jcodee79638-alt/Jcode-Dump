
async function k9a(e) {
  let r = Math.pow(2, 8) - (Math.pow(2, 8) % 66),
    s = "";
  while (s.length < e) {
    let a = await w9a(e - s.length);
    for (let H of a)
      if (H < r) s += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"[H % 66];
  }
  return s;
}