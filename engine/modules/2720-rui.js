
var rui = Ie(function (eui) {
  Object.defineProperty(eui, "__esModule", { value: !0 });
  eui.EphemeralSigner = void 0;
  var FDt = cr("crypto"),
    GJo = "ec",
    XJo = "P-256";
  class ZAi {
    keypair;
    constructor() {
      this.keypair = FDt.generateKeyPairSync(GJo, { namedCurve: XJo });
    }
    async sign(e) {
      let t = FDt.sign("sha256", e, this.keypair.privateKey),
        r = this.keypair.publicKey.export({ format: "pem", type: "spki" }).toString("ascii");
      return { signature: t, key: { $case: "publicKey", publicKey: r } };
    }
  }
  eui.EphemeralSigner = ZAi;
});