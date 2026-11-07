
var Rdi = Ie(function (Bdi) {
  Object.defineProperty(Bdi, "__esModule", { value: !0 });
  Bdi.DEFAULT_TIMEOUT = Bdi.DEFAULT_RETRY = void 0;
  Bdi.createBundleBuilder = kZo;
  Bdi.createKeyFinder = OZo;
  Bdi.createVerificationPolicy = UZo;
  var Ndi = L8(),
    DB = wdr(),
    Fdi = Byt();
  Bdi.DEFAULT_RETRY = { retries: 2 };
  Bdi.DEFAULT_TIMEOUT = 5000;
  function kZo(e, t) {
    let r = { signer: NZo(t), witnesses: BZo(t) };
    switch (e) {
      case "messageSignature":
        return new DB.MessageSignatureBundleBuilder(r);
      case "dsseEnvelope":
        return new DB.DSSEBundleBuilder({ ...r, certificateChain: t.legacyCompatibility });
    }
  }
  function OZo(e) {
    return (t) => {
      let r = e(t);
      if (!r) throw new Fdi.VerificationError({ code: "PUBLIC_KEY_ERROR", message: `key not found: ${t}` });
      return { publicKey: Ndi.crypto.createPublicKey(r), validFor: () => !0 };
    };
  }
  function UZo(e) {
    let t = {},
      r = e.certificateIdentityEmail || e.certificateIdentityURI;
    if (r) t.subjectAlternativeName = r;
    if (e.certificateIssuer) t.extensions = { issuer: e.certificateIssuer };
    if (e.certificateOIDs)
      t.oids = Object.entries(e.certificateOIDs).map(([s, a]) => ({
        oid: { id: s.split(".").map(Number) },
        value: Buffer.from(a),
      }));
    return t;
  }
  function NZo(e) {
    return new DB.FulcioSigner({
      fulcioBaseURL: e.fulcioURL,
      identityProvider: e.identityProvider || FZo(e),
      retry: e.retry ?? Bdi.DEFAULT_RETRY,
      timeout: e.timeout ?? Bdi.DEFAULT_TIMEOUT,
    });
  }
  function FZo(e) {
    let t = e.identityToken;
    if (t) return { getToken: () => Promise.resolve(t) };
    else return new DB.CIContextProvider("sigstore");
  }
  function BZo(e) {
    let t = [];
    if (RZo(e))
      t.push(
        new DB.RekorWitness({
          rekorBaseURL: e.rekorURL,
          entryType: e.legacyCompatibility ? "intoto" : "dsse",
          fetchOnConflict: !1,
          retry: e.retry ?? Bdi.DEFAULT_RETRY,
          timeout: e.timeout ?? Bdi.DEFAULT_TIMEOUT,
        }),
      );
    if (WZo(e))
      t.push(
        new DB.TSAWitness({
          tsaBaseURL: e.tsaServerURL,
          retry: e.retry ?? Bdi.DEFAULT_RETRY,
          timeout: e.timeout ?? Bdi.DEFAULT_TIMEOUT,
        }),
      );
    return t;
  }
  function RZo(e) {
    return e.tlogUpload !== !1;
  }
  function WZo(e) {
    return e.tsaServerURL !== void 0;
  }
});