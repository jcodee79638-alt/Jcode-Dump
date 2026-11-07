
var ODn = Ie(function (iWH, kDn) {
  function pir(e, t) {
    return Object.assign(Error(`${t} ${e.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${t} ${e.command}`,
      path: e.command,
      spawnargs: e.args,
    });
  }
  function xQs(e, t) {
    let r = e.emit;
    e.emit = function (s, a) {
      if (s === "exit") {
        let H = wDn(a, t);
        if (H) return r.call(e, "error", H);
      }
      return r.apply(e, arguments);
    };
  }
  function wDn(e, t) {
    if (e === 1 && !t.file) return pir(t.original, "spawn");
    return null;
  }
  function SQs(e, t) {
    if (e === 1 && !t.file) return pir(t.original, "spawnSync");
    return null;
  }
  kDn.exports = { hookChildProcess: xQs, verifyENOENT: wDn, verifyENOENTSync: SQs, notFoundError: pir };
});