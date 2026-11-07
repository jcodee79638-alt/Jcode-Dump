
var Eme = Ie(function (yYH, tbn) {
  var ebn = gme(),
    f$t = bxe(),
    Vco = ix();
  function uar(e, t, r) {
    var s = [];
    return (
      e.include.forEach(function (a) {
        r = uar(a, t, r);
      }),
      e[t].forEach(function (a) {
        (r.forEach(function (H, u) {
          if (H.tag === a.tag && H.kind === a.kind) s.push(u);
        }),
          r.push(a));
      }),
      r.filter(function (a, H) {
        return s.indexOf(H) === -1;
      })
    );
  }
  function qco() {
    var e = { scalar: {}, sequence: {}, mapping: {}, fallback: {} },
      t,
      r;
    function s(a) {
      e[a.kind][a.tag] = e.fallback[a.tag] = a;
    }
    for (t = 0, r = arguments.length; t < r; t += 1) arguments[t].forEach(s);
    return e;
  }
  function jxe(e) {
    ((this.include = e.include || []),
      (this.implicit = e.implicit || []),
      (this.explicit = e.explicit || []),
      this.implicit.forEach(function (t) {
        if (t.loadKind && t.loadKind !== "scalar")
          throw new f$t(
            "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.",
          );
      }),
      (this.compiledImplicit = uar(this, "implicit", [])),
      (this.compiledExplicit = uar(this, "explicit", [])),
      (this.compiledTypeMap = qco(this.compiledImplicit, this.compiledExplicit)));
  }
  jxe.DEFAULT = null;
  jxe.create = function () {
    var t, r;
    switch (arguments.length) {
      case 1:
        ((t = jxe.DEFAULT), (r = arguments[0]));
        break;
      case 2:
        ((t = arguments[0]), (r = arguments[1]));
        break;
      default:
        throw new f$t("Wrong number of arguments for Schema.create function");
    }
    if (
      ((t = ebn.toArray(t)),
      (r = ebn.toArray(r)),
      !t.every(function (s) {
        return s instanceof jxe;
      }))
    )
      throw new f$t(
        "Specified list of super schemas (or a single Schema object) contains a non-Schema object.",
      );
    if (
      !r.every(function (s) {
        return s instanceof Vco;
      })
    )
      throw new f$t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    return new jxe({ include: t, explicit: r });
  };
  tbn.exports = jxe;
});