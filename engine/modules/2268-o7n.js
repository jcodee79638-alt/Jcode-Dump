
var o7n = Ie(function (i7n) {
  Object.defineProperty(i7n, "__esModule", { value: !0 });
  i7n.getMachineId = void 0;
  var r7n = Cgt(),
    n7n = kf();
  async function Pbo() {
    try {
      let t = (await r7n.execAsync('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout
        .split(
          `
`,
        )
        .find((s) => s.includes("IOPlatformUUID"));
      if (!t) return;
      let r = t.split('" = "');
      if (r.length === 2) return r[1].slice(0, -1);
    } catch (e) {
      n7n.diag.debug(`error reading machine id: ${e}`);
    }
    return;
  }
  i7n.getMachineId = Pbo;
});