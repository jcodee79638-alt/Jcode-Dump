
var pDt = Ie(function (fHi) {
  Object.defineProperty(fHi, "__esModule", { value: !0 });
  fHi.Signature = fHi.Envelope = void 0;
  fHi.Envelope = {
    fromJSON(e) {
      return {
        payload: lDt(e.payload) ? Buffer.from(uHi(e.payload)) : Buffer.alloc(0),
        payloadType: lDt(e.payloadType) ? globalThis.String(e.payloadType) : "",
        signatures: globalThis.Array.isArray(e?.signatures)
          ? e.signatures.map((t) => fHi.Signature.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.payload.length !== 0) t.payload = lHi(e.payload);
      if (e.payloadType !== "") t.payloadType = e.payloadType;
      if (e.signatures?.length) t.signatures = e.signatures.map((r) => fHi.Signature.toJSON(r));
      return t;
    },
  };
  fHi.Signature = {
    fromJSON(e) {
      return {
        sig: lDt(e.sig) ? Buffer.from(uHi(e.sig)) : Buffer.alloc(0),
        keyid: lDt(e.keyid) ? globalThis.String(e.keyid) : "",
      };
    },
    toJSON(e) {
      let t = {};
      if (e.sig.length !== 0) t.sig = lHi(e.sig);
      if (e.keyid !== "") t.keyid = e.keyid;
      return t;
    },
  };
  function uHi(e) {
    return Uint8Array.from(globalThis.Buffer.from(e, "base64"));
  }
  function lHi(e) {
    return globalThis.Buffer.from(e).toString("base64");
  }
  function lDt(e) {
    return e !== null && e !== void 0;
  }
});