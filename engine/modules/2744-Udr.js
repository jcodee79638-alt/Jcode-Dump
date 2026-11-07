
var Udr = Ie(function (d_c, Fli) {
  function Odr(e) {
    let t = [];
    if (typeof e === "string") t.push(Nli(e));
    else if (typeof e === "boolean") t.push(JSON.stringify(e));
    else if (Number.isInteger(e)) t.push(JSON.stringify(e));
    else if (e === null) t.push(JSON.stringify(e));
    else if (Array.isArray(e)) {
      t.push("[");
      let r = !0;
      (e.forEach((s) => {
        if (!r) t.push(",");
        ((r = !1), t.push(Odr(s)));
      }),
        t.push("]"));
    } else if (typeof e === "object") {
      t.push("{");
      let r = !0;
      (Object.keys(e)
        .sort()
        .forEach((s) => {
          if (!r) t.push(",");
          ((r = !1), t.push(Nli(s)), t.push(":"), t.push(Odr(e[s])));
        }),
        t.push("}"));
    } else throw TypeError("cannot encode " + e.toString());
    return t.join("");
  }
  function Nli(e) {
    return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  }
  Fli.exports = { canonicalize: Odr };
});