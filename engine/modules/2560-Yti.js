
var Yti = Ie(function (dfc, Qti) {
  var z2o = Rti(),
    Q2o = j0t(),
    Y2o = Vti(),
    { isNodeGypPackage: Z2o, defaultGypInstallScript: eBo } = blr(),
    zti = Jti(),
    tBo = wlr(),
    rBo = async (e) => {
      let {
          args: t = [],
          binPaths: r = !1,
          env: s = {},
          event: a,
          nodeGyp: H,
          path: u,
          pkg: f,
          scriptShell: d,
          signalTimeout: _ = 500,
          stdio: L = "pipe",
          stdioString: I,
        } = e,
        { scripts: D = {}, gypfile: S } = f,
        T = null;
      if (e.cmd) T = e.cmd;
      else if (f.scripts && f.scripts[a]) T = f.scripts[a];
      else if (a === "install" && !D.install && !D.preinstall && S !== !1 && (await Z2o(u))) T = eBo;
      else if (a === "start" && (await tBo(u))) T = "node server.js";
      if (!T) return { code: 0, signal: null };
      let C = () => {};
      if (L === "inherit") {
        let Z;
        if (f._id)
          Z = `
> ${f._id} ${a}
`;
        else
          Z = `
> ${a}
`;
        if (
          ((Z += `> ${T.trim().replace(
            /\n/g,
            `
> `,
          )}`),
          t.length)
        )
          Z += ` ${t.join(" ")}`;
        Z += `
`;
        let { output: se, input: ae } = mg();
        (se.standard(Z), (C = ae.start()));
      }
      let [O, B, V] = z2o({
          args: t,
          binPaths: r,
          cmd: T,
          env: { ...s, ...Y2o(f) },
          event: a,
          nodeGyp: H,
          path: u,
          scriptShell: d,
          stdio: L,
          stdioString: I,
        }),
        q = Q2o(O, B, V, { event: a, script: T, pkgid: f._id, path: u });
      if (L === "inherit") zti.add(q.process);
      if (q.stdin) q.stdin.end();
      return q
        .catch((Z) => {
          let { signal: se } = Z;
          if (L === "inherit" && se)
            return (process.kill(process.pid, se), new Promise((ae, z) => setTimeout(() => z(Z), _)));
          else throw Z;
        })
        .finally(C);
    };
  Qti.exports = rBo;
});