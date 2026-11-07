
var Ali = Ie(function (Hli) {
  Object.defineProperty(Hli, "__esModule", { value: !0 });
  Hli.TSAClient = void 0;
  var ili = kTe(),
    sli = rli(),
    oli = Hae(),
    nli = "sha256";
  class ali {
    tsa;
    constructor(e) {
      this.tsa = new sli.TimestampAuthority({ baseURL: e.tsaBaseURL, retry: e.retry, timeout: e.timeout });
    }
    async createTimestamp(e) {
      let t = { artifactHash: oli.crypto.digest(nli, e).toString("base64"), hashAlgorithm: nli };
      try {
        return await this.tsa.createTimestamp(t);
      } catch (r) {
        ili.internalError(r, "TSA_CREATE_TIMESTAMP_ERROR", "error creating timestamp");
      }
    }
  }
  Hli.TSAClient = ali;
});