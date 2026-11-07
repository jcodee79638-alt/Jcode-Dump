
var u7n = Ie(function (c7n) {
  Object.defineProperty(c7n, "__esModule", { value: !0 });
  c7n.getMachineId = void 0;
  var a7n = cr("fs"),
    H7n = kf();
  async function Cbo() {
    let e = ["/etc/machine-id", "/var/lib/dbus/machine-id"];
    for (let t of e)
      try {
        return (await a7n.promises.readFile(t, { encoding: "utf8" })).trim();
      } catch (r) {
        H7n.diag.debug(`error reading machine id: ${r}`);
      }
    return;
  }
  c7n.getMachineId = Cbo;
});