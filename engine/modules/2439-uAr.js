
var uAr = Ie(function (Fcc, IJn) {
  var EJn = (e) => {
      if (typeof e === "string")
        if (/^0o?[0-7]+$/.test(e)) return parseInt(e.replace(/^0o?/, ""), 8);
        else if (/^[1-9][0-9]*$/.test(e)) return parseInt(e, 10);
        else throw Error(`invalid umask value: ${e}`);
      else {
        if (typeof e !== "number") throw Error(`invalid umask value: ${e}`);
        if (((e = Math.floor(e)), e < 0 || e > 511)) throw Error(`invalid umask value: ${e}`);
        return e;
      }
    },
    BCo = (e, t, r) => {
      try {
        return ((e[t] = EJn(r)), !0);
      } catch (s) {
        return !1;
      }
    };
  IJn.exports = { parse: EJn, validate: BCo };
});