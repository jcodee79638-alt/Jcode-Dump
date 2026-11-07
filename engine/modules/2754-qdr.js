
var qdr = Ie(function (afi) {
  Object.defineProperty(afi, "__esModule", { value: !0 });
  afi.Signature = void 0;
  class Vdr {
    keyID;
    sig;
    constructor(e) {
      let { keyID: t, sig: r } = e;
      ((this.keyID = t), (this.sig = r));
    }
    toJSON() {
      return { keyid: this.keyID, sig: this.sig };
    }
    static fromJSON(e) {
      let { keyid: t, sig: r } = e;
      if (typeof t !== "string") throw TypeError("keyid must be a string");
      if (typeof r !== "string") throw TypeError("sig must be a string");
      return new Vdr({ keyID: t, sig: r });
    }
  }
  afi.Signature = Vdr;
});