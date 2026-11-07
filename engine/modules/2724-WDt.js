
var WDt = Ie(function (Lui) {
  Object.defineProperty(Lui, "__esModule", { value: !0 });
  Lui.Signature = Lui.Verifier = Lui.PublicKey = void 0;
  var cae = dZ();
  Lui.PublicKey = {
    fromJSON(e) {
      return { rawBytes: UTe(e.rawBytes) ? Buffer.from(_ui(e.rawBytes)) : Buffer.alloc(0) };
    },
    toJSON(e) {
      let t = {};
      if (e.rawBytes.length !== 0) t.rawBytes = hui(e.rawBytes);
      return t;
    },
  };
  Lui.Verifier = {
    fromJSON(e) {
      return {
        verifier: UTe(e.publicKey)
          ? { $case: "publicKey", publicKey: Lui.PublicKey.fromJSON(e.publicKey) }
          : UTe(e.x509Certificate)
            ? { $case: "x509Certificate", x509Certificate: cae.X509Certificate.fromJSON(e.x509Certificate) }
            : void 0,
        keyDetails: UTe(e.keyDetails) ? cae.publicKeyDetailsFromJSON(e.keyDetails) : 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.verifier?.$case === "publicKey") t.publicKey = Lui.PublicKey.toJSON(e.verifier.publicKey);
      else if (e.verifier?.$case === "x509Certificate")
        t.x509Certificate = cae.X509Certificate.toJSON(e.verifier.x509Certificate);
      if (e.keyDetails !== 0) t.keyDetails = cae.publicKeyDetailsToJSON(e.keyDetails);
      return t;
    },
  };
  Lui.Signature = {
    fromJSON(e) {
      return {
        content: UTe(e.content) ? Buffer.from(_ui(e.content)) : Buffer.alloc(0),
        verifier: UTe(e.verifier) ? Lui.Verifier.fromJSON(e.verifier) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.content.length !== 0) t.content = hui(e.content);
      if (e.verifier !== void 0) t.verifier = Lui.Verifier.toJSON(e.verifier);
      return t;
    },
  };
  function _ui(e) {
    return Uint8Array.from(globalThis.Buffer.from(e, "base64"));
  }
  function hui(e) {
    return globalThis.Buffer.from(e).toString("base64");
  }
  function UTe(e) {
    return e !== null && e !== void 0;
  }
});