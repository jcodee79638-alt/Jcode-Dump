
var Gi = yr(() => {
  ((Li = require("module")), (Uo = Li.createRequire("/")));
  try {
    ((Nt = Uo("worker_threads")), (Jo = Nt.Worker), (Wo = Nt.isMarkedAsUntransferable));
  } catch (e) {}
  ((ke = Uint8Array),
    (_e = Uint16Array),
    (_r = Int32Array),
    (Mr = new ke([
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0,
    ])),
    (zr = new ke([
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0,
    ])),
    (Ti = new ke([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])),
    (Nt = qi(Mr, 2)),
    (Ho = Nt.b),
    (jr = Nt.r));
  ((Ho[28] = 258), (jr[258] = 28));
  ((Di = qi(zr, 0)), (uc = Di.b), (Ri = Di.r), (Ir = new _e(32768)));
  for (D = 0; D < 32768; ++D)
    ((Ke = ((D & 43690) >> 1) | ((D & 21845) << 1)),
      (Ke = ((Ke & 52428) >> 2) | ((Ke & 13107) << 2)),
      (Ke = ((Ke & 61680) >> 4) | ((Ke & 3855) << 4)),
      (Ir[D] = (((Ke & 65280) >> 8) | ((Ke & 255) << 8)) >> 1));
  Et = new ke(288);
  for (D = 0; D < 144; ++D) Et[D] = 8;
  for (D = 144; D < 256; ++D) Et[D] = 9;
  for (D = 256; D < 280; ++D) Et[D] = 7;
  for (D = 280; D < 288; ++D) Et[D] = 8;
  Mn = new ke(32);
  for (D = 0; D < 32; ++D) Mn[D] = 5;
  ((Go = sn(Et, 9, 0)),
    (Yo = sn(Mn, 5, 0)),
    (Vo = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data",
    ]),
    (Zo = new _r([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632])),
    (Ui = new ke(0)),
    (Qo = (function () {
      var e = new Int32Array(256);
      for (var t = 0; t < 256; ++t) {
        var n = t,
          i = 9;
        while (--i) n = (n & 1 && -306674912) ^ (n >>> 1);
        e[t] = n;
      }
      return e;
    })()));
  ((zi = typeof TextEncoder < "u" && new TextEncoder()),
    (na = typeof TextDecoder < "u" && new TextDecoder()));
  try {
    (na.decode(Ui, { stream: !0 }), (ra = 1));
  } catch (e) {}
});