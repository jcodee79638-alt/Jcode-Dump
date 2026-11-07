
function fba(e) {
  if (!e || typeof e !== "object") throw Error(avt + "Object expected");
  var t,
    r,
    s,
    a = e.defaults === !0,
    H = [
      "precision",
      1,
      SHe,
      "rounding",
      0,
      8,
      "toExpNeg",
      -Lje,
      0,
      "toExpPos",
      0,
      Lje,
      "maxE",
      0,
      Lje,
      "minE",
      -Lje,
      0,
      "modulo",
      0,
      9,
    ];
  for (t = 0; t < H.length; t += 3) {
    if (((r = H[t]), a)) this[r] = ZDr[r];
    if ((s = e[r]) !== void 0)
      if (EP(s) === s && s >= H[t + 1] && s <= H[t + 2]) this[r] = s;
      else throw Error(xHe + r + ": " + s);
  }
  if (((r = "crypto"), a)) this[r] = ZDr[r];
  if ((s = e[r]) !== void 0)
    if (s === !0 || s === !1 || s === 0 || s === 1)
      if (s)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[r] = !0;
        else throw Error(rOi);
      else this[r] = !1;
    else throw Error(xHe + r + ": " + s);
  return this;
}