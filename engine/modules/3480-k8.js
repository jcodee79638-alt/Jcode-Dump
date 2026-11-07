
var k8 = ne(() => {
  yhe();
  Lvi = Symbol("evaluating");
  K0r = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
  Svi = ZGe(() => {
    if (O8.jitless) return !1;
    if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
    try {
      return (new Function(""), !0);
    } catch (e) {
      return !1;
    }
  });
  Tvi = new Set(["string", "number", "symbol"]);
  ((MSt = (() => ({
    safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    int32: [-2147483648, 2147483647],
    uint32: [0, 4294967295],
    float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
    float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
  }))()),
    (Y0r = {
      int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
      uint64: [BigInt(0), BigInt("18446744073709551615")],
    }));
  lDa = /[\uD800-\uDBFF]/;
  dDa = {
    configurable: !0,
    get() {
      fHe = !0;
      return;
    },
  };
});