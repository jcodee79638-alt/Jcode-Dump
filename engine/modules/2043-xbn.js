
var xbn = Ie(function (UYH, Mbn) {
  var Ime;
  try {
    ((par = cr), (Ime = par("buffer").Buffer));
  } catch (e) {}
  var par,
    xAo = ix(),
    dar = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function SAo(e) {
    if (e === null) return !1;
    var t,
      r,
      s = 0,
      a = e.length,
      H = dar;
    for (r = 0; r < a; r++) {
      if (((t = H.indexOf(e.charAt(r))), t > 64)) continue;
      if (t < 0) return !1;
      s += 6;
    }
    return s % 8 === 0;
  }
  function TAo(e) {
    var t,
      r,
      s = e.replace(/[\r\n=]/g, ""),
      a = s.length,
      H = dar,
      u = 0,
      f = [];
    for (t = 0; t < a; t++) {
      if (t % 4 === 0 && t) (f.push((u >> 16) & 255), f.push((u >> 8) & 255), f.push(u & 255));
      u = (u << 6) | H.indexOf(s.charAt(t));
    }
    if (((r = (a % 4) * 6), r === 0)) (f.push((u >> 16) & 255), f.push((u >> 8) & 255), f.push(u & 255));
    else if (r === 18) (f.push((u >> 10) & 255), f.push((u >> 2) & 255));
    else if (r === 12) f.push((u >> 4) & 255);
    if (Ime) return Ime.from ? Ime.from(f) : new Ime(f);
    return f;
  }
  function vAo(e) {
    var t = "",
      r = 0,
      s,
      a,
      H = e.length,
      u = dar;
    for (s = 0; s < H; s++) {
      if (s % 3 === 0 && s)
        ((t += u[(r >> 18) & 63]), (t += u[(r >> 12) & 63]), (t += u[(r >> 6) & 63]), (t += u[r & 63]));
      r = (r << 8) + e[s];
    }
    if (((a = H % 3), a === 0))
      ((t += u[(r >> 18) & 63]), (t += u[(r >> 12) & 63]), (t += u[(r >> 6) & 63]), (t += u[r & 63]));
    else if (a === 2)
      ((t += u[(r >> 10) & 63]), (t += u[(r >> 4) & 63]), (t += u[(r << 2) & 63]), (t += u[64]));
    else if (a === 1) ((t += u[(r >> 2) & 63]), (t += u[(r << 4) & 63]), (t += u[64]), (t += u[64]));
    return t;
  }
  function bAo(e) {
    return Ime && Ime.isBuffer(e);
  }
  Mbn.exports = new xAo("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: SAo,
    construct: TAo,
    predicate: bAo,
    represent: vAo,
  });
});