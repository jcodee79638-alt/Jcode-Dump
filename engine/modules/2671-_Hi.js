
var _Hi = Ie(function (dHi) {
  Object.defineProperty(dHi, "__esModule", { value: !0 });
  dHi.Timestamp = void 0;
  dHi.Timestamp = {
    fromJSON(e) {
      return {
        seconds: pHi(e.seconds) ? globalThis.String(e.seconds) : "0",
        nanos: pHi(e.nanos) ? globalThis.Number(e.nanos) : 0,
      };
    },
    toJSON(e) {
      let t = {};
      if (e.seconds !== "0") t.seconds = e.seconds;
      if (e.nanos !== 0) t.nanos = Math.round(e.nanos);
      return t;
    },
  };
  function pHi(e) {
    return e !== null && e !== void 0;
  }
});