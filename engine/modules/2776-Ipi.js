
var Ipi = Ie(function (gpi) {
  Object.defineProperty(gpi, "__esModule", { value: !0 });
  gpi.DSSESignatureContent = void 0;
  var z5 = L8();
  class $pi {
    env;
    constructor(e) {
      this.env = e;
    }
    compareDigest(e) {
      return z5.crypto.bufferEqual(e, z5.crypto.digest("sha256", this.env.payload));
    }
    compareSignature(e) {
      return z5.crypto.bufferEqual(e, this.signature);
    }
    verifySignature(e) {
      return z5.crypto.verify(this.preAuthEncoding, e, this.signature);
    }
    get signature() {
      return this.env.signatures.length > 0 ? this.env.signatures[0].sig : Buffer.from("");
    }
    get preAuthEncoding() {
      return z5.dsse.preAuthEncoding(this.env.payloadType, this.env.payload);
    }
  }
  gpi.DSSESignatureContent = $pi;
});