
var Y6n = Ie(function (z6n) {
  Object.defineProperty(z6n, "__esModule", { value: !0 });
  z6n.validateValue = z6n.validateKey = void 0;
  var FHr = "[_0-9a-z-*/]",
    Rho = `[a-z]${FHr}{0,255}`,
    Who = `[a-z0-9]${FHr}{0,240}@[a-z]${FHr}{0,13}`,
    Vho = new RegExp(`^(?:${Rho}|${Who})$`),
    qho = /^[ -~]{0,255}[!-~]$/,
    Gho = /,|=/;
  function Xho(e) {
    return Vho.test(e);
  }
  z6n.validateKey = Xho;
  function Jho(e) {
    return qho.test(e) && !Gho.test(e);
  }
  z6n.validateValue = Jho;
});