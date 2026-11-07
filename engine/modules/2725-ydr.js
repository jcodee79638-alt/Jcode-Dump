
var ydr = Ie(function (Eui) {
  Object.defineProperty(Eui, "__esModule", { value: !0 });
  Eui.DSSELogEntryV002 = Eui.DSSERequestV002 = void 0;
  var VDt = pDt(),
    qDt = dZ(),
    Aae = WDt();
  Eui.DSSERequestV002 = {
    fromJSON(e) {
      return {
        envelope: gui(e.envelope) ? VDt.Envelope.fromJSON(e.envelope) : void 0,
        verifiers: globalThis.Array.isArray(e?.verifiers)
          ? e.verifiers.map((t) => Aae.Verifier.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.envelope !== void 0) t.envelope = VDt.Envelope.toJSON(e.envelope);
      if (e.verifiers?.length) t.verifiers = e.verifiers.map((r) => Aae.Verifier.toJSON(r));
      return t;
    },
  };
  Eui.DSSELogEntryV002 = {
    fromJSON(e) {
      return {
        payloadHash: gui(e.payloadHash) ? qDt.HashOutput.fromJSON(e.payloadHash) : void 0,
        signatures: globalThis.Array.isArray(e?.signatures)
          ? e.signatures.map((t) => Aae.Signature.fromJSON(t))
          : [],
      };
    },
    toJSON(e) {
      let t = {};
      if (e.payloadHash !== void 0) t.payloadHash = qDt.HashOutput.toJSON(e.payloadHash);
      if (e.signatures?.length) t.signatures = e.signatures.map((r) => Aae.Signature.toJSON(r));
      return t;
    },
  };
  function gui(e) {
    return e !== null && e !== void 0;
  }
});