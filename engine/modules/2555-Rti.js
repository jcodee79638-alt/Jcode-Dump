
var Rti = Ie(function (cfc, Bti) {
  var F2o = Fti(),
    { resolve: B2o } = cr("path"),
    YEt,
    R2o = (e) => {
      let {
        args: t,
        binPaths: r,
        cmd: s,
        env: a,
        event: H,
        nodeGyp: u,
        path: f,
        scriptShell: d = !0,
        stdio: _,
        stdioString: L,
      } = e;
      if (u) YEt = u;
      else if (a.npm_config_node_gyp) YEt = a.npm_config_node_gyp;
      else YEt = cr.resolve("node-gyp/bin/node-gyp.js");
      let D = {
        env: F2o(f, r, {
          ...process.env,
          ...a,
          npm_package_json: B2o(f, "package.json"),
          npm_lifecycle_event: H,
          npm_lifecycle_script: s,
          npm_config_node_gyp: YEt,
        }),
        stdioString: L,
        stdio: _,
        cwd: f,
        shell: d,
      };
      return [s, t, D];
    };
  Bti.exports = R2o;
});