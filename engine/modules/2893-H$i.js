
var H$i = Ie(function (T$c, a$i) {
  a$i.exports = { diff: EHa, jsonPatchPathConverter: IHa };
  function EHa(e, t, r) {
    if (!e || typeof e != "object" || !t || typeof t != "object")
      throw Error("both arguments must be objects or arrays");
    r ||
      (r = function (f) {
        return f;
      });
    function s({ obj1: f, obj2: d, basePath: _, basePathForRemoves: L, diffs: I }) {
      var D = Object.keys(f),
        S = D.length,
        T = Object.keys(d),
        C = T.length,
        O,
        B = f.length - d.length;
      if (yHa(f, d)) {
        for (var V = 0; V < S; V++) {
          var q = Array.isArray(f) ? Number(D[V]) : D[V];
          if (!(q in d)) ((O = L.concat(q)), I.remove.push({ op: "remove", path: r(O) }));
        }
        for (var V = 0; V < C; V++) {
          var q = Array.isArray(d) ? Number(T[V]) : T[V];
          H({ key: q, obj1: f, obj2: d, path: _.concat(q), pathForRemoves: _.concat(q), diffs: I });
        }
      } else {
        for (var V = 0; V < B; V++) ((O = L.concat(V)), I.remove.push({ op: "remove", path: r(O) }));
        var Z = f.slice(B);
        for (var V = 0; V < C; V++)
          H({ key: V, obj1: Z, obj2: d, path: _.concat(V), pathForRemoves: _.concat(V + B), diffs: I });
      }
    }
    var a = { remove: [], replace: [], add: [] };
    return (
      s({ obj1: e, obj2: t, basePath: [], basePathForRemoves: [], diffs: a }),
      a.remove.reverse().concat(a.replace).concat(a.add)
    );
    function H({ key: f, obj1: d, obj2: _, path: L, pathForRemoves: I, diffs: D }) {
      var S = d[f],
        T = _[f];
      if (!(f in d) && f in _) {
        var C = T;
        D.add.push({ op: "add", path: r(L), value: C });
      } else if (S !== T)
        if (Object(S) !== S || Object(T) !== T || DHa(S, T)) u(L, D, T);
        else if (!Object.keys(S).length && !Object.keys(T).length && String(S) != String(T)) u(L, D, T);
        else s({ obj1: d[f], obj2: _[f], basePath: L, basePathForRemoves: I, diffs: D });
    }
    function u(f, d, _) {
      d.replace.push({ op: "replace", path: r(f), value: _ });
    }
  }
  function IHa(e) {
    return [""].concat(e).join("/");
  }
  function DHa(e, t) {
    return Object.prototype.toString.call(e) != Object.prototype.toString.call(t);
  }
  function yHa(e, t) {
    var r = e.length - t.length;
    if (Array.isArray(e) && Array.isArray(t) && r > 0) {
      var s = 0,
        a = 0;
      for (var H = 0; H < t.length; H++)
        if (String(e[H]) === String(t[H])) s++;
        else break;
      for (var u = t.length; u > 0; u--)
        if (String(e[u + r]) === String(t[u])) a++;
        else break;
      return s >= a;
    }
    return !0;
  }
});