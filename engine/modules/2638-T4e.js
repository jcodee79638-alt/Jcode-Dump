
var T4e = Ie(function (ooi) {
  Object.defineProperty(ooi, "__esModule", { value: !0 });
  ooi.AddressError = void 0;
  class soi extends Error {
    constructor(e, t) {
      super(e);
      ((this.name = "AddressError"), (this.parseMessage = t));
    }
  }
  ooi.AddressError = soi;
});