
var uci = Ie(function (Aci) {
  Object.defineProperty(Aci, "__esModule", { value: !0 });
  Aci.parseInteger = Z5o;
  Aci.parseStringASCII = cci;
  Aci.parseTime = eXo;
  Aci.parseOID = tXo;
  Aci.parseBoolean = rXo;
  Aci.parseBitString = nXo;
  var Q5o = /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\.\d{3})?Z$/,
    Y5o = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\.\d{3})?Z$/;
  function Z5o(e) {
    let t = 0,
      r = e.length,
      s = e[t],
      a = s > 127,
      H = a ? 255 : 0;
    while (s == H && ++t < r) s = e[t];
    if (r - t === 0) return BigInt(a ? -1 : 0);
    s = a ? s - 256 : s;
    let f = BigInt(s);
    for (let d = t + 1; d < r; ++d) f = f * BigInt(256) + BigInt(e[d]);
    return f;
  }
  function cci(e) {
    return e.toString("ascii");
  }
  function eXo(e, t) {
    let r = cci(e),
      s = t ? Q5o.exec(r) : Y5o.exec(r);
    if (!s) throw Error("invalid time");
    if (t) {
      let a = Number(s[1]);
      ((a += a >= 50 ? 1900 : 2000), (s[1] = a.toString()));
    }
    return new Date(`${s[1]}-${s[2]}-${s[3]}T${s[4]}:${s[5]}:${s[6]}Z`);
  }
  function tXo(e) {
    let t = 0,
      r = e.length,
      s = e[t++],
      a = Math.floor(s / 40),
      H = s % 40,
      u = `${a}.${H}`,
      f = 0;
    for (; t < r; ++t)
      if (((s = e[t]), (f = (f << 7) + (s & 127)), (s & 128) === 0)) ((u += `.${f}`), (f = 0));
    return u;
  }
  function rXo(e) {
    return e[0] !== 0;
  }
  function nXo(e) {
    let t = e[0],
      r = 1,
      s = e.length,
      a = [];
    for (let H = 1; H < s; ++H) {
      let u = e[H],
        f = H === s - 1 ? t : 0;
      for (let d = 7; d >= f; --d) a.push((u >> d) & 1);
    }
    return a;
  }
});