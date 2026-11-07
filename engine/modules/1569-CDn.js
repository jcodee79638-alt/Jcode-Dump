
var CDn = Ie(function (nWH, PDn) {
  var jDn = cr("path"),
    bDn = IDn(),
    R_t = DDn(),
    gQs = vDn(),
    EQs = /\.(?:com|exe)$/i,
    IQs = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function DQs(e) {
    e.file = bDn(e);
    let t = e.file && gQs(e.file);
    if (t) return (e.args.unshift(e.file), (e.command = t), bDn(e));
    return e.file;
  }
  function yQs(e) {
    let t = DQs(e),
      r = !EQs.test(t);
    if (e.options.forceShell || r) {
      let s = IQs.test(t);
      ((e.command = jDn.normalize(e.command)),
        (e.command = R_t.command(e.command)),
        (e.args = e.args.map((H) => R_t.argument(H, s))));
      let a = [e.command].concat(e.args).join(" ");
      ((e.args = ["/d", "/s", "/c", `"${a}"`]),
        (e.command = process.env.comspec || "cmd.exe"),
        (e.options.windowsVerbatimArguments = !0));
    }
    return e;
  }
  function MQs(e, t, r) {
    if (t && !Array.isArray(t)) ((r = t), (t = null));
    ((t = t ? t.slice(0) : []), (r = Object.assign({}, r)));
    let s = { command: e, args: t, options: r, file: void 0, original: { command: e, args: t } };
    return r.shell ? s : yQs(s);
  }
  PDn.exports = MQs;
});