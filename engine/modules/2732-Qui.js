
var Qui = Ie(function (Kui) {
  Object.defineProperty(Kui, "__esModule", { value: !0 });
  Kui.RekorWitness = Kui.DEFAULT_REKOR_URL = void 0;
  var Xui = Hae(),
    zDt = Wui(),
    QDt = Gui();
  Kui.DEFAULT_REKOR_URL = "https://rekor.sigstore.dev";
  class Jui {
    tlogV1;
    tlogV2;
    entryType;
    majorApiVersion;
    constructor(e) {
      ((this.entryType = e.entryType),
        (this.majorApiVersion = e.majorApiVersion || 1),
        (this.tlogV1 = new zDt.TLogClient({ ...e, rekorBaseURL: e.rekorBaseURL || Kui.DEFAULT_REKOR_URL })),
        (this.tlogV2 = new zDt.TLogV2Client({
          ...e,
          rekorBaseURL: e.rekorBaseURL || Kui.DEFAULT_REKOR_URL,
        })));
    }
    async testify(e, t) {
      let r;
      if (this.majorApiVersion === 2) {
        let s = QDt.toCreateEntryRequest(e, t);
        r = await this.tlogV2.createEntry(s);
      } else {
        let s = QDt.toProposedEntry(e, t, this.entryType),
          a = await this.tlogV1.createEntry(s);
        r = fKo(a);
      }
      return { tlogEntries: [r] };
    }
  }
  Kui.RekorWitness = Jui;
  function fKo(e) {
    let t = Buffer.from(e.logID, "hex"),
      r = Xui.encoding.base64Decode(e.body),
      s = JSON.parse(r),
      a = e?.verification?.signedEntryTimestamp ? pKo(e.verification.signedEntryTimestamp) : void 0,
      H = e?.verification?.inclusionProof ? dKo(e.verification.inclusionProof) : void 0;
    return {
      logIndex: e.logIndex.toString(),
      logId: { keyId: t },
      integratedTime: e.integratedTime.toString(),
      kindVersion: { kind: s.kind, version: s.apiVersion },
      inclusionPromise: a,
      inclusionProof: H,
      canonicalizedBody: Buffer.from(e.body, "base64"),
    };
  }
  function pKo(e) {
    return { signedEntryTimestamp: Buffer.from(e, "base64") };
  }
  function dKo(e) {
    return {
      logIndex: e.logIndex.toString(),
      treeSize: e.treeSize.toString(),
      rootHash: Buffer.from(e.rootHash, "hex"),
      hashes: e.hashes.map((t) => Buffer.from(t, "hex")),
      checkpoint: { envelope: e.checkpoint },
    };
  }
});