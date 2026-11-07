
var yWn = Ie(function (IWn) {
  Object.defineProperty(IWn, "__esModule", { value: !0 });
  IWn.validateValue = IWn.validateKey = void 0;
  var Hcr = "[_0-9a-z-*/]",
    FTo = `[a-z]${Hcr}{0,255}`,
    BTo = `[a-z0-9]${Hcr}{0,240}@[a-z]${Hcr}{0,13}`,
    RTo = new RegExp(`^(?:${FTo}|${BTo})$`),
    WTo = /^[ -~]{0,255}[!-~]$/,
    VTo = /,|=/;
  function qTo(e) {
    return RTo.test(e);
  }
  IWn.validateKey = qTo;
  function GTo(e) {
    return WTo.test(e) && !VTo.test(e);
  }
  IWn.validateValue = GTo;
});