
var Mdr = Ie(function (Dui) {
  Object.defineProperty(Dui, "__esModule", { value: !0 });
  Dui.HashedRekordLogEntryV002 = Dui.HashedRekordRequestV002 = void 0;
  var GDt = dZ(),
    uae = WDt();
  Dui.HashedRekordRequestV002 = {
    fromJSON(e) {
      return {
        digest: XDt(e.digest) ? Buffer.from(zJo(e.digest)) : Buffer.alloc(0),
        signature: XDt(e.signature) ? uae.Signature.fromJSON(e.signature) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.digest.length !== 0) t.digest = QJo(e.digest);
      if (e.signature !== void 0) t.signature = uae.Signature.toJSON(e.signature);
      return t;
    },
  };
  Dui.HashedRekordLogEntryV002 = {
    fromJSON(e) {
      return {
        data: XDt(e.data) ? GDt.HashOutput.fromJSON(e.data) : void 0,
        signature: XDt(e.signature) ? uae.Signature.fromJSON(e.signature) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.data !== void 0) t.data = GDt.HashOutput.toJSON(e.data);
      if (e.signature !== void 0) t.signature = uae.Signature.toJSON(e.signature);
      return t;
    },
  };
  function zJo(e) {
    return Uint8Array.from(globalThis.Buffer.from(e, "base64"));
  }
  function QJo(e) {
    return globalThis.Buffer.from(e).toString("base64");
  }
  function XDt(e) {
    return e !== null && e !== void 0;
  }
});