
var Gui = Ie(function (qui) {
  Object.defineProperty(qui, "__esModule", { value: !0 });
  qui.toProposedEntry = nKo;
  qui.toCreateEntryRequest = HKo;
  var Vui = B4e(),
    KDt = _Z(),
    N1 = Hae(),
    J4e = "sha256";
  function nKo(e, t, r = "dsse") {
    switch (e.$case) {
      case "dsseEnvelope":
        if (r === "intoto") return oKo(e.dsseEnvelope, t);
        return sKo(e.dsseEnvelope, t);
      case "messageSignature":
        return iKo(e.messageSignature, t);
    }
  }
  function iKo(e, t) {
    let r = e.messageDigest.digest.toString("hex"),
      s = e.signature.toString("base64"),
      a = N1.encoding.base64Encode(t);
    return {
      apiVersion: "0.0.1",
      kind: "hashedrekord",
      spec: {
        data: { hash: { algorithm: J4e, value: r } },
        signature: { content: s, publicKey: { content: a } },
      },
    };
  }
  function sKo(e, t) {
    let r = JSON.stringify(Vui.envelopeToJSON(e)),
      s = N1.encoding.base64Encode(t);
    return { apiVersion: "0.0.1", kind: "dsse", spec: { proposedContent: { envelope: r, verifiers: [s] } } };
  }
  function oKo(e, t) {
    let r = N1.crypto.digest(J4e, e.payload).toString("hex"),
      s = aKo(e, t),
      a = N1.encoding.base64Encode(e.payload.toString("base64")),
      H = N1.encoding.base64Encode(e.signatures[0].sig.toString("base64")),
      u = e.signatures[0].keyid,
      f = N1.encoding.base64Encode(t),
      d = { payloadType: e.payloadType, payload: a, signatures: [{ sig: H, publicKey: f }] };
    if (u.length > 0) d.signatures[0].keyid = u;
    return {
      apiVersion: "0.0.2",
      kind: "intoto",
      spec: {
        content: {
          envelope: d,
          hash: { algorithm: J4e, value: s },
          payloadHash: { algorithm: J4e, value: r },
        },
      },
    };
  }
  function aKo(e, t) {
    let r = {
      payloadType: e.payloadType,
      payload: e.payload.toString("base64"),
      signatures: [{ sig: e.signatures[0].sig.toString("base64"), publicKey: t }],
    };
    if (e.signatures[0].keyid.length > 0) r.signatures[0].keyid = e.signatures[0].keyid;
    return N1.crypto.digest(J4e, N1.json.canonicalize(r)).toString("hex");
  }
  function HKo(e, t) {
    switch (e.$case) {
      case "dsseEnvelope":
        return cKo(e.dsseEnvelope, t);
      case "messageSignature":
        return AKo(e.messageSignature, t);
    }
  }
  function cKo(e, t) {
    return {
      spec: {
        $case: "dsseRequestV002",
        dsseRequestV002: {
          envelope: e,
          verifiers: [
            {
              keyDetails: KDt.PublicKeyDetails.PKIX_ECDSA_P256_SHA_256,
              verifier: { $case: "x509Certificate", x509Certificate: { rawBytes: N1.pem.toDER(t) } },
            },
          ],
        },
      },
    };
  }
  function AKo(e, t) {
    return {
      spec: {
        $case: "hashedRekordRequestV002",
        hashedRekordRequestV002: {
          digest: e.messageDigest.digest,
          signature: {
            content: e.signature,
            verifier: {
              keyDetails: KDt.PublicKeyDetails.PKIX_ECDSA_P256_SHA_256,
              verifier: { $case: "x509Certificate", x509Certificate: { rawBytes: N1.pem.toDER(t) } },
            },
          },
        },
      },
    };
  }
});