
var APt = (e, t) => (
    (APt = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty)),
    APt(e, t)
  ),
  HJ,
  KSr = 1024,
  _Vi = (e, t, r, s, a) => {
    if (e.length === 0) return e;
    let H = e;
    if (typeof e === "symbol") H = Symbol.prototype.toString.call(e);
    else if (typeof e !== "string") H = String(e);
    if (r === "iso-8859-1")
      return escape(H).replace(/%u[0-9a-f]{4}/gi, function (f) {
        return "%26%23" + parseInt(f.slice(2), 16) + "%3B";
      });
    let u = "";
    for (let f = 0; f < H.length; f += KSr) {
      let d = H.length >= KSr ? H.slice(f, f + KSr) : H,
        _ = [];
      for (let L = 0; L < d.length; ++L) {
        let I = d.charCodeAt(L);
        if (
          I === 45 ||
          I === 46 ||
          I === 95 ||
          I === 126 ||
          (I >= 48 && I <= 57) ||
          (I >= 65 && I <= 90) ||
          (I >= 97 && I <= 122) ||
          (a === mVi && (I === 40 || I === 41))
        ) {
          _[_.length] = d.charAt(L);
          continue;
        }
        if (I < 128) {
          _[_.length] = HJ[I];
          continue;
        }
        if (I < 2048) {
          _[_.length] = HJ[192 | (I >> 6)] + HJ[128 | (I & 63)];
          continue;
        }
        if (I < 55296 || I >= 57344) {
          _[_.length] = HJ[224 | (I >> 12)] + HJ[128 | ((I >> 6) & 63)] + HJ[128 | (I & 63)];
          continue;
        }
        ((L += 1),
          (I = 65536 + (((I & 1023) << 10) | (d.charCodeAt(L) & 1023))),
          (_[_.length] =
            HJ[240 | (I >> 18)] +
            HJ[128 | ((I >> 12) & 63)] +
            HJ[128 | ((I >> 6) & 63)] +
            HJ[128 | (I & 63)]));
      }
      u += _.join("");
    }
    return u;
  };