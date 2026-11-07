
var Fpr = Ie(function (xHi) {
  Object.defineProperty(xHi, "__esModule", { value: !0 });
  xHi.TransparencyLogEntry =
    xHi.InclusionPromise =
    xHi.InclusionProof =
    xHi.Checkpoint =
    xHi.KindVersion =
      void 0;
  var mDt = dZ();
  xHi.KindVersion = {
    fromJSON(e) {
      return {
        kind: Pw(e.kind) ? globalThis.String(e.kind) : "",
        version: Pw(e.version) ? globalThis.String(e.version) : "",
      };
    },
    toJSON(e) {
      let t = {};
      if (e.kind !== "") t.kind = e.kind;
      if (e.version !== "") t.version = e.version;
      return t;
    },
  };
  xHi.Checkpoint = {
    fromJSON(e) {
      return { envelope: Pw(e.envelope) ? globalThis.String(e.envelope) : "" };
    },
    toJSON(e) {
      let t = {};
      if (e.envelope !== "") t.envelope = e.envelope;
      return t;
    },
  };
  xHi.InclusionProof = {
    fromJSON(e) {
      return {
        logIndex: Pw(e.logIndex) ? globalThis.String(e.logIndex) : "0",
        rootHash: Pw(e.rootHash) ? Buffer.from(_Dt(e.rootHash)) : Buffer.alloc(0),
        treeSize: Pw(e.treeSize) ? globalThis.String(e.treeSize) : "0",
        hashes: globalThis.Array.isArray(e?.hashes) ? e.hashes.map((t) => Buffer.from(_Dt(t))) : [],
        checkpoint: Pw(e.checkpoint) ? xHi.Checkpoint.fromJSON(e.checkpoint) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.logIndex !== "0") t.logIndex = e.logIndex;
      if (e.rootHash.length !== 0) t.rootHash = hDt(e.rootHash);
      if (e.treeSize !== "0") t.treeSize = e.treeSize;
      if (e.hashes?.length) t.hashes = e.hashes.map((r) => hDt(r));
      if (e.checkpoint !== void 0) t.checkpoint = xHi.Checkpoint.toJSON(e.checkpoint);
      return t;
    },
  };
  xHi.InclusionPromise = {
    fromJSON(e) {
      return {
        signedEntryTimestamp: Pw(e.signedEntryTimestamp)
          ? Buffer.from(_Dt(e.signedEntryTimestamp))
          : Buffer.alloc(0),
      };
    },
    toJSON(e) {
      let t = {};
      if (e.signedEntryTimestamp.length !== 0) t.signedEntryTimestamp = hDt(e.signedEntryTimestamp);
      return t;
    },
  };
  xHi.TransparencyLogEntry = {
    fromJSON(e) {
      return {
        logIndex: Pw(e.logIndex) ? globalThis.String(e.logIndex) : "0",
        logId: Pw(e.logId) ? mDt.LogId.fromJSON(e.logId) : void 0,
        kindVersion: Pw(e.kindVersion) ? xHi.KindVersion.fromJSON(e.kindVersion) : void 0,
        integratedTime: Pw(e.integratedTime) ? globalThis.String(e.integratedTime) : "0",
        inclusionPromise: Pw(e.inclusionPromise) ? xHi.InclusionPromise.fromJSON(e.inclusionPromise) : void 0,
        inclusionProof: Pw(e.inclusionProof) ? xHi.InclusionProof.fromJSON(e.inclusionProof) : void 0,
        canonicalizedBody: Pw(e.canonicalizedBody) ? Buffer.from(_Dt(e.canonicalizedBody)) : Buffer.alloc(0),
      };
    },
    toJSON(e) {
      let t = {};
      if (e.logIndex !== "0") t.logIndex = e.logIndex;
      if (e.logId !== void 0) t.logId = mDt.LogId.toJSON(e.logId);
      if (e.kindVersion !== void 0) t.kindVersion = xHi.KindVersion.toJSON(e.kindVersion);
      if (e.integratedTime !== "0") t.integratedTime = e.integratedTime;
      if (e.inclusionPromise !== void 0) t.inclusionPromise = xHi.InclusionPromise.toJSON(e.inclusionPromise);
      if (e.inclusionProof !== void 0) t.inclusionProof = xHi.InclusionProof.toJSON(e.inclusionProof);
      if (e.canonicalizedBody.length !== 0) t.canonicalizedBody = hDt(e.canonicalizedBody);
      return t;
    },
  };
  function _Dt(e) {
    return Uint8Array.from(globalThis.Buffer.from(e, "base64"));
  }
  function hDt(e) {
    return globalThis.Buffer.from(e).toString("base64");
  }
  function Pw(e) {
    return e !== null && e !== void 0;
  }
});