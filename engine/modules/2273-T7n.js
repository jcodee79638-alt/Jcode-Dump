
var T7n = Ie(function (x7n) {
  Object.defineProperty(x7n, "__esModule", { value: !0 });
  x7n.getMachineId = void 0;
  var M7n = cr("process"),
    Ome;
  async function Ubo() {
    if (!Ome)
      switch (M7n.platform) {
        case "darwin":
          Ome = (await Promise.resolve().then(() => Tl(o7n()))).getMachineId;
          break;
        case "linux":
          Ome = (await Promise.resolve().then(() => Tl(u7n()))).getMachineId;
          break;
        case "freebsd":
          Ome = (await Promise.resolve().then(() => Tl(m7n()))).getMachineId;
          break;
        case "win32":
          Ome = (await Promise.resolve().then(() => Tl(g7n()))).getMachineId;
          break;
        default:
          Ome = (await Promise.resolve().then(() => Tl(y7n()))).getMachineId;
          break;
      }
    return Ome();
  }
  x7n.getMachineId = Ubo;
});