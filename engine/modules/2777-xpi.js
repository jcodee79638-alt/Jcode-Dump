
var xpi = Ie(function (ypi) {
  Object.defineProperty(ypi, "__esModule", { value: !0 });
  ypi.MessageSignatureContent = void 0;
  var Hve = L8(),
    EB = _Z(),
    sYo = {
      [EB.HashAlgorithm.HASH_ALGORITHM_UNSPECIFIED]: "sha256",
      [EB.HashAlgorithm.SHA2_256]: "sha256",
      [EB.HashAlgorithm.SHA2_384]: "sha384",
      [EB.HashAlgorithm.SHA2_512]: "sha512",
      [EB.HashAlgorithm.SHA3_256]: "sha3-256",
      [EB.HashAlgorithm.SHA3_384]: "sha3-384",
    };
  class Dpi {
    signature;
    messageDigest;
    artifact;
    hashAlgorithm;
    constructor(e, t) {
      ((this.signature = e.signature),
        (this.messageDigest = e.messageDigest.digest),
        (this.artifact = t),
        (this.hashAlgorithm = sYo[e.messageDigest.algorithm] ?? "sha256"));
    }
    compareSignature(e) {
      return Hve.crypto.bufferEqual(e, this.signature);
    }
    compareDigest(e) {
      return Hve.crypto.bufferEqual(e, this.messageDigest);
    }
    verifySignature(e) {
      return Hve.crypto.verify(this.artifact, e, this.signature, this.hashAlgorithm);
    }
  }
  ypi.MessageSignatureContent = Dpi;
});