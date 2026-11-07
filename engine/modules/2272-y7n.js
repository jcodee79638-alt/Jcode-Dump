
var y7n = Ie(function (I7n) {
  Object.defineProperty(I7n, "__esModule", { value: !0 });
  I7n.getMachineId = void 0;
  var E7n = kf();
  async function Obo() {
    E7n.diag.debug("could not read machine-id: unsupported platform");
    return;
  }
  I7n.getMachineId = Obo;
});