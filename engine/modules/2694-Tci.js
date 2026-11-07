
var Tci = Ie(function (Sci) {
  Object.defineProperty(Sci, "__esModule", { value: !0 });
  Sci.canonicalize = Hdr;
  function Hdr(e) {
    let t = "";
    if (e === null || typeof e !== "object" || e.toJSON != null) t += JSON.stringify(e);
    else if (Array.isArray(e)) {
      t += "[";
      let r = !0;
      (e.forEach((s) => {
        if (!r) t += ",";
        ((r = !1), (t += Hdr(s)));
      }),
        (t += "]"));
    } else {
      t += "{";
      let r = !0;
      (Object.keys(e)
        .sort()
        .forEach((s) => {
          if (!r) t += ",";
          ((r = !1), (t += JSON.stringify(s)), (t += ":"), (t += Hdr(e[s])));
        }),
        (t += "}"));
    }
    return t;
  }
});