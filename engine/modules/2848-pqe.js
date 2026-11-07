
var pqe = Ie(function (NLc, ghi) {
  var Ena = ky(),
    Ina = eX(),
    Dna = (e, t, r, s = !1) => {
      if (!e) return null;
      try {
        let a = { noCommittish: !1 },
          { fetchSpec: H, saveSpec: u, type: f, hosted: d, rawSpec: _, raw: L } = Ena(e, t);
        if (f === "file" || f === "directory") {
          if (s && r) return `file:${Ina(r, H)}`;
          return `file:${H}`;
        }
        if (d) return `git+${d.auth ? d.https(a) : d.sshurl(a)}`;
        if (f === "git") return u;
        if (_ === "*") return L;
        return _;
      } catch (a) {
        return e;
      }
    };
  ghi.exports = Dna;
});