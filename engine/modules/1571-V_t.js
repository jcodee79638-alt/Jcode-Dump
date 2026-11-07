
var V_t = Ie(function (sWH, VMe) {
  var W_t = cr("child_process"),
    dir = CDn(),
    fWe = ODn();
  function UDn(e, t, r) {
    let s = dir(e, t, r),
      a = W_t.spawn(s.command, s.args, s.options);
    return (fWe.hookChildProcess(a, s), a);
  }
  function TQs(e, t, r) {
    let s = dir(e, t, r),
      a = W_t.spawnSync(s.command, s.args, s.options);
    return ((a.error = a.error || fWe.verifyENOENTSync(a.status, s)), a);
  }
  VMe.exports = UDn;
  VMe.exports.spawn = UDn;
  VMe.exports.sync = TQs;
  VMe.exports._parse = dir;
  VMe.exports._enoent = fWe;
});
import * as NDn from "child_process";
import { PassThrough as vQs } from "stream";