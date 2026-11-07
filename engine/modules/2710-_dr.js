
var _dr = Ie(function (mAi) {
  Object.defineProperty(mAi, "__esModule", { value: !0 });
  mAi.BaseBundleBuilder = void 0;
  class dAi {
    signer;
    witnesses;
    constructor(e) {
      ((this.signer = e.signer), (this.witnesses = e.witnesses));
    }
    async create(e) {
      let t = await this.prepare(e).then((u) => this.signer.sign(u)),
        r = await this.package(e, t),
        s = await Promise.all(this.witnesses.map((u) => u.testify(r.content, EJo(t.key)))),
        a = [],
        H = [];
      return (
        s.forEach(({ tlogEntries: u, rfc3161Timestamps: f }) => {
          (a.push(...(u ?? [])), H.push(...(f ?? [])));
        }),
        (r.verificationMaterial.tlogEntries = a),
        (r.verificationMaterial.timestampVerificationData = { rfc3161Timestamps: H }),
        r
      );
    }
    async prepare(e) {
      return e.data;
    }
  }
  mAi.BaseBundleBuilder = dAi;
  function EJo(e) {
    switch (e.$case) {
      case "publicKey":
        return e.publicKey;
      case "x509Certificate":
        return e.certificate;
    }
  }
});