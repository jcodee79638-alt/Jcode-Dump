
var Gmr = Ie(function (_Lc, m_i) {
  var Wmr = cr("fs"),
    { promisify: Pta } = cr("util"),
    { readFileSync: Cta } = Wmr,
    wta = Pta(Wmr.readFile),
    d_i = (e, t) => {
      if (/[.]cmd$/.test(e)) return Ota(t);
      else if (/[.]ps1$/.test(e)) return kta(t);
      else return Uta(t);
    },
    kta = (e) => {
      let t = e.match(/"[$]basedir[/]([^"]+?)"\s+[$]args/);
      return t && t[1];
    },
    Ota = (e) => {
      let t = e.match(/"%(?:~dp0|dp0%)\\([^"]+?)"\s+%[*]/);
      return t && t[1];
    },
    Uta = (e) => {
      let t = e.match(/"[$]basedir[/]([^"]+?)"\s+"[$]@"/);
      return t && t[1];
    },
    Nta = (e, t) => ((t.message = e.message), (t.code = e.code), (t.path = e.path), t),
    Vmr = (e, t) => {
      if (!t) ((t = Error()), Error.captureStackTrace(t, Vmr));
      return (
        (t.code = "ENOTASHIM"),
        (t.message = `Can't read shim path from '${e}', it doesn't appear to be a cmd-shim`),
        t
      );
    },
    qmr = (e) => {
      let t = Error();
      return (
        Error.captureStackTrace(t, qmr),
        wta(e).then(
          (r) => {
            let s = d_i(e, r.toString());
            if (s) return s;
            throw Vmr(e, t);
          },
          (r) => {
            throw Nta(r, t);
          },
        )
      );
    },
    Fta = (e) => {
      let t = Cta(e),
        r = d_i(e, t.toString());
      if (!r) throw Vmr(e);
      return r;
    };
  qmr.sync = Fta;
  m_i.exports = qmr;
});