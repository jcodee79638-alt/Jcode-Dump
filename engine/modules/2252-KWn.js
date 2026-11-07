
var KWn = Ie(function (XWn) {
  Object.defineProperty(XWn, "__esModule", { value: !0 });
  XWn.isPlainObject = void 0;
  var Hvo = "[object Object]",
    cvo = "[object Null]",
    Avo = "[object Undefined]",
    uvo = Function.prototype,
    WWn = uvo.toString,
    lvo = WWn.call(Object),
    { getPrototypeOf: fvo, prototype: VWn } = Object,
    qWn = VWn.hasOwnProperty,
    wme = Symbol ? Symbol.toStringTag : void 0,
    GWn = VWn.toString;
  function pvo(e) {
    if (!dvo(e) || mvo(e) !== Hvo) return !1;
    let t = fvo(e);
    if (t === null) return !0;
    let r = qWn.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && WWn.call(r) === lvo;
  }
  XWn.isPlainObject = pvo;
  function dvo(e) {
    return e != null && typeof e == "object";
  }
  function mvo(e) {
    if (e == null) return e === void 0 ? Avo : cvo;
    return wme && wme in Object(e) ? _vo(e) : hvo(e);
  }
  function _vo(e) {
    let t = qWn.call(e, wme),
      r = e[wme],
      s = !1;
    try {
      ((e[wme] = void 0), (s = !0));
    } catch {}
    let a = GWn.call(e);
    if (s)
      if (t) e[wme] = r;
      else delete e[wme];
    return a;
  }
  function hvo(e) {
    return GWn.call(e);
  }
});