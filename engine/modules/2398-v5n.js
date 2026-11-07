
var v5n = ne(() => {
  S5n = Tl(bD());
  TPo = typeof BigInt < "u" ? SPo : S5n.hrTimeToNanoseconds;
  T5n = {
    encodeHrTime: TPo,
    encodeSpanContext: x5n,
    encodeOptionalSpanContext: x5n,
    encodeUint8Array: (e) => {
      if (typeof Buffer < "u") return Buffer.from(e).toString("base64");
      let t = Array(e.length);
      for (let r = 0; r < e.length; r++) t[r] = String.fromCharCode(e[r]);
      return btoa(t.join(""));
    },
  };
});