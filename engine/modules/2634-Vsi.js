
var Vsi = Ie(function (Wsi) {
  Object.defineProperty(Wsi, "__esModule", { value: !0 });
  var kIt = cr("buffer"),
    u_e = {
      INVALID_ENCODING:
        "Invalid encoding provided. Please specify a valid encoding the internal Node.js Buffer supports.",
      INVALID_SMARTBUFFER_SIZE: "Invalid size provided. Size must be a valid integer greater than zero.",
      INVALID_SMARTBUFFER_BUFFER: "Invalid Buffer provided in SmartBufferOptions.",
      INVALID_SMARTBUFFER_OBJECT:
        "Invalid SmartBufferOptions object supplied to SmartBuffer constructor or factory methods.",
      INVALID_OFFSET: "An invalid offset value was provided.",
      INVALID_OFFSET_NON_NUMBER: "An invalid offset value was provided. A numeric value is required.",
      INVALID_LENGTH: "An invalid length value was provided.",
      INVALID_LENGTH_NON_NUMBER: "An invalid length value was provived. A numeric value is required.",
      INVALID_TARGET_OFFSET: "Target offset is beyond the bounds of the internal SmartBuffer data.",
      INVALID_TARGET_LENGTH:
        "Specified length value moves cursor beyong the bounds of the internal SmartBuffer data.",
      INVALID_READ_BEYOND_BOUNDS: "Attempted to read beyond the bounds of the managed data.",
      INVALID_WRITE_BEYOND_BOUNDS: "Attempted to write beyond the bounds of the managed data.",
    };
  Wsi.ERRORS = u_e;
  function xVo(e) {
    if (!kIt.Buffer.isEncoding(e)) throw Error(u_e.INVALID_ENCODING);
  }
  Wsi.checkEncoding = xVo;
  function Bsi(e) {
    return typeof e === "number" && isFinite(e) && bVo(e);
  }
  Wsi.isFiniteInteger = Bsi;
  function Rsi(e, t) {
    if (typeof e === "number") {
      if (!Bsi(e) || e < 0) throw Error(t ? u_e.INVALID_OFFSET : u_e.INVALID_LENGTH);
    } else throw Error(t ? u_e.INVALID_OFFSET_NON_NUMBER : u_e.INVALID_LENGTH_NON_NUMBER);
  }
  function SVo(e) {
    Rsi(e, !1);
  }
  Wsi.checkLengthValue = SVo;
  function TVo(e) {
    Rsi(e, !0);
  }
  Wsi.checkOffsetValue = TVo;
  function vVo(e, t) {
    if (e < 0 || e > t.length) throw Error(u_e.INVALID_TARGET_OFFSET);
  }
  Wsi.checkTargetOffset = vVo;
  function bVo(e) {
    return typeof e === "number" && isFinite(e) && Math.floor(e) === e;
  }
  function jVo(e) {
    if (typeof BigInt > "u") throw Error("Platform does not support JS BigInt type.");
    if (typeof kIt.Buffer.prototype[e] > "u") throw Error(`Platform does not support Buffer.prototype.${e}.`);
  }
  Wsi.bigIntAndBufferInt64Check = jVo;
});