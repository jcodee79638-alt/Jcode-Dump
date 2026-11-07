
var Sui = Ie(function (Mui) {
  Object.defineProperty(Mui, "__esModule", { value: !0 });
  Mui.CreateEntryRequest = Mui.Spec = Mui.Entry = void 0;
  var lae = ydr(),
    fae = Mdr();
  Mui.Entry = {
    fromJSON(e) {
      return {
        kind: $_e(e.kind) ? globalThis.String(e.kind) : "",
        apiVersion: $_e(e.apiVersion) ? globalThis.String(e.apiVersion) : "",
        spec: $_e(e.spec) ? Mui.Spec.fromJSON(e.spec) : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.kind !== "") t.kind = e.kind;
      if (e.apiVersion !== "") t.apiVersion = e.apiVersion;
      if (e.spec !== void 0) t.spec = Mui.Spec.toJSON(e.spec);
      return t;
    },
  };
  Mui.Spec = {
    fromJSON(e) {
      return {
        spec: $_e(e.hashedRekordV002)
          ? {
              $case: "hashedRekordV002",
              hashedRekordV002: fae.HashedRekordLogEntryV002.fromJSON(e.hashedRekordV002),
            }
          : $_e(e.dsseV002)
            ? { $case: "dsseV002", dsseV002: lae.DSSELogEntryV002.fromJSON(e.dsseV002) }
            : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.spec?.$case === "hashedRekordV002")
        t.hashedRekordV002 = fae.HashedRekordLogEntryV002.toJSON(e.spec.hashedRekordV002);
      else if (e.spec?.$case === "dsseV002") t.dsseV002 = lae.DSSELogEntryV002.toJSON(e.spec.dsseV002);
      return t;
    },
  };
  Mui.CreateEntryRequest = {
    fromJSON(e) {
      return {
        spec: $_e(e.hashedRekordRequestV002)
          ? {
              $case: "hashedRekordRequestV002",
              hashedRekordRequestV002: fae.HashedRekordRequestV002.fromJSON(e.hashedRekordRequestV002),
            }
          : $_e(e.dsseRequestV002)
            ? { $case: "dsseRequestV002", dsseRequestV002: lae.DSSERequestV002.fromJSON(e.dsseRequestV002) }
            : void 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.spec?.$case === "hashedRekordRequestV002")
        t.hashedRekordRequestV002 = fae.HashedRekordRequestV002.toJSON(e.spec.hashedRekordRequestV002);
      else if (e.spec?.$case === "dsseRequestV002")
        t.dsseRequestV002 = lae.DSSERequestV002.toJSON(e.spec.dsseRequestV002);
      return t;
    },
  };
  function $_e(e) {
    return e !== null && e !== void 0;
  }
});