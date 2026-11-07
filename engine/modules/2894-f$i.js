
var f$i = Ie(function (v$c, l$i) {
  l$i.exports = { diffApply: xHa, jsonPatchPathConverter: SHa };
  var c$i = "remove",
    A$i = "replace",
    MHa = "add",
    Sqe = "move";
  function xHa(e, t, r) {
    if (!e || typeof e != "object") throw Error("base object must be an object or an array");
    if (!Array.isArray(t)) throw Error("diff must be an array");
    var s = t.length;
    for (var a = 0; a < s; a++) {
      var H = t[a],
        u = e,
        f = H.op,
        d = u$i(r, H.path),
        _ = H.from && u$i(r, H.from),
        L,
        I,
        D,
        S,
        T;
      if (_) {
        if (((L = d), (d = _), (I = L.slice()), (D = I.pop()), w1t(D), D == null)) return !1;
        var C;
        while ((C = I.shift()) != null) {
          if ((w1t(C), !(C in S))) S[C] = {};
          S = S[C];
        }
      }
      var O = d.slice(),
        B = O.pop();
      if ((w1t(B), B == null)) return !1;
      var V;
      while ((V = O.shift()) != null) {
        if ((w1t(V), !(V in u))) u[V] = {};
        u = u[V];
      }
      if (f === c$i || f === A$i || f === Sqe) {
        var q = f === Sqe ? H.from : H.path;
        if (!u.hasOwnProperty(B)) throw Error(["expected to find property", q, "in object", e].join(" "));
      }
      if (f === c$i || f === Sqe) {
        if (f === Sqe) T = u[B];
        Array.isArray(u) ? u.splice(B, 1) : delete u[B];
      }
      if (f === A$i || f === MHa) u[B] = H.value;
      if (f === Sqe) u[D] = T;
    }
    return u;
  }
  function u$i(e, t) {
    if (e) {
      if (((t = e(t)), !Array.isArray(t)))
        throw Error(["pathConverter must return an array, returned:", t].join(" "));
    } else if (!Array.isArray(t))
      throw Error(["diff path", t, "must be an array, consider supplying a path converter"].join(" "));
    return t;
  }
  function SHa(e) {
    return e.split("/").slice(1);
  }
  function w1t(e) {
    if (e == "__proto__" || e == "constructor" || e == "prototype")
      throw Error("setting of prototype values not supported");
  }
});