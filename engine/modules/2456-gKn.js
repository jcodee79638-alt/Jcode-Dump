
var gKn = Ie(function (bAc, $Kn) {
  $Kn.exports = function (e) {
    var t = 0;
    function r() {
      return t < e.length;
    }
    function s() {
      return r() ? e[t] : null;
    }
    function a() {
      if (!r()) throw Error();
      t++;
    }
    function H(C) {
      var O = s();
      if (O && O.type === "OPERATOR" && C === O.string) return (a(), O.string);
    }
    function u() {
      if (H("WITH")) {
        var C = s();
        if (C && C.type === "EXCEPTION") return (a(), C.string);
        throw Error("Expected exception after `WITH`");
      }
    }
    function f() {
      var C = t,
        O = "",
        B = s();
      if (B.type === "DOCUMENTREF") {
        if ((a(), (O += "DocumentRef-" + B.string + ":"), !H(":")))
          throw Error("Expected `:` after `DocumentRef-...`");
      }
      if (((B = s()), B.type === "LICENSEREF")) return (a(), (O += "LicenseRef-" + B.string), { license: O });
      t = C;
    }
    function d() {
      var C = s();
      if (C && C.type === "LICENSE") {
        a();
        var O = { license: C.string };
        if (H("+")) O.plus = !0;
        var B = u();
        if (B) O.exception = B;
        return O;
      }
    }
    function _() {
      var C = H("(");
      if (!C) return;
      var O = S();
      if (!H(")")) throw Error("Expected `)`");
      return O;
    }
    function L() {
      return _() || f() || d();
    }
    function I(C, O) {
      return function B() {
        var V = O();
        if (!V) return;
        if (!H(C)) return V;
        var q = B();
        if (!q) throw Error("Expected expression");
        return { left: V, conjunction: C.toLowerCase(), right: q };
      };
    }
    var D = I("AND", L),
      S = I("OR", D),
      T = S();
    if (!T || r()) throw Error("Syntax error");
    return T;
  };
});