
var Uar = Ie(function (gec, SPn) {
  var xPn = cr("url"),
    Oar = (e, t, r) => {
      let s = e.indexOf(r);
      return e.lastIndexOf(t, s > -1 ? s : 1 / 0);
    },
    MPn = (e) => {
      try {
        return new xPn.URL(e);
      } catch {}
    },
    Xfo = (e, t) => {
      let r = e.indexOf(":"),
        s = e.slice(0, r + 1);
      if (Object.prototype.hasOwnProperty.call(t, s)) return e;
      if (e.substr(r, 3) === "://") return e;
      let a = e.indexOf("@");
      if (a > -1)
        if (a > r) return `git+ssh://${e}`;
        else return e;
      return `${e.slice(0, r + 1)}//${e.slice(r + 1)}`;
    },
    Jfo = (e) => {
      let t = Oar(e, "@", "#"),
        r = Oar(e, ":", "#");
      if (r > t) e = e.slice(0, r) + "/" + e.slice(r + 1);
      if (Oar(e, ":", "#") === -1 && e.indexOf("//") === -1) e = `git+ssh://${e}`;
      return e;
    };
  SPn.exports = (e, t) => {
    let r = t ? Xfo(e, t) : e;
    return MPn(r) || MPn(Jfo(r));
  };
});