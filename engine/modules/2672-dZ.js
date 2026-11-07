
var dZ = Ie(function (MHi) {
  Object.defineProperty(MHi, "__esModule", { value: !0 });
  MHi.TimeRange =
    MHi.X509CertificateChain =
    MHi.SubjectAlternativeName =
    MHi.X509Certificate =
    MHi.DistinguishedName =
    MHi.ObjectIdentifierValuePair =
    MHi.ObjectIdentifier =
    MHi.PublicKeyIdentifier =
    MHi.PublicKey =
    MHi.RFC3161SignedTimestamp =
    MHi.LogId =
    MHi.MessageSignature =
    MHi.HashOutput =
    MHi.SubjectAlternativeNameType =
    MHi.PublicKeyDetails =
    MHi.HashAlgorithm =
      void 0;
  MHi.hashAlgorithmFromJSON = $Hi;
  MHi.hashAlgorithmToJSON = gHi;
  MHi.publicKeyDetailsFromJSON = EHi;
  MHi.publicKeyDetailsToJSON = IHi;
  MHi.subjectAlternativeNameTypeFromJSON = DHi;
  MHi.subjectAlternativeNameTypeToJSON = yHi;
  var LHi = _Hi(),
    m8;
  (function (e) {
    ((e[(e.HASH_ALGORITHM_UNSPECIFIED = 0)] = "HASH_ALGORITHM_UNSPECIFIED"),
      (e[(e.SHA2_256 = 1)] = "SHA2_256"),
      (e[(e.SHA2_384 = 2)] = "SHA2_384"),
      (e[(e.SHA2_512 = 3)] = "SHA2_512"),
      (e[(e.SHA3_256 = 4)] = "SHA3_256"),
      (e[(e.SHA3_384 = 5)] = "SHA3_384"));
  })(m8 || (MHi.HashAlgorithm = m8 = {}));
  function $Hi(e) {
    switch (e) {
      case 0:
      case "HASH_ALGORITHM_UNSPECIFIED":
        return m8.HASH_ALGORITHM_UNSPECIFIED;
      case 1:
      case "SHA2_256":
        return m8.SHA2_256;
      case 2:
      case "SHA2_384":
        return m8.SHA2_384;
      case 3:
      case "SHA2_512":
        return m8.SHA2_512;
      case 4:
      case "SHA3_256":
        return m8.SHA3_256;
      case 5:
      case "SHA3_384":
        return m8.SHA3_384;
      default:
        throw new globalThis.Error("Unrecognized enum value " + e + " for enum HashAlgorithm");
    }
  }
  function gHi(e) {
    switch (e) {
      case m8.HASH_ALGORITHM_UNSPECIFIED:
        return "HASH_ALGORITHM_UNSPECIFIED";
      case m8.SHA2_256:
        return "SHA2_256";
      case m8.SHA2_384:
        return "SHA2_384";
      case m8.SHA2_512:
        return "SHA2_512";
      case m8.SHA3_256:
        return "SHA3_256";
      case m8.SHA3_384:
        return "SHA3_384";
      default:
        throw new globalThis.Error("Unrecognized enum value " + e + " for enum HashAlgorithm");
    }
  }
  var Rl;
  (function (e) {
    ((e[(e.PUBLIC_KEY_DETAILS_UNSPECIFIED = 0)] = "PUBLIC_KEY_DETAILS_UNSPECIFIED"),
      (e[(e.PKCS1_RSA_PKCS1V5 = 1)] = "PKCS1_RSA_PKCS1V5"),
      (e[(e.PKCS1_RSA_PSS = 2)] = "PKCS1_RSA_PSS"),
      (e[(e.PKIX_RSA_PKCS1V5 = 3)] = "PKIX_RSA_PKCS1V5"),
      (e[(e.PKIX_RSA_PSS = 4)] = "PKIX_RSA_PSS"),
      (e[(e.PKIX_RSA_PKCS1V15_2048_SHA256 = 9)] = "PKIX_RSA_PKCS1V15_2048_SHA256"),
      (e[(e.PKIX_RSA_PKCS1V15_3072_SHA256 = 10)] = "PKIX_RSA_PKCS1V15_3072_SHA256"),
      (e[(e.PKIX_RSA_PKCS1V15_4096_SHA256 = 11)] = "PKIX_RSA_PKCS1V15_4096_SHA256"),
      (e[(e.PKIX_RSA_PSS_2048_SHA256 = 16)] = "PKIX_RSA_PSS_2048_SHA256"),
      (e[(e.PKIX_RSA_PSS_3072_SHA256 = 17)] = "PKIX_RSA_PSS_3072_SHA256"),
      (e[(e.PKIX_RSA_PSS_4096_SHA256 = 18)] = "PKIX_RSA_PSS_4096_SHA256"),
      (e[(e.PKIX_ECDSA_P256_HMAC_SHA_256 = 6)] = "PKIX_ECDSA_P256_HMAC_SHA_256"),
      (e[(e.PKIX_ECDSA_P256_SHA_256 = 5)] = "PKIX_ECDSA_P256_SHA_256"),
      (e[(e.PKIX_ECDSA_P384_SHA_384 = 12)] = "PKIX_ECDSA_P384_SHA_384"),
      (e[(e.PKIX_ECDSA_P521_SHA_512 = 13)] = "PKIX_ECDSA_P521_SHA_512"),
      (e[(e.PKIX_ED25519 = 7)] = "PKIX_ED25519"),
      (e[(e.PKIX_ED25519_PH = 8)] = "PKIX_ED25519_PH"),
      (e[(e.PKIX_ECDSA_P384_SHA_256 = 19)] = "PKIX_ECDSA_P384_SHA_256"),
      (e[(e.PKIX_ECDSA_P521_SHA_256 = 20)] = "PKIX_ECDSA_P521_SHA_256"),
      (e[(e.LMS_SHA256 = 14)] = "LMS_SHA256"),
      (e[(e.LMOTS_SHA256 = 15)] = "LMOTS_SHA256"),
      (e[(e.ML_DSA_44 = 23)] = "ML_DSA_44"),
      (e[(e.ML_DSA_65 = 21)] = "ML_DSA_65"),
      (e[(e.ML_DSA_87 = 22)] = "ML_DSA_87"));
  })(Rl || (MHi.PublicKeyDetails = Rl = {}));
  function EHi(e) {
    switch (e) {
      case 0:
      case "PUBLIC_KEY_DETAILS_UNSPECIFIED":
        return Rl.PUBLIC_KEY_DETAILS_UNSPECIFIED;
      case 1:
      case "PKCS1_RSA_PKCS1V5":
        return Rl.PKCS1_RSA_PKCS1V5;
      case 2:
      case "PKCS1_RSA_PSS":
        return Rl.PKCS1_RSA_PSS;
      case 3:
      case "PKIX_RSA_PKCS1V5":
        return Rl.PKIX_RSA_PKCS1V5;
      case 4:
      case "PKIX_RSA_PSS":
        return Rl.PKIX_RSA_PSS;
      case 9:
      case "PKIX_RSA_PKCS1V15_2048_SHA256":
        return Rl.PKIX_RSA_PKCS1V15_2048_SHA256;
      case 10:
      case "PKIX_RSA_PKCS1V15_3072_SHA256":
        return Rl.PKIX_RSA_PKCS1V15_3072_SHA256;
      case 11:
      case "PKIX_RSA_PKCS1V15_4096_SHA256":
        return Rl.PKIX_RSA_PKCS1V15_4096_SHA256;
      case 16:
      case "PKIX_RSA_PSS_2048_SHA256":
        return Rl.PKIX_RSA_PSS_2048_SHA256;
      case 17:
      case "PKIX_RSA_PSS_3072_SHA256":
        return Rl.PKIX_RSA_PSS_3072_SHA256;
      case 18:
      case "PKIX_RSA_PSS_4096_SHA256":
        return Rl.PKIX_RSA_PSS_4096_SHA256;
      case 6:
      case "PKIX_ECDSA_P256_HMAC_SHA_256":
        return Rl.PKIX_ECDSA_P256_HMAC_SHA_256;
      case 5:
      case "PKIX_ECDSA_P256_SHA_256":
        return Rl.PKIX_ECDSA_P256_SHA_256;
      case 12:
      case "PKIX_ECDSA_P384_SHA_384":
        return Rl.PKIX_ECDSA_P384_SHA_384;
      case 13:
      case "PKIX_ECDSA_P521_SHA_512":
        return Rl.PKIX_ECDSA_P521_SHA_512;
      case 7:
      case "PKIX_ED25519":
        return Rl.PKIX_ED25519;
      case 8:
      case "PKIX_ED25519_PH":
        return Rl.PKIX_ED25519_PH;
      case 19:
      case "PKIX_ECDSA_P384_SHA_256":
        return Rl.PKIX_ECDSA_P384_SHA_256;
      case 20:
      case "PKIX_ECDSA_P521_SHA_256":
        return Rl.PKIX_ECDSA_P521_SHA_256;
      case 14:
      case "LMS_SHA256":
        return Rl.LMS_SHA256;
      case 15:
      case "LMOTS_SHA256":
        return Rl.LMOTS_SHA256;
      case 23:
      case "ML_DSA_44":
        return Rl.ML_DSA_44;
      case 21:
      case "ML_DSA_65":
        return Rl.ML_DSA_65;
      case 22:
      case "ML_DSA_87":
        return Rl.ML_DSA_87;
      default:
        throw new globalThis.Error("Unrecognized enum value " + e + " for enum PublicKeyDetails");
    }
  }
  function IHi(e) {
    switch (e) {
      case Rl.PUBLIC_KEY_DETAILS_UNSPECIFIED:
        return "PUBLIC_KEY_DETAILS_UNSPECIFIED";
      case Rl.PKCS1_RSA_PKCS1V5:
        return "PKCS1_RSA_PKCS1V5";
      case Rl.PKCS1_RSA_PSS:
        return "PKCS1_RSA_PSS";
      case Rl.PKIX_RSA_PKCS1V5:
        return "PKIX_RSA_PKCS1V5";
      case Rl.PKIX_RSA_PSS:
        return "PKIX_RSA_PSS";
      case Rl.PKIX_RSA_PKCS1V15_2048_SHA256:
        return "PKIX_RSA_PKCS1V15_2048_SHA256";
      case Rl.PKIX_RSA_PKCS1V15_3072_SHA256:
        return "PKIX_RSA_PKCS1V15_3072_SHA256";
      case Rl.PKIX_RSA_PKCS1V15_4096_SHA256:
        return "PKIX_RSA_PKCS1V15_4096_SHA256";
      case Rl.PKIX_RSA_PSS_2048_SHA256:
        return "PKIX_RSA_PSS_2048_SHA256";
      case Rl.PKIX_RSA_PSS_3072_SHA256:
        return "PKIX_RSA_PSS_3072_SHA256";
      case Rl.PKIX_RSA_PSS_4096_SHA256:
        return "PKIX_RSA_PSS_4096_SHA256";
      case Rl.PKIX_ECDSA_P256_HMAC_SHA_256:
        return "PKIX_ECDSA_P256_HMAC_SHA_256";
      case Rl.PKIX_ECDSA_P256_SHA_256:
        return "PKIX_ECDSA_P256_SHA_256";
      case Rl.PKIX_ECDSA_P384_SHA_384:
        return "PKIX_ECDSA_P384_SHA_384";
      case Rl.PKIX_ECDSA_P521_SHA_512:
        return "PKIX_ECDSA_P521_SHA_512";
      case Rl.PKIX_ED25519:
        return "PKIX_ED25519";
      case Rl.PKIX_ED25519_PH:
        return "PKIX_ED25519_PH";
      case Rl.PKIX_ECDSA_P384_SHA_256:
        return "PKIX_ECDSA_P384_SHA_256";
      case Rl.PKIX_ECDSA_P521_SHA_256:
        return "PKIX_ECDSA_P521_SHA_256";
      case Rl.LMS_SHA256:
        return "LMS_SHA256";
      case Rl.LMOTS_SHA256:
        return "LMOTS_SHA256";
      case Rl.ML_DSA_44:
        return "ML_DSA_44";
      case Rl.ML_DSA_65:
        return "ML_DSA_65";
      case Rl.ML_DSA_87:
        return "ML_DSA_87";
      default:
        throw new globalThis.Error("Unrecognized enum value " + e + " for enum PublicKeyDetails");
    }
  }
  var O5;
  (function (e) {
    ((e[(e.SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED = 0)] = "SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED"),
      (e[(e.EMAIL = 1)] = "EMAIL"),
      (e[(e.URI = 2)] = "URI"),
      (e[(e.OTHER_NAME = 3)] = "OTHER_NAME"));
  })(O5 || (MHi.SubjectAlternativeNameType = O5 = {}));
  function DHi(e) {
    switch (e) {
      case 0:
      case "SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED":
        return O5.SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED;
      case 1:
      case "EMAIL":
        return O5.EMAIL;
      case 2:
      case "URI":
        return O5.URI;
      case 3:
      case "OTHER_NAME":
        return O5.OTHER_NAME;
      default:
        throw new globalThis.Error("Unrecognized enum value " + e + " for enum SubjectAlternativeNameType");
    }
  }
  function yHi(e) {
    switch (e) {
      case O5.SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED:
        return "SUBJECT_ALTERNATIVE_NAME_TYPE_UNSPECIFIED";
      case O5.EMAIL:
        return "EMAIL";
      case O5.URI:
        return "URI";
      case O5.OTHER_NAME:
        return "OTHER_NAME";
      default:
        throw new globalThis.Error("Unrecognized enum value " + e + " for enum SubjectAlternativeNameType");
    }
  }
  MHi.HashOutput = {
    fromJSON(e) {
      return {
        algorithm: O1(e.algorithm) ? $Hi(e.algorithm) : 0,
        digest: O1(e.digest) ? Buffer.from(__e(e.digest)) : Buffer.alloc(0),
      };
    },
    toJSON(e) {
      let t = {};
      if (e.algorithm !== 0) t.algorithm = gHi(e.algorithm);
      if (e.digest.length !== 0) t.digest = h_e(e.digest);
      return t;
    },
  };
  MHi.MessageSignature = {
    fromJSON(e) {
      return {
        messageDigest: O1(e.messageDigest) ? MHi.HashOutput.fromJSON(e.messageDigest) : void 0,
        signature: O1(e.signature) ? Buffer.from(__e(e.signature)) : Buffer.alloc(0),
      };
    },
    toJSON(e) {
      let t = {};
      if (e.messageDigest !== void 0) t.messageDigest = MHi.HashOutput.toJSON(e.messageDigest);
      if (e.signature.length !== 0) t.signature = h_e(e.signature);
      return t;
    },
  };
  MHi.LogId = {
    fromJSON(e) {
      return { keyId: O1(e.keyId) ? Buffer.from(__e(e.keyId)) : Buffer.alloc(0) };
    },
    toJSON(e) {
      let t = {};
      if (e.keyId.length !== 0) t.keyId = h_e(e.keyId);
      return t;
    },
  };
  MHi.RFC3161SignedTimestamp = {
    fromJSON(e) {
      return {
        signedTimestamp: O1(e.signedTimestamp) ? Buffer.from(__e(e.signedTimestamp)) : Buffer.alloc(0),
      };
    },
    toJSON(e) {
      let t = {};
      if (e.signedTimestamp.length !== 0) t.signedTimestamp = h_e(e.signedTimestamp);
      return t;
    },
  };
  MHi.PublicKey = {
    fromJSON(e) {
      return {
        rawBytes: O1(e.rawBytes) ? Buffer.from(__e(e.rawBytes)) : void 0,
        keyDetails: O1(e.keyDetails) ? EHi(e.keyDetails) : 0,
        validFor: O1(e.validFor) ? MHi.TimeRange.fromJSON(e.validFor) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.rawBytes !== void 0) t.rawBytes = h_e(e.rawBytes);
      if (e.keyDetails !== 0) t.keyDetails = IHi(e.keyDetails);
      if (e.validFor !== void 0) t.validFor = MHi.TimeRange.toJSON(e.validFor);
      return t;
    },
  };
  MHi.PublicKeyIdentifier = {
    fromJSON(e) {
      return { hint: O1(e.hint) ? globalThis.String(e.hint) : "" };
    },
    toJSON(e) {
      let t = {};
      if (e.hint !== "") t.hint = e.hint;
      return t;
    },
  };
  MHi.ObjectIdentifier = {
    fromJSON(e) {
      return { id: globalThis.Array.isArray(e?.id) ? e.id.map((t) => globalThis.Number(t)) : [] };
    },
    toJSON(e) {
      let t = {};
      if (e.id?.length) t.id = e.id.map((r) => Math.round(r));
      return t;
    },
  };
  MHi.ObjectIdentifierValuePair = {
    fromJSON(e) {
      return {
        oid: O1(e.oid) ? MHi.ObjectIdentifier.fromJSON(e.oid) : void 0,
        value: O1(e.value) ? Buffer.from(__e(e.value)) : Buffer.alloc(0),
      };
    },
    toJSON(e) {
      let t = {};
      if (e.oid !== void 0) t.oid = MHi.ObjectIdentifier.toJSON(e.oid);
      if (e.value.length !== 0) t.value = h_e(e.value);
      return t;
    },
  };
  MHi.DistinguishedName = {
    fromJSON(e) {
      return {
        organization: O1(e.organization) ? globalThis.String(e.organization) : "",
        commonName: O1(e.commonName) ? globalThis.String(e.commonName) : "",
      };
    },
    toJSON(e) {
      let t = {};
      if (e.organization !== "") t.organization = e.organization;
      if (e.commonName !== "") t.commonName = e.commonName;
      return t;
    },
  };
  MHi.X509Certificate = {
    fromJSON(e) {
      return { rawBytes: O1(e.rawBytes) ? Buffer.from(__e(e.rawBytes)) : Buffer.alloc(0) };
    },
    toJSON(e) {
      let t = {};
      if (e.rawBytes.length !== 0) t.rawBytes = h_e(e.rawBytes);
      return t;
    },
  };
  MHi.SubjectAlternativeName = {
    fromJSON(e) {
      return {
        type: O1(e.type) ? DHi(e.type) : 0,
        identity: O1(e.regexp)
          ? { $case: "regexp", regexp: globalThis.String(e.regexp) }
          : O1(e.value)
            ? { $case: "value", value: globalThis.String(e.value) }
            : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.type !== 0) t.type = yHi(e.type);
      if (e.identity?.$case === "regexp") t.regexp = e.identity.regexp;
      else if (e.identity?.$case === "value") t.value = e.identity.value;
      return t;
    },
  };
  MHi.X509CertificateChain = {
    fromJSON(e) {
      return {
        certificates: globalThis.Array.isArray(e?.certificates)
          ? e.certificates.map((t) => MHi.X509Certificate.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.certificates?.length) t.certificates = e.certificates.map((r) => MHi.X509Certificate.toJSON(r));
      return t;
    },
  };
  MHi.TimeRange = {
    fromJSON(e) {
      return { start: O1(e.start) ? hHi(e.start) : void 0, end: O1(e.end) ? hHi(e.end) : void 0 };
    },
    toJSON(e) {
      let t = {};
      if (e.start !== void 0) t.start = e.start.toISOString();
      if (e.end !== void 0) t.end = e.end.toISOString();
      return t;
    },
  };
  function __e(e) {
    return Uint8Array.from(globalThis.Buffer.from(e, "base64"));
  }
  function h_e(e) {
    return globalThis.Buffer.from(e).toString("base64");
  }
  function OGo(e) {
    let t = (globalThis.Number(e.seconds) || 0) * 1000;
    return ((t += (e.nanos || 0) / 1e6), new globalThis.Date(t));
  }
  function hHi(e) {
    if (e instanceof globalThis.Date) return e;
    else if (typeof e === "string") return new globalThis.Date(e);
    else return OGo(LHi.Timestamp.fromJSON(e));
  }
  function O1(e) {
    return e !== null && e !== void 0;
  }
});