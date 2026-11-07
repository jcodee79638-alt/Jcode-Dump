
var m7n = Ie(function (p7n) {
  Object.defineProperty(p7n, "__esModule", { value: !0 });
  p7n.getMachineId = void 0;
  var l7n = cr("fs"),
    f7n = Cgt(),
    wgt = kf();
  async function wbo() {
    try {
      return (await l7n.promises.readFile("/etc/hostid", { encoding: "utf8" })).trim();
    } catch (e) {
      wgt.diag.debug(`error reading machine id: ${e}`);
    }
    try {
      return (await f7n.execAsync("kenv -q smbios.system.uuid")).stdout.trim();
    } catch (e) {
      wgt.diag.debug(`error reading machine id: ${e}`);
    }
    return;
  }
  p7n.getMachineId = wbo;
});