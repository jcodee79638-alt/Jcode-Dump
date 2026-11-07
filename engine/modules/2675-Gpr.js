
var Gpr = Ie(function (PHi) {
  Object.defineProperty(PHi, "__esModule", { value: !0 });
  PHi.ClientTrustConfig =
    PHi.ServiceConfiguration =
    PHi.Service =
    PHi.SigningConfig =
    PHi.TrustedRoot =
    PHi.CertificateAuthority =
    PHi.TransparencyLogInstance =
    PHi.ServiceSelector =
      void 0;
  PHi.serviceSelectorFromJSON = bHi;
  PHi.serviceSelectorToJSON = jHi;
  var gh = dZ(),
    U5;
  (function (e) {
    ((e[(e.SERVICE_SELECTOR_UNDEFINED = 0)] = "SERVICE_SELECTOR_UNDEFINED"),
      (e[(e.ALL = 1)] = "ALL"),
      (e[(e.ANY = 2)] = "ANY"),
      (e[(e.EXACT = 3)] = "EXACT"));
  })(U5 || (PHi.ServiceSelector = U5 = {}));
  function bHi(e) {
    switch (e) {
      case 0:
      case "SERVICE_SELECTOR_UNDEFINED":
        return U5.SERVICE_SELECTOR_UNDEFINED;
      case 1:
      case "ALL":
        return U5.ALL;
      case 2:
      case "ANY":
        return U5.ANY;
      case 3:
      case "EXACT":
        return U5.EXACT;
      default:
        throw new globalThis.Error("Unrecognized enum value " + e + " for enum ServiceSelector");
    }
  }
  function jHi(e) {
    switch (e) {
      case U5.SERVICE_SELECTOR_UNDEFINED:
        return "SERVICE_SELECTOR_UNDEFINED";
      case U5.ALL:
        return "ALL";
      case U5.ANY:
        return "ANY";
      case U5.EXACT:
        return "EXACT";
      default:
        throw new globalThis.Error("Unrecognized enum value " + e + " for enum ServiceSelector");
    }
  }
  PHi.TransparencyLogInstance = {
    fromJSON(e) {
      return {
        baseUrl: bE(e.baseUrl) ? globalThis.String(e.baseUrl) : "",
        hashAlgorithm: bE(e.hashAlgorithm) ? gh.hashAlgorithmFromJSON(e.hashAlgorithm) : 0,
        publicKey: bE(e.publicKey) ? gh.PublicKey.fromJSON(e.publicKey) : void 0,
        logId: bE(e.logId) ? gh.LogId.fromJSON(e.logId) : void 0,
        checkpointKeyId: bE(e.checkpointKeyId) ? gh.LogId.fromJSON(e.checkpointKeyId) : void 0,
        operator: bE(e.operator) ? globalThis.String(e.operator) : "",
      };
    },
    toJSON(e) {
      let t = {};
      if (e.baseUrl !== "") t.baseUrl = e.baseUrl;
      if (e.hashAlgorithm !== 0) t.hashAlgorithm = gh.hashAlgorithmToJSON(e.hashAlgorithm);
      if (e.publicKey !== void 0) t.publicKey = gh.PublicKey.toJSON(e.publicKey);
      if (e.logId !== void 0) t.logId = gh.LogId.toJSON(e.logId);
      if (e.checkpointKeyId !== void 0) t.checkpointKeyId = gh.LogId.toJSON(e.checkpointKeyId);
      if (e.operator !== "") t.operator = e.operator;
      return t;
    },
  };
  PHi.CertificateAuthority = {
    fromJSON(e) {
      return {
        subject: bE(e.subject) ? gh.DistinguishedName.fromJSON(e.subject) : void 0,
        uri: bE(e.uri) ? globalThis.String(e.uri) : "",
        certChain: bE(e.certChain) ? gh.X509CertificateChain.fromJSON(e.certChain) : void 0,
        validFor: bE(e.validFor) ? gh.TimeRange.fromJSON(e.validFor) : void 0,
        operator: bE(e.operator) ? globalThis.String(e.operator) : "",
      };
    },
    toJSON(e) {
      let t = {};
      if (e.subject !== void 0) t.subject = gh.DistinguishedName.toJSON(e.subject);
      if (e.uri !== "") t.uri = e.uri;
      if (e.certChain !== void 0) t.certChain = gh.X509CertificateChain.toJSON(e.certChain);
      if (e.validFor !== void 0) t.validFor = gh.TimeRange.toJSON(e.validFor);
      if (e.operator !== "") t.operator = e.operator;
      return t;
    },
  };
  PHi.TrustedRoot = {
    fromJSON(e) {
      return {
        mediaType: bE(e.mediaType) ? globalThis.String(e.mediaType) : "",
        tlogs: globalThis.Array.isArray(e?.tlogs)
          ? e.tlogs.map((t) => PHi.TransparencyLogInstance.fromJSON(t))
          : [],
        certificateAuthorities: globalThis.Array.isArray(e?.certificateAuthorities)
          ? e.certificateAuthorities.map((t) => PHi.CertificateAuthority.fromJSON(t))
          : [],
        ctlogs: globalThis.Array.isArray(e?.ctlogs)
          ? e.ctlogs.map((t) => PHi.TransparencyLogInstance.fromJSON(t))
          : [],
        timestampAuthorities: globalThis.Array.isArray(e?.timestampAuthorities)
          ? e.timestampAuthorities.map((t) => PHi.CertificateAuthority.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.mediaType !== "") t.mediaType = e.mediaType;
      if (e.tlogs?.length) t.tlogs = e.tlogs.map((r) => PHi.TransparencyLogInstance.toJSON(r));
      if (e.certificateAuthorities?.length)
        t.certificateAuthorities = e.certificateAuthorities.map((r) => PHi.CertificateAuthority.toJSON(r));
      if (e.ctlogs?.length) t.ctlogs = e.ctlogs.map((r) => PHi.TransparencyLogInstance.toJSON(r));
      if (e.timestampAuthorities?.length)
        t.timestampAuthorities = e.timestampAuthorities.map((r) => PHi.CertificateAuthority.toJSON(r));
      return t;
    },
  };
  PHi.SigningConfig = {
    fromJSON(e) {
      return {
        mediaType: bE(e.mediaType) ? globalThis.String(e.mediaType) : "",
        caUrls: globalThis.Array.isArray(e?.caUrls) ? e.caUrls.map((t) => PHi.Service.fromJSON(t)) : [],
        oidcUrls: globalThis.Array.isArray(e?.oidcUrls) ? e.oidcUrls.map((t) => PHi.Service.fromJSON(t)) : [],
        rekorTlogUrls: globalThis.Array.isArray(e?.rekorTlogUrls)
          ? e.rekorTlogUrls.map((t) => PHi.Service.fromJSON(t))
          : [],
        rekorTlogConfig: bE(e.rekorTlogConfig)
          ? PHi.ServiceConfiguration.fromJSON(e.rekorTlogConfig)
          : void 0,
        tsaUrls: globalThis.Array.isArray(e?.tsaUrls) ? e.tsaUrls.map((t) => PHi.Service.fromJSON(t)) : [],
        tsaConfig: bE(e.tsaConfig) ? PHi.ServiceConfiguration.fromJSON(e.tsaConfig) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.mediaType !== "") t.mediaType = e.mediaType;
      if (e.caUrls?.length) t.caUrls = e.caUrls.map((r) => PHi.Service.toJSON(r));
      if (e.oidcUrls?.length) t.oidcUrls = e.oidcUrls.map((r) => PHi.Service.toJSON(r));
      if (e.rekorTlogUrls?.length) t.rekorTlogUrls = e.rekorTlogUrls.map((r) => PHi.Service.toJSON(r));
      if (e.rekorTlogConfig !== void 0)
        t.rekorTlogConfig = PHi.ServiceConfiguration.toJSON(e.rekorTlogConfig);
      if (e.tsaUrls?.length) t.tsaUrls = e.tsaUrls.map((r) => PHi.Service.toJSON(r));
      if (e.tsaConfig !== void 0) t.tsaConfig = PHi.ServiceConfiguration.toJSON(e.tsaConfig);
      return t;
    },
  };
  PHi.Service = {
    fromJSON(e) {
      return {
        url: bE(e.url) ? globalThis.String(e.url) : "",
        majorApiVersion: bE(e.majorApiVersion) ? globalThis.Number(e.majorApiVersion) : 0,
        validFor: bE(e.validFor) ? gh.TimeRange.fromJSON(e.validFor) : void 0,
        operator: bE(e.operator) ? globalThis.String(e.operator) : "",
      };
    },
    toJSON(e) {
      let t = {};
      if (e.url !== "") t.url = e.url;
      if (e.majorApiVersion !== 0) t.majorApiVersion = Math.round(e.majorApiVersion);
      if (e.validFor !== void 0) t.validFor = gh.TimeRange.toJSON(e.validFor);
      if (e.operator !== "") t.operator = e.operator;
      return t;
    },
  };
  PHi.ServiceConfiguration = {
    fromJSON(e) {
      return {
        selector: bE(e.selector) ? bHi(e.selector) : 0,
        count: bE(e.count) ? globalThis.Number(e.count) : 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.selector !== 0) t.selector = jHi(e.selector);
      if (e.count !== 0) t.count = Math.round(e.count);
      return t;
    },
  };
  PHi.ClientTrustConfig = {
    fromJSON(e) {
      return {
        mediaType: bE(e.mediaType) ? globalThis.String(e.mediaType) : "",
        trustedRoot: bE(e.trustedRoot) ? PHi.TrustedRoot.fromJSON(e.trustedRoot) : void 0,
        signingConfig: bE(e.signingConfig) ? PHi.SigningConfig.fromJSON(e.signingConfig) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.mediaType !== "") t.mediaType = e.mediaType;
      if (e.trustedRoot !== void 0) t.trustedRoot = PHi.TrustedRoot.toJSON(e.trustedRoot);
      if (e.signingConfig !== void 0) t.signingConfig = PHi.SigningConfig.toJSON(e.signingConfig);
      return t;
    },
  };
  function bE(e) {
    return e !== null && e !== void 0;
  }
});