
var dli = Ie(function (fli) {
  Object.defineProperty(fli, "__esModule", { value: !0 });
  fli.TSAWitness = void 0;
  var uli = Ali();
  class lli {
    tsa;
    constructor(e) {
      this.tsa = new uli.TSAClient({ tsaBaseURL: e.tsaBaseURL, retry: e.retry, timeout: e.timeout });
    }
    async testify(e) {
      let t = mKo(e);
      return { rfc3161Timestamps: [{ signedTimestamp: await this.tsa.createTimestamp(t) }] };
    }
  }
  fli.TSAWitness = lli;
  function mKo(e) {
    switch (e.$case) {
      case "dsseEnvelope":
        return e.dsseEnvelope.signatures[0].sig;
      case "messageSignature":
        return e.messageSignature.signature;
    }
  }
});