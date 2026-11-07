
var I$t = Ie(function (Flo) {
  var Fjn = Njn(),
    Bjn = $Ve();
  Flo.define = function (e, t, r) {
    Reflect.defineProperty(e, t, { enumerable: !1, configurable: !0, writable: !0, value: r });
  };
  Flo.isBuffer = function (e) {
    return Bjn(e) === "buffer";
  };
  Flo.isObject = function (e) {
    return Bjn(e) === "object";
  };
  Flo.toBuffer = function (e) {
    return typeof e === "string" ? Buffer.from(e) : e;
  };
  Flo.toString = function (e) {
    if (Flo.isBuffer(e)) return Fjn(String(e));
    if (typeof e !== "string") throw TypeError("expected input to be a string or buffer");
    return Fjn(e);
  };
  Flo.arrayify = function (e) {
    return e ? (Array.isArray(e) ? e : [e]) : [];
  };
  Flo.startsWith = function (e, t, r) {
    if (typeof r !== "number") r = t.length;
    return e.slice(0, r) === t;
  };
});