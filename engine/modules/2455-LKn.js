
var LKn = Ie(function (vAc, hKn) {
  var bwo = [].concat(dKn()).concat(mKn()),
    jwo = _Kn();
  hKn.exports = function (e) {
    var t = 0;
    function r() {
      return t < e.length;
    }
    function s(T) {
      if (T instanceof RegExp) {
        var C = e.slice(t),
          O = C.match(T);
        if (O) return ((t += O[0].length), O[0]);
      } else if (e.indexOf(T, t) === t) return ((t += T.length), T);
    }
    function a() {
      s(/[ ]*/);
    }
    function H() {
      var T,
        C = [/^WITH/i, /^AND/i, /^OR/i, "(", ")", ":", "+"];
      for (var O = 0; O < C.length; O++) if (((T = s(C[O])), T)) break;
      if (T === "+" && t > 1 && e[t - 2] === " ") throw Error("Space before `+`");
      return T && { type: "OPERATOR", string: T.toUpperCase() };
    }
    function u() {
      return s(/[A-Za-z0-9-.]+/);
    }
    function f() {
      var T = u();
      if (!T) throw Error("Expected idstring at offset " + t);
      return T;
    }
    function d() {
      if (s("DocumentRef-")) {
        var T = f();
        return { type: "DOCUMENTREF", string: T };
      }
    }
    function _() {
      if (s("LicenseRef-")) {
        var T = f();
        return { type: "LICENSEREF", string: T };
      }
    }
    function L() {
      var T = t,
        C = u();
      if (bwo.indexOf(C) !== -1) return { type: "LICENSE", string: C };
      else if (jwo.indexOf(C) !== -1) return { type: "EXCEPTION", string: C };
      t = T;
    }
    function I() {
      return H() || d() || _() || L();
    }
    var D = [];
    while (r()) {
      if ((a(), !r())) break;
      var S = I();
      if (!S) throw Error("Unexpected `" + e[t] + "` at offset " + t);
      D.push(S);
    }
    return D;
  };
});