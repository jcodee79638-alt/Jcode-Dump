
var OHi = Ie(function (wHi) {
  Object.defineProperty(wHi, "__esModule", { value: !0 });
  wHi.Input =
    wHi.Artifact =
    wHi.ArtifactVerificationOptions_ObserverTimestampOptions =
    wHi.ArtifactVerificationOptions_TlogIntegratedTimestampOptions =
    wHi.ArtifactVerificationOptions_TimestampAuthorityOptions =
    wHi.ArtifactVerificationOptions_CtlogOptions =
    wHi.ArtifactVerificationOptions_TlogOptions =
    wHi.ArtifactVerificationOptions =
    wHi.PublicKeyIdentities =
    wHi.CertificateIdentities =
    wHi.CertificateIdentity =
      void 0;
  var gDt = Wpr(),
    sP = dZ(),
    EDt = Gpr();
  wHi.CertificateIdentity = {
    fromJSON(e) {
      return {
        issuer: Lg(e.issuer) ? globalThis.String(e.issuer) : "",
        san: Lg(e.san) ? sP.SubjectAlternativeName.fromJSON(e.san) : void 0,
        oids: globalThis.Array.isArray(e?.oids)
          ? e.oids.map((t) => sP.ObjectIdentifierValuePair.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.issuer !== "") t.issuer = e.issuer;
      if (e.san !== void 0) t.san = sP.SubjectAlternativeName.toJSON(e.san);
      if (e.oids?.length) t.oids = e.oids.map((r) => sP.ObjectIdentifierValuePair.toJSON(r));
      return t;
    },
  };
  wHi.CertificateIdentities = {
    fromJSON(e) {
      return {
        identities: globalThis.Array.isArray(e?.identities)
          ? e.identities.map((t) => wHi.CertificateIdentity.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.identities?.length) t.identities = e.identities.map((r) => wHi.CertificateIdentity.toJSON(r));
      return t;
    },
  };
  wHi.PublicKeyIdentities = {
    fromJSON(e) {
      return {
        publicKeys: globalThis.Array.isArray(e?.publicKeys)
          ? e.publicKeys.map((t) => sP.PublicKey.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.publicKeys?.length) t.publicKeys = e.publicKeys.map((r) => sP.PublicKey.toJSON(r));
      return t;
    },
  };
  wHi.ArtifactVerificationOptions = {
    fromJSON(e) {
      return {
        signers: Lg(e.certificateIdentities)
          ? {
              $case: "certificateIdentities",
              certificateIdentities: wHi.CertificateIdentities.fromJSON(e.certificateIdentities),
            }
          : Lg(e.publicKeys)
            ? { $case: "publicKeys", publicKeys: wHi.PublicKeyIdentities.fromJSON(e.publicKeys) }
            : void 0,
        tlogOptions: Lg(e.tlogOptions)
          ? wHi.ArtifactVerificationOptions_TlogOptions.fromJSON(e.tlogOptions)
          : void 0,
        ctlogOptions: Lg(e.ctlogOptions)
          ? wHi.ArtifactVerificationOptions_CtlogOptions.fromJSON(e.ctlogOptions)
          : void 0,
        tsaOptions: Lg(e.tsaOptions)
          ? wHi.ArtifactVerificationOptions_TimestampAuthorityOptions.fromJSON(e.tsaOptions)
          : void 0,
        integratedTsOptions: Lg(e.integratedTsOptions)
          ? wHi.ArtifactVerificationOptions_TlogIntegratedTimestampOptions.fromJSON(e.integratedTsOptions)
          : void 0,
        observerOptions: Lg(e.observerOptions)
          ? wHi.ArtifactVerificationOptions_ObserverTimestampOptions.fromJSON(e.observerOptions)
          : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.signers?.$case === "certificateIdentities")
        t.certificateIdentities = wHi.CertificateIdentities.toJSON(e.signers.certificateIdentities);
      else if (e.signers?.$case === "publicKeys")
        t.publicKeys = wHi.PublicKeyIdentities.toJSON(e.signers.publicKeys);
      if (e.tlogOptions !== void 0)
        t.tlogOptions = wHi.ArtifactVerificationOptions_TlogOptions.toJSON(e.tlogOptions);
      if (e.ctlogOptions !== void 0)
        t.ctlogOptions = wHi.ArtifactVerificationOptions_CtlogOptions.toJSON(e.ctlogOptions);
      if (e.tsaOptions !== void 0)
        t.tsaOptions = wHi.ArtifactVerificationOptions_TimestampAuthorityOptions.toJSON(e.tsaOptions);
      if (e.integratedTsOptions !== void 0)
        t.integratedTsOptions = wHi.ArtifactVerificationOptions_TlogIntegratedTimestampOptions.toJSON(
          e.integratedTsOptions,
        );
      if (e.observerOptions !== void 0)
        t.observerOptions = wHi.ArtifactVerificationOptions_ObserverTimestampOptions.toJSON(
          e.observerOptions,
        );
      return t;
    },
  };
  wHi.ArtifactVerificationOptions_TlogOptions = {
    fromJSON(e) {
      return {
        threshold: Lg(e.threshold) ? globalThis.Number(e.threshold) : 0,
        performOnlineVerification: Lg(e.performOnlineVerification)
          ? globalThis.Boolean(e.performOnlineVerification)
          : !1,
        disable: Lg(e.disable) ? globalThis.Boolean(e.disable) : !1,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.threshold !== 0) t.threshold = Math.round(e.threshold);
      if (e.performOnlineVerification !== !1) t.performOnlineVerification = e.performOnlineVerification;
      if (e.disable !== !1) t.disable = e.disable;
      return t;
    },
  };
  wHi.ArtifactVerificationOptions_CtlogOptions = {
    fromJSON(e) {
      return {
        threshold: Lg(e.threshold) ? globalThis.Number(e.threshold) : 0,
        disable: Lg(e.disable) ? globalThis.Boolean(e.disable) : !1,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.threshold !== 0) t.threshold = Math.round(e.threshold);
      if (e.disable !== !1) t.disable = e.disable;
      return t;
    },
  };
  wHi.ArtifactVerificationOptions_TimestampAuthorityOptions = {
    fromJSON(e) {
      return {
        threshold: Lg(e.threshold) ? globalThis.Number(e.threshold) : 0,
        disable: Lg(e.disable) ? globalThis.Boolean(e.disable) : !1,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.threshold !== 0) t.threshold = Math.round(e.threshold);
      if (e.disable !== !1) t.disable = e.disable;
      return t;
    },
  };
  wHi.ArtifactVerificationOptions_TlogIntegratedTimestampOptions = {
    fromJSON(e) {
      return {
        threshold: Lg(e.threshold) ? globalThis.Number(e.threshold) : 0,
        disable: Lg(e.disable) ? globalThis.Boolean(e.disable) : !1,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.threshold !== 0) t.threshold = Math.round(e.threshold);
      if (e.disable !== !1) t.disable = e.disable;
      return t;
    },
  };
  wHi.ArtifactVerificationOptions_ObserverTimestampOptions = {
    fromJSON(e) {
      return {
        threshold: Lg(e.threshold) ? globalThis.Number(e.threshold) : 0,
        disable: Lg(e.disable) ? globalThis.Boolean(e.disable) : !1,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.threshold !== 0) t.threshold = Math.round(e.threshold);
      if (e.disable !== !1) t.disable = e.disable;
      return t;
    },
  };
  wHi.Artifact = {
    fromJSON(e) {
      return {
        data: Lg(e.artifactUri)
          ? { $case: "artifactUri", artifactUri: globalThis.String(e.artifactUri) }
          : Lg(e.artifact)
            ? { $case: "artifact", artifact: Buffer.from(s5o(e.artifact)) }
            : Lg(e.artifactDigest)
              ? { $case: "artifactDigest", artifactDigest: sP.HashOutput.fromJSON(e.artifactDigest) }
              : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.data?.$case === "artifactUri") t.artifactUri = e.data.artifactUri;
      else if (e.data?.$case === "artifact") t.artifact = o5o(e.data.artifact);
      else if (e.data?.$case === "artifactDigest")
        t.artifactDigest = sP.HashOutput.toJSON(e.data.artifactDigest);
      return t;
    },
  };
  wHi.Input = {
    fromJSON(e) {
      return {
        artifactTrustRoot: Lg(e.artifactTrustRoot) ? EDt.TrustedRoot.fromJSON(e.artifactTrustRoot) : void 0,
        artifactVerificationOptions: Lg(e.artifactVerificationOptions)
          ? wHi.ArtifactVerificationOptions.fromJSON(e.artifactVerificationOptions)
          : void 0,
        bundle: Lg(e.bundle) ? gDt.Bundle.fromJSON(e.bundle) : void 0,
        artifact: Lg(e.artifact) ? wHi.Artifact.fromJSON(e.artifact) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.artifactTrustRoot !== void 0) t.artifactTrustRoot = EDt.TrustedRoot.toJSON(e.artifactTrustRoot);
      if (e.artifactVerificationOptions !== void 0)
        t.artifactVerificationOptions = wHi.ArtifactVerificationOptions.toJSON(e.artifactVerificationOptions);
      if (e.bundle !== void 0) t.bundle = gDt.Bundle.toJSON(e.bundle);
      if (e.artifact !== void 0) t.artifact = wHi.Artifact.toJSON(e.artifact);
      return t;
    },
  };
  function s5o(e) {
    return Uint8Array.from(globalThis.Buffer.from(e, "base64"));
  }
  function o5o(e) {
    return globalThis.Buffer.from(e).toString("base64");
  }
  function Lg(e) {
    return e !== null && e !== void 0;
  }
});