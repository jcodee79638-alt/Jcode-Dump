
var Fti = Ie(function (Hfc, Nti) {
  var __dirname =
      "C:\\Users\\Jac\\Desktop\\Jac Code\\node_modules\\.bun\\@npmcli+run-script@10.0.4\\node_modules\\@npmcli\\run-script\\lib",
    { log: k2o } = mg(),
    { resolve: Uti, dirname: O2o, delimiter: l4e } = cr("path"),
    U2o = Uti(__dirname, "../lib/node-gyp-bin"),
    N2o = (e, t, r) => {
      let s = Object.keys(r)
          .filter((d) => /^path$/i.test(d) && r[d])
          .map((d) => r[d].split(l4e))
          .reduce((d, _) => d.concat(_.filter((L) => !d.includes(L))), [])
          .join(l4e),
        a = [];
      if (t) {
        for (let d of t)
          if (d.includes(l4e)) {
            let _ = r.npm_lifecycle_event,
              L = _ ? `"${_}" script` : "script execution";
            k2o.warn("run-script", `Path contains delimiter ("${l4e}"), ${L} may not behave as expected.`);
          }
        a.push(...t);
      }
      let H = e,
        u;
      do (a.push(Uti(H, "node_modules", ".bin")), (u = H), (H = O2o(H)));
      while (H !== u);
      a.push(U2o, s);
      let f = a.join(l4e);
      for (let d of Object.keys(r)) if (/^path$/i.test(d)) r[d] = f;
      return r;
    };
  Nti.exports = N2o;
});