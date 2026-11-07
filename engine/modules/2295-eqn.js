
var eqn = Ie(function (Y4n) {
  Object.defineProperty(Y4n, "__esModule", { value: !0 });
  Y4n.RandomIdGenerator = void 0;
  var ajo = 8,
    z4n = 16;
  class Q4n {
    generateTraceId = K4n(z4n);
    generateSpanId = K4n(ajo);
  }
  Y4n.RandomIdGenerator = Q4n;
  var Qgt = Buffer.allocUnsafe(z4n);
  function K4n(e) {
    return function () {
      for (let r = 0; r < e / 4; r++) Qgt.writeUInt32BE((Math.random() * 4294967296) >>> 0, r * 4);
      for (let r = 0; r < e; r++)
        if (Qgt[r] > 0) break;
        else if (r === e - 1) Qgt[e - 1] = 1;
      return Qgt.toString("hex", 0, e);
    };
  }
});