
var g7n = Ie(function (L7n) {
  Object.defineProperty(L7n, "__esModule", { value: !0 });
  L7n.getMachineId = void 0;
  var kgt = cr("process"),
    _7n = Cgt(),
    h7n = kf();
  async function kbo() {
    let t = "%windir%\\System32\\REG.exe";
    if (kgt.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in kgt.env)
      t = "%windir%\\sysnative\\cmd.exe /c " + t;
    try {
      let s = (
        await _7n.execAsync(`${t} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`)
      ).stdout.split("REG_SZ");
      if (s.length === 2) return s[1].trim();
    } catch (r) {
      h7n.diag.debug(`error reading machine id: ${r}`);
    }
    return;
  }
  L7n.getMachineId = kbo;
});